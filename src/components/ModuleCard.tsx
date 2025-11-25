import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';

interface ModuleCardProps {
  module: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    completed: boolean;
  };
  onClick: () => void;
}

export default function ModuleCard({ module, onClick }: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-left border-2 ${
        module.completed ? 'border-emerald-300' : 'border-transparent hover:border-gray-200'
      } group relative overflow-hidden`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${module.color} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`} />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`${module.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {module.completed ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </div>

        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-500">Module {module.id}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {module.title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-4">{module.description}</p>

        <div className="flex items-center justify-between">
          {module.completed ? (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Completed
            </span>
          ) : (
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Start Module
            </span>
          )}
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </button>
  );
}
