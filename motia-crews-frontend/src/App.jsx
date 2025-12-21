import React, { useState } from 'react';
import { 
  Bot, 
  BrainCircuit, 
  Code2, 
  Download, 
  Layers, 
  MessageSquare, 
  Plus, 
  Sparkles, 
  Trash2, 
  Users, 
  X,
  Mail,
  ArrowRight
} from 'lucide-react';

// --- Configuration ---
const BACKEND_URL = "https://ak8qqm-e2okx2.evangnuragi-d9gvdvg2qy.motia.cloud/api/generate";

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'create'
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md h-16">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setCurrentView('landing')}
          >
            <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Motia Crews
            </span>
          </div>
          
          <button 
            onClick={() => setIsContactOpen(true)}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Us
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 pt-16 px-6 overflow-hidden">
        {currentView === 'landing' ? (
          <LandingPage onStart={() => setCurrentView('create')} />
        ) : (
          <div className="py-12">
             <CreateCrewForm onBack={() => setCurrentView('landing')} />
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl shadow-indigo-500/10 relative">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
              Get in Touch
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Reach out to me in case of any questions or feedback. I'm always happy to help you build better agents.
            </p>
            
            <div 
              className="bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-center gap-3 group hover:border-indigo-500/50 transition-colors cursor-pointer"
              onClick={() => {navigator.clipboard.writeText('devang4work@gmail.com'); alert('Email copied!');}}
            >
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Mail className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email</div>
                <div className="text-slate-200 font-mono group-hover:text-indigo-300 transition-colors">devang4work@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Landing Page Component ---
function LandingPage({ onStart }) {
  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Next Gen Agent Orchestration</span>
      </div>

      {/* Hero Text */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white max-w-4xl leading-tight">
        Build Autonomous <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          AI Agent Crews
        </span>
      </h1>

      <p className="text-lg text-slate-400 max-w-2xl mb-8 leading-relaxed">
        Motia Crews helps people create better AI agent crews. Stop writing boilerplate. 
        Design visually, get code in seconds.
      </p>

      {/* Visual Representation */}
      <div className="w-full max-w-3xl mb-10 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-6 grid md:grid-cols-3 gap-4 shadow-2xl items-center">
          {/* Node 1 */}
          <div className="bg-slate-800/50 border border-white/5 p-4 rounded-xl flex flex-col items-center gap-2 text-center hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="font-bold text-slate-200 text-sm">Define Crew</div>
              <div className="text-xs text-slate-500">Set roles & goals</div>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-slate-600">
             <ArrowRight className="w-6 h-6 animate-pulse" />
          </div>

          {/* Node 2 */}
          <div className="bg-slate-800/50 border border-white/5 p-4 rounded-xl flex flex-col items-center gap-2 text-center hover:-translate-y-1 transition-transform duration-300">
             <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-slate-200 text-sm">Orchestrate</div>
              <div className="text-xs text-slate-500">Master logic</div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center text-slate-600">
             <ArrowRight className="w-6 h-6 animate-pulse" />
          </div>

          {/* Node 3 */}
          <div className="bg-slate-800/50 border border-white/5 p-4 rounded-xl flex flex-col items-center gap-2 text-center hover:-translate-y-1 transition-transform duration-300">
             <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-slate-200 text-sm">Export Code</div>
              <div className="text-xs text-slate-500">Instant ZIP</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button 
        onClick={onStart}
        className="group relative inline-flex items-center justify-center px-8 py-3.5 font-bold text-white transition-all duration-200 bg-indigo-600 text-base rounded-full hover:bg-indigo-500 focus:outline-none ring-offset-2 focus:ring-2 ring-indigo-500 ring-offset-slate-900"
      >
        <span className="mr-2">Create Crew</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

// --- Create Form Component ---
function CreateCrewForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "my_agent_crew",
    master: {
      name: "MasterAgent",
      role: "You are the project manager. Delegate tasks to your team."
    },
    sub_agents: [
      {
        name: "researcher",
        description: "Finds information",
        prompt: "You are a researcher. Find 3 key facts about the input topic."
      }
    ]
  });

  const addAgent = () => {
    setFormData(prev => ({
      ...prev,
      sub_agents: [
        ...prev.sub_agents,
        { name: "", description: "", prompt: "" }
      ]
    }));
  };

  const removeAgent = (index) => {
    setFormData(prev => ({
      ...prev,
      sub_agents: prev.sub_agents.filter((_, i) => i !== index)
    }));
  };

  const updateSubAgent = (index, field, value) => {
    const newAgents = [...formData.sub_agents];
    newAgents[index] = { ...newAgents[index], [field]: value };
    setFormData(prev => ({ ...prev, sub_agents: newAgents }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Error: " + (err.error || JSON.stringify(err.errors)));
        return;
      }
      
      const data = await response.json();
      // Convert base64 to blob
      const byteCharacters = atob(data.content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/zip' });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('Download started:', data.filename);

    } catch (e) {
      alert("Failed to connect to generator API");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Grid: Left=Button, Center=Title, Right=Spacer */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-8">
        <div className="flex justify-start">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
            title="Back to Home"
          >
            <ArrowRight className="w-5 h-5 rotate-180 text-slate-400 group-hover:text-white" />
          </button>
        </div>
        
        <h2 className="text-3xl font-bold text-center">Configure Your Crew</h2>
        
        <div aria-hidden="true"></div> {/* Spacer for centering */}
      </div>

      <div className="grid gap-8">
        {/* Project & Master Config */}
        <section className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Layers className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold">Core Configuration</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Project Name</label>
              <input 
                type="text" 
                value={formData.project_name}
                onChange={e => setFormData({...formData, project_name: e.target.value})}
                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-slate-500"
                placeholder="e.g. blog_writer_crew"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Master Agent Name</label>
              <input 
                type="text" 
                value={formData.master.name}
                onChange={e => setFormData({...formData, master: {...formData.master, name: e.target.value}})}
                className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Master Agent Role & Orchestration Logic</label>
            <textarea 
              value={formData.master.role}
              onChange={e => setFormData({...formData, master: {...formData.master, role: e.target.value}})}
              className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 h-24 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-white placeholder-slate-500"
              placeholder="Describe how the master agent should manage the others..."
            />
          </div>
        </section>

        {/* Sub Agents */}
        <section className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold">Sub Agents</h3>
            </div>
            <button 
              onClick={addAgent}
              className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Agent
            </button>
          </div>

          <div className="space-y-6">
            {formData.sub_agents.map((agent, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-white/5 relative group hover:border-white/10 transition-all">
                <button 
                  onClick={() => removeAgent(idx)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                  title="Remove Agent"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase">Agent Name</label>
                    <input 
                      type="text" 
                      value={agent.name}
                      onChange={e => updateSubAgent(idx, 'name', e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 outline-none text-white placeholder-slate-600"
                      placeholder="e.g. researcher"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-500 uppercase">Description</label>
                    <input 
                      type="text" 
                      value={agent.description}
                      onChange={e => updateSubAgent(idx, 'description', e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 focus:ring-1 focus:ring-indigo-500 outline-none text-white placeholder-slate-600"
                      placeholder="Short description of duties"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500 uppercase">System Prompt</label>
                  <textarea 
                    value={agent.prompt}
                    onChange={e => updateSubAgent(idx, 'prompt', e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg p-2.5 h-20 focus:ring-1 focus:ring-indigo-500 outline-none resize-none text-white placeholder-slate-600"
                    placeholder="Instructions for this specific agent..."
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action Bar */}
        <div className="flex justify-end pt-4 pb-12">
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-500/20
              transition-all duration-200
              ${loading 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/40 hover:-translate-y-1'
              }
            `}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating Crew...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Generate & Download ZIP
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}