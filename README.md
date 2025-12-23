# Motia Crews


**Motia Crews** is a **code-generation toolkit** designed to simplify building **multi-agent workflows** using **Motia**.  
It removes the complexity of wiring events, managing state, and setting up orchestration logic, so you can focus on writing agent behavior.

Key highlights:

- **Instant Agent Scaffolding**  
  Define a **Master Agent** and multiple **Sub-Agents**, and Motia Crews generates a ready-to-run Motia project.

- **Hierarchical Multi-Agent System (HMAS)**  
  Uses a **master–worker architecture**, where a **Master Agent** orchestrates specialized **Sub-Agents** via **event-driven communication**.

- **Motia Event & State Management Pre-Wired**  
  All **event subscriptions**, **emit calls**, and **shared state handling** are automatically generated.

- **Focus on Agent Logic, Not Boilerplate**  
  Developers only need to implement the logic inside each sub-agent — no need to handle orchestration manually.

- **Built for Rapid Prototyping & Hackathons**  
  Ideal for **hackathons**, **proof-of-concepts**, and **experimentation with agentic systems** in Motia.
---

## Demo Video

🎥 Watch the demo here:  [**Motia Crews Demo**]()

[![Watch the demo](https://img.youtube.com/vi/cyGRdzJAuxc/0.jpg)](https://www.youtube.com/watch?v=cyGRdzJAuxc)

---

## Get Started with Motia Crews

### Step 1: Create Your Crew

- Visit the **Motia Crews website**:  
  👉 https://motia-crews.vercel.app/
- Fill out the **Create Crew** form with:
  - Project Name
  - Master Agent name & role
  - Sub-Agent names
  - Sub-Agent descriptions
  - Sub-Agent prompts

Motia Crews will automatically:
- Generate code for **all Motia agents**
- Wire agents together using **Motia events**
- Add **shared context** via **Motia state management**
- Package everything into a **downloadable ZIP file**


### Step 2: Download, Setup & Configure

- Download the ZIP file and extract it.
- Open the project in your code editor.
- Install dependencies: `npm install`


Now, complete the files marked with **`TODO`**:

#### 1️⃣ `.env`

* Add your **Nebius API key**
  👉 [https://tokenfactory.nebius.com/](https://tokenfactory.nebius.com/)

#### 2️⃣ `start_pipeline_api_step.js`

* Provide the **input** you want to give to your agents.
* This step **starts the entire pipeline**.

#### 3️⃣ `master_agent_step.js`

* Read the input from the start API.
* Initialize the **shared state** with the same input.
* This agent **orchestrates all sub-agents**.

#### 4️⃣ `src/agents/`

* Add your **custom sub-agent logic**.
* AI call boilerplate is already included — just **uncomment and use** if needed.


### Step 3: Run Your Motia Crew 🚀

Start the project locally: `npm run dev`


Your **Motia Crew** will be running at:
👉 [http://localhost:3000](http://localhost:3000)

You can now trigger the pipeline, experiment with agents, and iterate quickly.


That’s it — you’re ready to build and experiment with **Motia Crews** ✨

---

## Tech Stack

* **Frontend:** React + Tailwind
* **Deployment:** Vercel
* **Backend:** Motia (deployed on **Motia Cloud**)

---

## Future Enhancements

* Generate Motia steps in **all supported languages**
* **User profiles** to store created crews
* Enhanced **agent prompt configuration** in the UI
* CLI support (e.g., `npx motia-crews create`)

