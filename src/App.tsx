import { useState, useEffect } from 'react';
import {
  BookOpen,
  Target,
  Users,
  Mail,
  FileText,
  Handshake,
  Award,
  Download,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Leaf,
  ArrowUp
} from 'lucide-react';
import ModuleCard from './components/ModuleCard';
import ProgressBar from './components/ProgressBar';
import TemplateLibrary from './components/TemplateLibrary';
import Module1 from './modules/Module1';
import Module2 from './modules/Module2';
import Module3 from './modules/Module3';
import Module4 from './modules/Module4';
import Module5 from './modules/Module5';
import Module6 from './modules/Module6';
import Module7 from './modules/Module7';
// Floating chat with RAG
import FloatingChat from './components/FloatingChat';

interface ModuleData {
  id: number;
  title: string;
  description: string;
  icon: typeof BookOpen;
  color: string;
  completed: boolean;
}

// Module code mapping for chat navigation
const MODULE_CODE_TO_ID: Record<string, number> = {
  M1: 1,
  M2: 2,
  M3: 3,
  M4: 4,
  M5: 5,
  M6: 6,
  M7: 7
};

function App() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [moduleProgress, setModuleProgress] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem('tap-module-progress');
    return saved ? JSON.parse(saved) : {};
  });

  // Handle module navigation from chat
  const handleModuleClick = (moduleCode: string) => {
    const id = MODULE_CODE_TO_ID[moduleCode];
    if (id) {
      setActiveModule(id);
      setChatMinimized(true); // Minimize chat when navigating to module
    }
  };

  const modules: ModuleData[] = [
    {
      id: 1,
      title: 'Foundation & Preparation',
      description: 'Build your value proposition and perfect your pitch',
      icon: BookOpen,
      color: 'bg-emerald-500',
      completed: moduleProgress[1] || false
    },
    {
      id: 2,
      title: 'Identifying Target Sponsors',
      description: 'Research and evaluate potential corporate partners',
      icon: Target,
      color: 'bg-blue-500',
      completed: moduleProgress[2] || false
    },
    {
      id: 3,
      title: 'Finding the Right Contacts',
      description: 'Locate decision-makers and build your contact list',
      icon: Users,
      color: 'bg-teal-500',
      completed: moduleProgress[3] || false
    },
    {
      id: 4,
      title: 'Email Outreach Campaign',
      description: 'Craft compelling emails and automate follow-ups',
      icon: Mail,
      color: 'bg-indigo-500',
      completed: moduleProgress[4] || false
    },
    {
      id: 5,
      title: 'Sponsorship Packages & Proposals',
      description: 'Create tiered offerings that showcase value',
      icon: FileText,
      color: 'bg-purple-500',
      completed: moduleProgress[5] || false
    },
    {
      id: 6,
      title: 'Meeting & Negotiation',
      description: 'Present confidently and handle objections',
      icon: Handshake,
      color: 'bg-orange-500',
      completed: moduleProgress[6] || false
    },
    {
      id: 7,
      title: 'Closing & Maintaining Partnerships',
      description: 'Seal the deal and nurture long-term relationships',
      icon: Award,
      color: 'bg-green-600',
      completed: moduleProgress[7] || false
    }
  ];

  useEffect(() => {
    localStorage.setItem('tap-module-progress', JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  // Scroll to top when navigating to a module or template library
  useEffect(() => {
    if (activeModule !== null || showTemplates) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeModule, showTemplates]);

  // Also scroll to top when returning to dashboard
  useEffect(() => {
    if (activeModule === null && !showTemplates) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Only expand chat when explicitly returning to dashboard, not on all navigation
    }
  }, [activeModule, showTemplates]);

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const markModuleComplete = (moduleId: number) => {
    setModuleProgress(prev => ({ ...prev, [moduleId]: true }));
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.clear();
      setModuleProgress({});
      setActiveModule(null);
    }
  };

  const exportData = () => {
    const allData: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        allData[key] = localStorage.getItem(key);
      }
    }
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tap-outreach-data.json';
    a.click();
  };

  const completedCount = Object.values(moduleProgress).filter(Boolean).length;
  const progressPercentage = (completedCount / modules.length) * 100;

  const renderActiveModule = () => {
    switch (activeModule) {
      case 1:
        return <Module1 onComplete={() => markModuleComplete(1)} onBack={() => setActiveModule(null)} />;
      case 2:
        return <Module2 onComplete={() => markModuleComplete(2)} onBack={() => setActiveModule(null)} />;
      case 3:
        return <Module3 onComplete={() => markModuleComplete(3)} onBack={() => setActiveModule(null)} />;
      case 4:
        return <Module4 onComplete={() => markModuleComplete(4)} onBack={() => setActiveModule(null)} />;
      case 5:
        return <Module5 onComplete={() => markModuleComplete(5)} onBack={() => setActiveModule(null)} />;
      case 6:
        return <Module6 onComplete={() => markModuleComplete(6)} onBack={() => setActiveModule(null)} />;
      case 7:
        return <Module7 onComplete={() => markModuleComplete(7)} onBack={() => setActiveModule(null)} />;
      default:
        return null;
    }
  };

  if (showTemplates) {
    return (
      <>
        <TemplateLibrary onBack={() => setShowTemplates(false)} />
        {/* Floating chat persists in template library */}
        <FloatingChat 
          onModuleClick={handleModuleClick}
          isMinimized={true}
          onToggleMinimize={setChatMinimized}
        />
      </>
    );
  }

  if (activeModule) {
    return (
      <>
        {renderActiveModule()}
        {/* Floating chat persists across all modules */}
        <FloatingChat 
          onModuleClick={handleModuleClick}
          isMinimized={chatMinimized}
          onToggleMinimize={setChatMinimized}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-3 rounded-xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">T.A.P. Outreach Playbook</h1>
                <p className="text-gray-600 mt-1">Corporate Sponsorship Guide for The Total Altruism Project</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Data
              </button>
              <button
                onClick={resetProgress}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-emerald-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-emerald-500" />
                Your Journey
              </h2>
              <p className="text-gray-600 mt-1">
                {completedCount === 0 && "Start your outreach journey today!"}
                {completedCount > 0 && completedCount < modules.length && "You're making great progress!"}
                {completedCount === modules.length && "Congratulations! You've completed all modules!"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-600">{completedCount}/{modules.length}</div>
              <div className="text-sm text-gray-600">Modules Completed</div>
            </div>
          </div>
          <ProgressBar progress={progressPercentage} />
          {completedCount === modules.length && (
            <div className="mt-6 p-4 bg-emerald-50 border-2 border-emerald-200 rounded-lg">
              <p className="text-emerald-800 font-medium text-center">
                🎉 Amazing work! You're ready to make the world cleaner, one sponsor at a time!
              </p>
            </div>
          )}
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Remember: You're Offering Value</h3>
              <p className="text-emerald-50">
                Every partnership helps more people do good. You're not asking for charity—you're providing
                companies with meaningful ways to demonstrate their environmental commitment and engage their communities.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowTemplates(true)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <FileText className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">Template Library</div>
                  <div className="text-sm text-gray-600">Access all templates & resources</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
            </div>
          </button>

          <button
            onClick={() => window.print()}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-transparent hover:border-emerald-500 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 p-3 rounded-lg group-hover:bg-emerald-500 transition-colors">
                  <Download className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">Print Guide</div>
                  <div className="text-sm text-gray-600">Print-friendly reference</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500" />
            </div>
          </button>
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Interactive Curriculum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onClick={() => setActiveModule(module.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer Tips */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border border-emerald-100">
            <h3 className="font-bold text-emerald-700 mb-2">💡 Pro Tip</h3>
            <p className="text-sm text-gray-600">
              Complete modules in order for the best learning experience, but feel free to jump around as needed.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
            <h3 className="font-bold text-blue-700 mb-2">📊 Track Progress</h3>
            <p className="text-sm text-gray-600">
              Your progress is automatically saved. Use the Export button to backup your work.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100">
            <h3 className="font-bold text-teal-700 mb-2">🤖 AI Assistant</h3>
            <p className="text-sm text-gray-600">
              Use the floating chat assistant for personalized guidance and module recommendations.
            </p>
          </div>
        </div>
      </main>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-40 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Floating Chat Assistant - Always visible, just minimized or expanded */}
      <FloatingChat 
        onModuleClick={handleModuleClick}
        isMinimized={chatMinimized}
        onToggleMinimize={setChatMinimized}
      />
    </div>
  );
}

export default App;