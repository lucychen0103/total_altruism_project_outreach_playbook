import { ArrowLeft, CheckCircle2, ArrowUp } from 'lucide-react';
import { ReactNode, useState, useEffect } from 'react';

interface ModuleLayoutProps {
  moduleNumber: number;
  title: string;
  description: string;
  children: ReactNode;
  onBack: () => void;
  onComplete: () => void;
  color: string;
}

export default function ModuleLayout({
  moduleNumber,
  title,
  description,
  children,
  onBack,
  onComplete,
  color
}: ModuleLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-500 mb-1">Module {moduleNumber}</div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
            <button
              onClick={onComplete}
              className={`flex items-center gap-2 px-6 py-3 ${color} text-white rounded-lg hover:opacity-90 transition-opacity`}
            >
              <CheckCircle2 className="w-5 h-5" />
              Mark Complete
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-40 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  );
}