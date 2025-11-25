import { useState, useEffect } from 'react';
import { Save, Copy, CheckCircle } from 'lucide-react';

interface InteractiveTextAreaProps {
  id: string;
  label: string;
  placeholder: string;
  rows?: number;
  storageKey: string;
}

export default function InteractiveTextArea({
  id,
  label,
  placeholder,
  rows = 4,
  storageKey
}: InteractiveTextAreaProps) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(`${storageKey}-${id}`) || '';
  });
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`${storageKey}-${id}`, value);
      if (value) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [value, id, storageKey]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-emerald-600 flex items-center gap-1">
              <Save className="w-3 h-3" />
              Saved
            </span>
          )}
          {value && (
            <button
              onClick={copyToClipboard}
              className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <textarea
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors resize-none"
      />
    </div>
  );
}
