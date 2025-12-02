import ModuleLayout from '../components/ModuleLayout';
import ChecklistItem from '../components/ChecklistItem';
import { Users, Search, ExternalLink, Mail, AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';

interface Module3Props {
  onComplete: () => void;
  onBack: () => void;
}

// Contact Interface for Email Finder
interface Contact {
  email?: string;
  value?: string;
  first_name?: string;
  last_name?: string;
  position?: string;
  department?: string;
  confidence?: number;
  type?: string;
  linkedin?: string;
  verification?: {
    status: string;
    result: string;
  };
}

export default function Module3({ onComplete, onBack }: Module3Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'business-finder' | 'email-finder'>('overview');
  
  // Email Finder States
  const [domain, setDomain] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [foundEmail, setFoundEmail] = useState<Contact | null>(null);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [copiedEmail, setCopiedEmail] = useState('');
  
  // LinkedIn CSR Finder States
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [linkedInSearchUrl, setLinkedInSearchUrl] = useState('');

  const tools = [
    {
      name: 'LinkedIn',
      plan: 'Free Basic Account',
      features: ['Search by job title', 'Company pages', '2nd/3rd degree connections'],
      url: 'https://linkedin.com',
      color: 'bg-blue-600'
    },
    {
      name: 'Hunter.io',
      plan: 'Free: 15 requests per second and 500 requests per minute',
      features: ['Find email patterns', 'Email verification', 'Domain search'],
      url: 'https://hunter.io',
      color: 'bg-orange-500'
    },
    {
      name: 'Clearbit Connect',
      plan: 'Free: 100 finds/month',
      features: ['Gmail integration', 'Email finder', 'Company data'],
      url: 'https://clearbit.com/connect',
      color: 'bg-purple-600'
    },
    {
      name: 'Apollo.io',
      plan: 'Free: 60 credits/month',
      features: ['B2B database', 'Contact finder', 'Email sequences'],
      url: 'https://apollo.io',
      color: 'bg-green-600'
    }
  ];

  const googleSearchTips = [
    {
      query: 'site:linkedin.com "CSR Manager" "Company Name"',
      description: 'Find CSR managers at specific companies'
    },
    {
      query: '"Director of Sustainability" "Company Name" email',
      description: 'Locate sustainability directors with contact info'
    },
    {
      query: 'site:company.com "corporate social responsibility" OR "community relations"',
      description: 'Find CSR pages on company websites'
    },
    {
      query: '"Company Name" press release sponsorship OR partnership 2024',
      description: 'Discover recent sponsorship activity'
    }
  ];

  // Email Finder Functions
  const handleEmailSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || !firstName.trim() || !lastName.trim()) return;

    setIsEmailLoading(true);
    setEmailError('');
    setFoundEmail(null);

    try {
      // Call serverless API instead of Hunter.io directly
      const response = await fetch('/api/hunter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: domain.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data: any = await response.json();
      
      if (data.data && data.data.email) {
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
      } else {
        setEmailError(`No email found for ${firstName} ${lastName} at ${domain}. Try checking the spelling or searching LinkedIn for variations of their name.`);
      }
    } catch (err: any) {
      setEmailError(err.message);
    } finally {
      setIsEmailLoading(false);
    }
  };

  // LinkedIn search form handler
  const handleLinkedInSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle) return;

    // Build LinkedIn People search URL with filters
    let searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(jobTitle)}`;
    
    // Add location as part of keywords for better compatibility
    if (location.trim()) {
      searchUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(jobTitle + ' ' + location)}`;
    }
    
    // Add industry filter if provided  
    if (industry) {
      const industryMap: { [key: string]: string } = {
        'Technology': '4',
        'Healthcare': '14', 
        'Financial Services': '43',
        'Retail': '27',
        'Manufacturing': '25',
        'Energy': '22',
        'Real Estate': '32',
        'Hospitality': '31',
        'Transportation': '53'
      };
      const industryCode = industryMap[industry];
      if (industryCode) {
        searchUrl += `&industry=%5B"${industryCode}"%5D`;
      }
    }

    setLinkedInSearchUrl(searchUrl);
  };

  const copyEmail = async (email: string) => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getVerificationBadge = (verification?: { status: string; result: string }) => {
    if (!verification) return null;
    const isValid = verification.result === 'deliverable';
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        isValid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {isValid ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
        {isValid ? 'Verified' : 'Risky'}
      </span>
    );
  };

  return (
    <ModuleLayout
      moduleNumber={3}
      title="Finding the Right Contacts"
      description="Locate the right people to reach out to"
      onBack={onBack}
      onComplete={onComplete}
      color="bg-teal-500"
    >
      <div className="space-y-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-md border border-teal-100">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Overview & Strategy
              </div>
            </button>
            <button
              onClick={() => setActiveTab('business-finder')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'business-finder'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                LinkedIn CSR Finder
              </div>
            </button>
            <button
              onClick={() => setActiveTab('email-finder')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'email-finder'
                  ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email Finder
              </div>
            </button>
          </div>
        </div>

        {/* Overview Tab - Matches Module3_new.tsx exactly */}
        {activeTab === 'overview' && (
          <>
            {/* Tools Overview */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-teal-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-100 p-3 rounded-lg">
                  <Search className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Contact Finding Tools</h2>
              </div>

              <p className="text-gray-600 mb-6">
                These tools offer generous free tiers perfect for getting started. Set up accounts to maximize your
                monthly credits:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool) => (
                  <div key={tool.name} className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{tool.name}</h3>
                        <p className="text-sm text-emerald-600 font-semibold">{tool.plan}</p>
                      </div>
                      <span className={`${tool.color} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                        FREE
                      </span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-emerald-500 font-bold">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      Visit {tool.name}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Comparison Overview */}
            <section className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl shadow-md p-8 border border-teal-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Comparison Overview</h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
                      <th className="px-6 py-4 text-left font-bold">Tool</th>
                      <th className="px-6 py-4 text-left font-bold">Free Monthly Limit</th>
                      <th className="px-6 py-4 text-left font-bold">Best For</th>
                      <th className="px-6 py-4 text-left font-bold">Key Strength</th>
                      <th className="px-6 py-4 text-left font-bold">Key Limitation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-teal-100 hover:bg-teal-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-teal-900">LinkedIn</td>
                      <td className="px-6 py-4 text-gray-700">Unlimited (Basic Account)</td>
                      <td className="px-6 py-4 text-gray-700">Finding titles and decision-makers</td>
                      <td className="px-6 py-4 text-gray-700">Most accurate job/title info</td>
                      <td className="px-6 py-4 text-gray-700">No direct email access</td>
                    </tr>
                    <tr className="border-b border-teal-100 hover:bg-teal-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-teal-900">Hunter.io</td>
                      <td className="px-6 py-4 text-gray-700">25 searches</td>
                      <td className="px-6 py-4 text-gray-700">Email pattern + verification</td>
                      <td className="px-6 py-4 text-gray-700">Very accurate domain-based guessing</td>
                      <td className="px-6 py-4 text-gray-700">Low monthly limit</td>
                    </tr>
                    <tr className="border-b border-teal-100 hover:bg-teal-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-teal-900">Clearbit Connect</td>
                      <td className="px-6 py-4 text-gray-700">100 finds</td>
                      <td className="px-6 py-4 text-gray-700">Quick email lookup</td>
                      <td className="px-6 py-4 text-gray-700">High free quota + simple Gmail plugin</td>
                      <td className="px-6 py-4 text-gray-700">Works best within Gmail</td>
                    </tr>
                    <tr className="hover:bg-teal-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-teal-900">Apollo.io</td>
                      <td className="px-6 py-4 text-gray-700">60 credits</td>
                      <td className="px-6 py-4 text-gray-700">Full outreach + contact database</td>
                      <td className="px-6 py-4 text-gray-700">Built-in sequences + strong database</td>
                      <td className="px-6 py-4 text-gray-700">Requires account setup and learning curve</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Top Recommendation */}
            <section className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Top Recommendation</h2>

              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Apollo.io</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Best all-around choice with a solid B2B database, built-in email finder, and 60 monthly credits.
                      Great for quickly finding the right sponsor contacts and managing simple outreach.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Target Decision Makers */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Who to Contact</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-500">
                  <h3 className="font-bold text-emerald-900 mb-3">Primary Targets (Best Contact)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">1.</span>
                      <div>
                        <strong className="text-gray-900">CSR / Sustainability Manager/Director</strong>
                        <p className="text-sm text-gray-700">
                          Directly responsible for corporate social responsibility initiatives and partnerships
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">2.</span>
                      <div>
                        <strong className="text-gray-900">Community Relations Manager</strong>
                        <p className="text-sm text-gray-700">
                          Manages community engagement programs and local partnerships
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">3.</span>
                      <div>
                        <strong className="text-gray-900">Environmental Affairs Director</strong>
                        <p className="text-sm text-gray-700">
                          Oversees environmental initiatives and sustainability programs
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-900 mb-3">Secondary Targets (Alternative Contacts)</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>Marketing VP/Director:</strong> Often controls sponsorship budgets
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>Public Relations Manager:</strong> Interested in positive brand stories
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>Foundation Director:</strong> For companies with charitable foundations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>Operations Manager/Director:</strong> Often involved in logistics, park programs, or sustainability rollouts
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-5 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-bold text-purple-900 mb-3">Where to Look on the Company's Website:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>"About" or "Leadership" page</strong> - sometimes lists CSR or sustainability leads
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>"Corporate Responsibility" / "Sustainability" / "Community Impact" section</strong> - often includes names or press contacts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>"Press" or "Media" page</strong> - may include contact details for communications or external partnerships
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-600 font-bold">•</span>
                      <span className="text-gray-700">
                        <strong>"Investor Relations" or "Corporate Giving" pages</strong> - some brands outline how they handle charitable requests
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-500">
                  <h3 className="font-bold text-teal-900 mb-3">If No Name is Listed:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="text-gray-700">
                        Search <strong>LinkedIn</strong> using terms like <em>Sustainability Manager, Community Relations Lead, Partnerships Manager, or CSR Coordinator</em> for that company
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="text-gray-700">
                        Use tools like <strong>Hunter.io, RocketReach, or ContactOut</strong> to find verified email addresses
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="text-gray-700">
                        Try direct formats (e.g., <em>firstname.lastname@company.com</em> or <em>partnerships@company.com</em>) - many brands use simple email structures
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span className="text-gray-700">
                        Check <strong>press releases or community announcements</strong> for spokesperson names - those are often the right points of contact
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pro Tips */}
            <section className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-8">
              <div className="flex items-start gap-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl flex-shrink-0">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Pro Tips for Contact Research</h3>
                  <ul className="text-white/95 space-y-2.5">
                    <li>• Start with mid-level managers (more accessible than VPs)</li>
                    <li>• Look for people who've been in role 1-3 years (established but motivated)</li>
                    <li>• Check if they've posted about environmental causes on LinkedIn</li>
                    <li>• Mutual connections are gold - always check for shared contacts</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Advanced Contact Finding Tools - Interactive Cards */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Advanced Contact Finding Tools</h2>
              </div>

              <p className="text-gray-600 mb-6">
                We've created specialized tools to streamline your contact research. Click on any card below to access the tool:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setActiveTab('business-finder')}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-200 hover:shadow-lg text-left group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">LinkedIn CSR Contact Finder</h3>
                      <p className="text-sm text-blue-600 font-semibold">LinkedIn integration for CSR professionals</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      Find CSR & sustainability professionals
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      Filter by job title, location & industry
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      Direct LinkedIn People search
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      Perfect workflow with Email Finder
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                    <span>Click to access tool</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('email-finder')}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-lg text-left group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Email Finder</h3>
                      <p className="text-sm text-blue-600 font-semibold">Hunter.io integration</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      Find emails for specific contacts
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      Verify email deliverability
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      LinkedIn research workflow
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold">✓</span>
                      High accuracy & confidence scores
                    </li>
                  </ul>
                  <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                    <span>Click to access tool</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </section>

            {/* Google Search Techniques */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Manual Search Look Up Process</h2>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Advanced Google Search Operators</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Use these search queries to find decision-makers and their contact information:
              </p>

              <div className="space-y-4">
                {googleSearchTips.map((tip, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                    <div className="flex items-start gap-3">
                      <span className="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <code className="bg-gray-800 text-green-400 px-3 py-1 rounded text-sm block mb-2 overflow-x-auto">
                          {tip.query}
                        </code>
                        <p className="text-sm text-gray-700">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-purple-900 mb-2">Search Operators Key:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    <code className="bg-gray-200 px-2 py-0.5 rounded">site:</code> - Search within specific
                    domain
                  </li>
                  <li>
                    <code className="bg-gray-200 px-2 py-0.5 rounded">"exact phrase"</code> - Must include exact
                    phrase
                  </li>
                  <li>
                    <code className="bg-gray-200 px-2 py-0.5 rounded">OR</code> - Either term can match
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact Finding Workflow */}
            <section className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl shadow-md p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Step-by-Step Contact Finding Workflow</h2>

              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="bg-white text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Start with LinkedIn
                  </h3>
                  <p className="text-teal-50 text-sm ml-10">
                    Use the LinkedIn CSR Finder tab to search for CSR professionals with filters.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="bg-white text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    Find Email Address
                  </h3>
                  <p className="text-teal-50 text-sm ml-10">
                    Switch to the Email Finder tab to get verified email addresses for your LinkedIn contacts.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="bg-white text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    Research Their Background
                  </h3>
                  <p className="text-teal-50 text-sm ml-10">
                    Read their LinkedIn summary, check recent company news, find common ground for
                    personalization.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <span className="bg-white text-teal-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    Log in Tracking Sheet
                  </h3>
                  <p className="text-teal-50 text-sm ml-10">
                    Add all information to your contact spreadsheet before moving to next prospect.
                  </p>
                </div>
              </div>
            </section>

            {/* Setup Checklist */}
            <section className="bg-white rounded-xl shadow-md p-8 border border-emerald-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Finding Tools Setup Checklist</h2>

              <div className="space-y-3">
                <ChecklistItem
                  id="linkedin-account"
                  label="LinkedIn account optimized with professional profile"
                  storageKey="module3-checklist"
                />
                <ChecklistItem
                  id="hunter-account"
                  label="Hunter.io free account created"
                  storageKey="module3-checklist"
                />
                <ChecklistItem
                  id="clearbit-account"
                  label="Clearbit Connect installed (Gmail extension)"
                  storageKey="module3-checklist"
                />
                <ChecklistItem
                  id="apollo-account"
                  label="Apollo.io free account created"
                  storageKey="module3-checklist"
                />
                <ChecklistItem
                  id="contact-spreadsheet"
                  label="Contact tracking spreadsheet set up with all columns"
                  storageKey="module3-checklist"
                />
                <ChecklistItem
                  id="first-contacts"
                  label="Found and logged first 10 potential contacts using the tools above"
                  storageKey="module3-checklist"
                />
              </div>
            </section>
          </>
        )}

        {/* LinkedIn CSR Finder Tab */}
        {activeTab === 'business-finder' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-3 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">LinkedIn CSR Contact Finder</h3>
                <p className="text-gray-600">Find CSR and sustainability professionals on LinkedIn</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-6">
              <h4 className="font-bold text-blue-900 mb-3"> Workflow:</h4>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span>Find CSR people on LinkedIn</span>
                </div>
                <span className="text-gray-400">→</span>
                <div className="flex items-center gap-2">
                  <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span>Get their emails with Hunter.io</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleLinkedInSearch} className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title/Role *</label>
                  <select 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select CSR role...</option>
                    <option value="CSR Manager">CSR Manager</option>
                    <option value="Sustainability Manager">Sustainability Manager</option>
                    <option value="Community Relations Manager">Community Relations Manager</option>
                    <option value="Environmental Affairs Director">Environmental Affairs Director</option>
                    <option value="Corporate Social Responsibility Director">Corporate Social Responsibility Director</option>
                    <option value="Partnership Manager">Partnership Manager</option>
                    <option value="Foundation Director">Foundation Director</option>
                    <option value="Public Relations Manager">Public Relations Manager</option>
                    <option value="Marketing Director">Marketing Director</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., San Diego, California"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry (Optional)</label>
                  <select 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Any industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Energy">Energy & Utilities</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Hospitality">Hospitality & Tourism</option>
                    <option value="Transportation">Transportation</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={!jobTitle}
                className={`w-full py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-3 ${
                  !jobTitle
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                }`}
              >
                <Users className="w-5 h-5" />
                Search LinkedIn for CSR Contacts
              </button>
            </form>

            {/* Search Results Preview */}
            {linkedInSearchUrl && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  LinkedIn Search Results
                </h4>
                
                <div className="bg-white rounded-lg p-4 border border-blue-200 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Search Parameters:</h5>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div><strong>Role:</strong> {jobTitle}</div>
                        {location && <div><strong>Location:</strong> {location}</div>}
                        {industry && <div><strong>Industry:</strong> {industry}</div>}
                      </div>
                    </div>
                    <a
                      href={linkedInSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Open in LinkedIn
                    </a>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h6 className="font-bold text-yellow-800 mb-2">Next Steps:</h6>
                  <ol className="text-sm text-gray-700 space-y-1">
                    <li><strong>1.</strong> Click "Open in LinkedIn" to see the search results</li>
                    <li><strong>2.</strong> Browse through CSR professionals and note their details</li>
                    <li><strong>3.</strong> For each contact, note their name and company domain</li>
                    <li><strong>4.</strong> Switch to the "Email Finder" tab to get their email addresses</li>
                    <li><strong>5.</strong> Build your prospect list with verified contacts</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Pro Tips */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-gray-600" />
                LinkedIn Search Pro Tips
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Best Target Roles:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>CSR Manager</strong> - Directly handles sponsorships</li>
                    <li>• <strong>Sustainability Manager</strong> - Environmental focus</li>
                    <li>• <strong>Community Relations</strong> - Local partnerships</li>
                    <li>• <strong>Partnership Manager</strong> - Strategic alliances</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">Search Strategy:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Look for people with 2-5 years in role</li>
                    <li>• Check if they post about environmental topics</li>
                    <li>• Prioritize companies with existing CSR programs</li>
                    <li>• Focus on local/regional presence for better fit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Finder Tab */}
        {activeTab === 'email-finder' && (
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
              <p className="text-gray-700 mb-3">Before using this tool, search LinkedIn for specific contacts in your target region:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Search LinkedIn:</strong> Use the LinkedIn CSR Finder tab to find professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Target Key Roles:</strong> Look for CSR Managers, Partnership Directors, or Community Relations contacts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Note Details:</strong> Record their exact first/last names and company domain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span className="text-gray-700"><strong>Use This Tool:</strong> Enter the details below to find their verified email addresses</span>
                </li>
              </ul>
            </div>

            <form onSubmit={handleEmailSearch} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Domain *</label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g., microsoft.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g., Sarah"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g., Johnson"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isEmailLoading || !domain.trim() || !firstName.trim() || !lastName.trim()}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isEmailLoading || !domain.trim() || !firstName.trim() || !lastName.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isEmailLoading ? 'Finding email...' : 'Find Email Address'}
              </button>
            </form>

            {emailError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm">{emailError}</p>
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
                        <span className="font-medium text-gray-900">
                          {foundEmail.first_name} {foundEmail.last_name}
                        </span>
                        {getVerificationBadge(foundEmail.verification)}
                      </div>
                      
                      {foundEmail.position && (
                        <p className="text-sm text-gray-600 mb-3">{foundEmail.position}</p>
                      )}
                      
                      <div className="flex items-center gap-3">
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
                    </div>
                    
                    {foundEmail.confidence && (
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Confidence</div>
                        <div className="font-medium text-green-600">{foundEmail.confidence}%</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Back to Dashboard Button */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </ModuleLayout>
  );
}