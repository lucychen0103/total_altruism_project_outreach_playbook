import React, { useState } from 'react';
import { Search, User, Building2, ExternalLink, AlertCircle, CheckCircle, Copy } from 'lucide-react';

interface Contact {
  email?: string;
  value?: string; // Hunter.io uses 'value' for email address
  first_name?: string;
  last_name?: string;
  position?: string;
  department?: string;
  confidence?: number;
  type?: string; // 'personal' or 'generic'
  linkedin?: string; // LinkedIn profile URL
  verification?: {
    status: string;
    result: string;
  };
}

const ContactFinder: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [foundEmail, setFoundEmail] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !firstName.trim() || !lastName.trim()) return;

    setIsLoading(true);
    setError('');
    setFoundEmail(null);
    setSearchPerformed(false);

    try {
      const apiKey = import.meta.env.VITE_HUNTER_API_KEY;
      if (!apiKey) {
        throw new Error('Hunter.io API key not configured. Please add VITE_HUNTER_API_KEY to your environment variables.');
      }

      // Use Hunter.io Email Finder API instead of Domain Search
      const apiUrl = `https://api.hunter.io/v2/email-finder?domain=${domain}&first_name=${firstName}&last_name=${lastName}&api_key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data: any = await response.json();
      console.log('Hunter.io Email Finder response:', data);
      
      if (data.data && data.data.email) {
        // Email Finder returns a single result in data object
        setFoundEmail({
          email: data.data.email,
          value: data.data.email,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          position: data.data.position,
          department: data.data.department,
          confidence: data.data.confidence,
          type: data.data.type,
          linkedin: data.data.linkedin,
          verification: data.data.verification
        });
        setSearchPerformed(true);
      } else {
        setError(`No email found for ${firstName} ${lastName} at ${domain}. Try checking the spelling or searching LinkedIn for variations of their name.`);
        setSearchPerformed(true);
      }

    } catch (err: any) {
      setError(err.message);
      setSearchPerformed(true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyEmail = async (email: string): Promise<void> => {
    if (!email || email === 'undefined' || email.trim() === '') {
      console.log('No valid email to copy:', email);
      return;
    }
    
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      console.log('Copied email:', email);
      setTimeout(() => setCopiedEmail(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for browsers that don't support clipboard API
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(''), 2000);
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
      }
    }
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getVerificationBadge = (verification?: { status: string; result: string }) => {
    if (!verification) return null;
    
    const isValid = verification.result === 'deliverable';
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        isValid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {isValid ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
        {isValid ? 'Verified' : 'Risky'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-500 p-3 rounded-xl">
          <Search className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Email Finder</h3>
          <p className="text-gray-600">Find specific contact email addresses using Hunter.io</p>
        </div>
      </div>

      {/* LinkedIn Research Guide */}
      <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500 mb-6">
        <h3 className="font-bold text-blue-900 mb-3">Step 1: Research on LinkedIn First</h3>
        <p className="text-gray-700 mb-3">
          Before using this tool, search LinkedIn for specific contacts in your target region:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Search LinkedIn:</strong> Use targeted queries like "Marketing Director Microsoft Seattle"
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Target Key Roles:</strong> Look for CSR Managers, Partnership Directors, or Community Relations contacts
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Note Details:</strong> Record their exact first/last names and company domain
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span className="text-gray-700">
              <strong>Use This Tool:</strong> Enter the details below to find their verified email addresses
            </span>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSearch} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Domain <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., microsoft.com"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Company's main domain (without www)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g., Sarah"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">From LinkedIn profile</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g., Johnson"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">From LinkedIn profile</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !domain.trim() || !firstName.trim() || !lastName.trim()}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isLoading || !domain.trim() || !firstName.trim() || !lastName.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              Finding email...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Search className="w-4 h-4" />
              Find Email Address
            </span>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800">Search Error</h4>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {foundEmail && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Email Found!
          </h4>
          
          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {foundEmail.first_name} {foundEmail.last_name}
                  </span>
                  {getVerificationBadge(foundEmail.verification)}
                </div>
                
                {foundEmail.position && (
                  <p className="text-sm text-gray-600 mb-1">{foundEmail.position}</p>
                )}
                
                {foundEmail.department && (
                  <p className="text-xs text-gray-500 mb-3">{foundEmail.department}</p>
                )}
                
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {foundEmail.value || foundEmail.email}
                  </span>
                  <button
                    onClick={() => copyEmail(foundEmail.value || foundEmail.email || '')}
                    className="p-1 hover:bg-blue-100 rounded transition-colors relative"
                    title="Copy email"
                  >
                    <Copy className="w-4 h-4 text-blue-600" />
                    {copiedEmail === (foundEmail.value || foundEmail.email) && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        Copied!
                      </div>
                    )}
                  </button>
                </div>

                {foundEmail.linkedin && (
                  <a
                    href={foundEmail.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-xs font-medium transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View LinkedIn
                  </a>
                )}
              </div>
              
              {foundEmail.confidence && (
                <div className="text-right">
                  <div className="text-xs text-gray-500">Confidence</div>
                  <div className={`font-medium ${getConfidenceColor(foundEmail.confidence)}`}>
                    {foundEmail.confidence}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-blue-900 mb-2">Understanding Results</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• <strong>Verified:</strong> Email confirmed to exist and accept mail</li>
            <li>• <strong>Risky:</strong> Email pattern exists but may have delivery issues</li>
            <li>• <strong>80%+ Confidence:</strong> Very reliable email addresses</li>
            <li>• <strong>60-79% Confidence:</strong> Good quality, safe to use</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-900 mb-2">Pro Tips</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Always start with LinkedIn research to find the right regional contacts</li>
            <li>• Try different name variations if first search fails (e.g., "Mike" vs "Michael")</li>
            <li>• Look for middle names or initials on LinkedIn profiles</li>
            <li>• Focus on contacts with "Marketing," "CSR," "Partnerships," or "Community" in titles</li>
            <li>• Higher confidence scores indicate more reliable email addresses</li>
            <li>• "Risky" emails can still work - they just need careful follow-up</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactFinder;