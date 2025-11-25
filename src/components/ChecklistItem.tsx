import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ChecklistItemProps {
  id: string;
  label: string;
  storageKey: string;
}

export default function ChecklistItem({ id, label, storageKey }: ChecklistItemProps) {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    const checklist = saved ? JSON.parse(saved) : {};
    return checklist[id] || false;
  });

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const checklist = saved ? JSON.parse(saved) : {};
    checklist[id] = checked;
    localStorage.setItem(storageKey, JSON.stringify(checklist));
  }, [checked, id, storageKey]);

  return (
    <button
      onClick={() => setChecked(!checked)}
      className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-emerald-300 transition-colors group w-full text-left"
    >
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          checked
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-gray-300 group-hover:border-emerald-400'
        }`}
      >
        {checked && <Check className="w-4 h-4 text-white" />}
      </div>
      <span className={`${checked ? 'text-gray-500 line-through' : 'text-gray-700'} transition-colors`}>
        {label}
      </span>
    </button>
  );
}
