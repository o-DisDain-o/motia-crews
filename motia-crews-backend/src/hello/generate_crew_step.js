import JSZip from "jszip";
import * as Templates from "../utils/templates.js";

export const config = {
  name: "GenerateCrewAPI",
  type: "api",
  method: "POST",
  path: "/api/generate",
  description: "Generates a Motia multi-agent project ZIP",
  flows: ["generate-crew-flow"],
  emits: [],
  includeFiles: ["../utils/templates.js"]
};

/**
 * Sanitizes a string to be a safe variable/file name.
 * e.g., "My Agent!" -> "my_agent"
 */
function sanitizeName(name) {
  return name.toString().toLowerCase()
    .replace(/\s+/g, '_')           // spaces to underscore
    .replace(/[^a-z0-9_\-]/g, '');  // remove special chars
}

export const handler = async (req, ctx) => {
  const body = req.body || {};
  const { logger } = ctx;

  try {
    const errors = [];

    // --- 1. Validation ---

    // Validate Project Name
    let projectName = "motia_project";
    if (body.project_name) {
      if (typeof body.project_name !== 'string') {
        errors.push("project_name must be a string");
      } else {
        projectName = sanitizeName(body.project_name);
      }
    }

    // Validate Master
    if (!body.master) {
      errors.push("master section is required");
    } else {
      if (!body.master.name) errors.push("master.name is required");
      if (!body.master.role) errors.push("master.role is required");
    }

    // Validate Sub Agents
    if (!Array.isArray(body.sub_agents)) {
      errors.push("sub_agents must be an array");
    } else if (body.sub_agents.length === 0) {
      errors.push("sub_agents must include at least one agent");
    } else {
      body.sub_agents.forEach((agent, index) => {
        if (!agent.name || !/^[a-zA-Z0-9_\-]+$/.test(sanitizeName(agent.name))) {
          errors.push(`sub_agents[${index}].name is invalid`);
        }
        if (!agent.description || agent.description.length < 3) {
          errors.push(`sub_agents[${index}].description is too short`);
        }
        if (!agent.prompt || agent.prompt.length < 3) {
          errors.push(`sub_agents[${index}].prompt must not be empty`);
        }
      });
    }

    // Validate Unique Names
    const allNames = new Set();
    if (body.master?.name) {
      const safeMaster = sanitizeName(body.master.name);
      allNames.add(safeMaster);
    }

    if (Array.isArray(body.sub_agents)) {
      body.sub_agents.forEach((agent) => {
        const safeName = sanitizeName(agent.name);
        if (allNames.has(safeName)) {
          errors.push(`Duplicate agent name detected: ${safeName}`);
        }
        allNames.add(safeName);
      });
    }

    // Return Errors if any
    if (errors.length > 0) {
      return {
        status: 422,
        body: { errors }
      };
    }

    // --- 2. Code Generation ---

    const zip = new JSZip();
    const root = zip.folder(projectName);
    logger.info('Generating crew project', { 
      projectName, 
      master: body.master, 
      subAgentsCount: body.sub_agents.length 
    });

    // Sanitized Inputs
    const masterName = sanitizeName(body.master.name);
    const masterRole = body.master.role;
    const subAgents = body.sub_agents.map(a => ({
      ...a,
      name: sanitizeName(a.name)
    }));

    // Add Root Configs
    root.file("package.json", Templates.PACKAGE_JSON(projectName));
    root.file(".env.example", Templates.ENV_EXAMPLE);
    root.file("README.md", Templates.README(projectName));

    // Add Source Directory
    const src = root.folder("src");
    
    // Add Services
    const service = src.folder("service");
    service.file("nebius.service.js", Templates.NEBIUS_SERVICE);

    // Add Agents
    const agents = src.folder("agents");
    
    // 1. Generate Master Agent
    const masterCode = Templates.MASTER_AGENT(projectName, masterName, masterRole, subAgents);
    agents.file(`${masterName}_step.js`, masterCode);
    logger.info('Master agent generated', { masterName });

    // 2. Generate Sub Agents
    subAgents.forEach(agent => {
      const agentCode = Templates.SUB_AGENT(projectName, agent);
      agents.file(`${agent.name}_step.js`, agentCode);
    });
    logger.info('Sub agents generated', { subAgentNames: subAgents.map(a => a.name) });

    // 3. Generate Utility API to start pipeline
    agents.file("start_pipeline_api_step.js", Templates.START_PIPELINE_STEP(projectName));
    agents.file("pipeline_end_agent_step.js", Templates.END_PIPELINE_STEP(projectName));

    // --- 3. ZIP Output ---
    // Generate as base64 string
    const base64Content = await zip.generateAsync({ type: "base64" });
    
    logger.info('Crew project ZIP generated successfully', { 
      projectName,
      sizeKB: Math.round(base64Content.length / 1024)
    });

    // Return base64 string with metadata for client-side download
    return {
      status: 200,
      body: {
        success: true,
        projectName: projectName,
        filename: `${projectName}.zip`,
        content: base64Content,
        contentType: "application/zip"
      }
    };

  } catch (error) {
    logger.error('Error generating crew project', {
      error: error.message,
      stack: error.stack,
      name: error.name
    });

    return {
      status: 500,
      body: { 
        error: 'Failed to generate project',
        message: error.message 
      }
    };
  }
};