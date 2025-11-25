import ModuleLayout from '../components/ModuleLayout';
import InteractiveTextArea from '../components/InteractiveTextArea';
import { Building2, Search, Calculator, ExternalLink, Globe, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Module2Props {
  onComplete: () => void;
  onBack: () => void;
}

interface TargetCompany {
  id: string;
  name: string;
  reason: string;
}

const SUGGESTED_COMPANIES: TargetCompany[] = [
  { id: '1', name: 'SDG&E (San Diego Gas & Electric)', reason: 'Local utility with strong environmental commitment, community programs, and regional presence in San Diego' },
  { id: '2', name: 'REI (Recreational Equipment, Inc.)', reason: 'Outdoor retailer with environmental focus, co-op structure values community impact, grants for conservation' },
  { id: '3', name: 'Clif Bar & Company (Clif Family Foundation)', reason: 'Sustainable food company with foundation focused on environmental health and grassroots initiatives' },
  { id: '4', name: 'Patagonia', reason: 'Environmental activism leader, 1% for the Planet member, grants for grassroots environmental organizations' },
  { id: '5', name: 'San Diego Foundation', reason: 'Regional community foundation supporting local environmental and educational initiatives' },
];

export default function Module2({ onComplete, onBack }: Module2Props) {
  const [companyName, setCompanyName] = useState('');
  const [targetCompanies, setTargetCompanies] = useState<TargetCompany[]>([...SUGGESTED_COMPANIES]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyReason, setNewCompanyReason] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [scores, setScores] = useState({
    missionAlignment: 0,
    educationFit: 0,
    communityPresence: 0,
    givingCapacity: 0,
    employeeEngagement: 0,
    marketingAlignment: 0
  });

  const generateSearchLinks = (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    return {
      google: `https://www.google.com/search?q=${encodedQuery}+CSR+environmental+sponsorship`,
      instagram: `https://www.instagram.com/explore/tags/${encodedQuery.replace(/\s+/g, '')}/`,
      facebook: `https://www.facebook.com/search/top?q=${encodedQuery}`,
      linkedin: `https://www.linkedin.com/search/results/companies/?keywords=${encodedQuery}`,
      website: `https://www.google.com/search?q=${encodedQuery}+official+website`
    };
  };

  // Weighted calculation (max 30 points)
  const weightedTotal = (
    (scores.missionAlignment * 0.20) +
    (scores.educationFit * 0.20) +
    (scores.communityPresence * 0.20) +
    (scores.givingCapacity * 0.23) +
    (scores.employeeEngagement * 0.10) +
    (scores.marketingAlignment * 0.07)
  ) * 6; // Multiply by 6 to scale to 30 points (5-point scale)

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-lime-600';
    if (score >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBand = (total: number) => {
    if (total >= 25.5) return { label: 'Excellent fit', desc: 'High-priority target', color: 'bg-green-600' };
    if (total >= 21) return { label: 'Strong fit', desc: 'Worth cultivating', color: 'bg-green-500' };
    if (total >= 15) return { label: 'Moderate fit', desc: 'Opportunistic sponsor', color: 'bg-yellow-500' };
    return { label: 'Weak fit', desc: 'Likely not worth major effort', color: 'bg-red-400' };
  };

  const scoreBand = getScoreBand(weightedTotal);

  return (
    <ModuleLayout
      moduleNumber={2}
      title="Identifying Target Sponsors"
      description="Research and evaluate potential corporate partners"
      onBack={onBack}
      onComplete={onComplete}
      color="bg-blue-500"
    >
      <div className="space-y-8">
        {/* Research Strategy */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">How to Research Target Companies</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">🔍 Where to Find Ideal Sponsors:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <h4 className="font-semibold text-emerald-900 mb-2">Fortune 500 Companies</h4>
                  <p className="text-sm text-gray-700">
                    Look for companies with established CSR programs. Check their annual sustainability reports.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">Local Businesses</h4>
                  <p className="text-sm text-gray-700">
                    Regional banks, hospitals, and retail chains with community focus.
                  </p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                  <h4 className="font-semibold text-teal-900 mb-2">Environmental Brands</h4>
                  <p className="text-sm text-gray-700">
                    Outdoor gear, sustainable products, eco-friendly companies with aligned missions.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-900 mb-2">Tech Companies</h4>
                  <p className="text-sm text-gray-700">
                    Many tech companies have strong ESG commitments and community programs.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">📊 Key Research Points:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-gray-700">
                    <strong>Existing CSR Initiatives:</strong> Do they already sponsor environmental or
                    community programs?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-gray-700">
                    <strong>Company Values:</strong> Check their website, mission statement, and recent press
                    releases
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-gray-700">
                    <strong>Geographic Relevance:</strong> Do they have offices/operations in areas where T.A.P.
                    stations exist?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-gray-700">
                    <strong>Recent News:</strong> Major partnerships, leadership changes, or expansion plans
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-gray-700">
                    <strong>Budget Indicators:</strong> Company size, recent funding, profitability
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Online Search Tool */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-md p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Search for Potential Sponsors Online</h2>
          </div>
          <p className="text-blue-50 mb-6">
            Enter a company name or search term to quickly find them across multiple platforms. Research their CSR initiatives, community involvement, and contact information.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <label className="block text-sm font-semibold text-white mb-3">
              Enter Company Name or Search Term:
            </label>
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g., SDG&E, Patagonia, local credit union..."
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    setSearchQuery(searchQuery);
                  }
                }}
              />
            </div>

            {searchQuery.trim() && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-lg mb-3">
                  Research "{searchQuery}" on these platforms:
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <a
                    href={generateSearchLinks(searchQuery).google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg transition-colors group"
                  >
                    <Search className="w-6 h-6 text-white" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Google Search</div>
                      <div className="text-xs text-blue-100">Find CSR initiatives & sponsorships</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white" />
                  </a>

                  <a
                    href={generateSearchLinks(searchQuery).website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg transition-colors group"
                  >
                    <Globe className="w-6 h-6 text-white" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Official Website</div>
                      <div className="text-xs text-blue-100">Check their mission & values</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white" />
                  </a>

                  <a
                    href={generateSearchLinks(searchQuery).linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg transition-colors group"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">LinkedIn</div>
                      <div className="text-xs text-blue-100">Company info & find contacts</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white" />
                  </a>

                  <a
                    href={generateSearchLinks(searchQuery).instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg transition-colors group"
                  >
                    <Instagram className="w-6 h-6 text-white" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Instagram</div>
                      <div className="text-xs text-blue-100">See their community engagement</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white" />
                  </a>

                  <a
                    href={generateSearchLinks(searchQuery).facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-4 rounded-lg transition-colors group"
                  >
                    <Facebook className="w-6 h-6 text-white" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">Facebook</div>
                      <div className="text-xs text-blue-100">Check events & local presence</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white" />
                  </a>
                </div>

                <div className="bg-cyan-900/40 p-4 rounded-lg mt-4">
                  <h4 className="font-bold text-white mb-2 text-sm">Quick Research Tips:</h4>
                  <ul className="text-xs text-cyan-100 space-y-1">
                    <li>• Look for "About Us" or "Community" pages on their website</li>
                    <li>• Search for their annual sustainability or CSR reports</li>
                    <li>• Check social media for community involvement posts</li>
                    <li>• Find contact info for their community relations or CSR departments</li>
                    <li>• Note any existing environmental or education partnerships</li>
                  </ul>
                </div>
              </div>
            )}

            {!searchQuery.trim() && (
              <div className="bg-white/10 p-6 rounded-lg text-center">
                <Search className="w-12 h-12 text-white/60 mx-auto mb-3" />
                <p className="text-white/80 text-sm">
                  Enter a company name above to generate search links across multiple platforms
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Sponsor Scoring Calculator */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Sponsor Evaluation Matrix</h2>
              <p className="text-sm text-gray-600 mt-1">Based on T.A.P.'s 5-point weighted rubric system</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">Detailed Scoring Rubric</h3>
                <p className="text-sm text-gray-700 mb-2">
                  For comprehensive scoring criteria and detailed descriptions of each metric, view the full rubric:
                </p>
                <a
                  href="https://docs.google.com/spreadsheets/d/11xMXkJYlIcCsCPfBLs80E7eyHQ-S6GkK/edit?gid=182960278#gid=182960278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm underline"
                >
                  Open T.A.P. Sponsor Identification Rubric
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Use this interactive tool to score potential sponsors. Rate each factor from 1-5 using the scale below. Your scores will be automatically weighted to produce a total out of 30 points.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Patagonia"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Mission & Values Alignment <span className="text-xs text-gray-500">(Weight: 20%)</span>
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.missionAlignment)}`}>
                    {scores.missionAlignment}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={scores.missionAlignment}
                  onChange={(e) => setScores({ ...scores, missionAlignment: Number(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">Environmental commitment, community focus, sustainability goals</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Education & Youth Engagement Fit <span className="text-xs text-gray-500">(Weight: 20%)</span>
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.educationFit)}`}>
                    {scores.educationFit}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={scores.educationFit}
                  onChange={(e) => setScores({ ...scores, educationFit: Number(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">Support for youth programs, educational initiatives, family engagement</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Community & Local Presence <span className="text-xs text-gray-500">(Weight: 20%)</span>
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.communityPresence)}`}>
                    {scores.communityPresence}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={scores.communityPresence}
                  onChange={(e) => setScores({ ...scores, communityPresence: Number(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">Geographic relevance, local operations, community engagement history</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Giving Capacity & History <span className="text-xs text-gray-500">(Weight: 23%)</span>
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.givingCapacity)}`}>
                    {scores.givingCapacity}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={scores.givingCapacity}
                  onChange={(e) => setScores({ ...scores, givingCapacity: Number(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">Company size, profitability, existing CSR budget, sponsorship track record</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Employee Engagement Potential <span className="text-xs text-gray-500">(Weight: 10%)</span>
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.employeeEngagement)}`}>
                    {scores.employeeEngagement}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={scores.employeeEngagement}
                  onChange={(e) => setScores({ ...scores, employeeEngagement: Number(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">Employee volunteer programs, team building opportunities, workforce size</p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Marketing & Visibility Alignment <span className="text-xs text-gray-500">(Weight: 7%)</span>
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.marketingAlignment)}`}>
                    {scores.marketingAlignment}/5
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={scores.marketingAlignment}
                  onChange={(e) => setScores({ ...scores, marketingAlignment: Number(e.target.value) })}
                  className="w-full"
                />
                <p className="text-xs text-gray-600 mt-1">Brand visibility goals, public-facing messaging, decision-maker accessibility</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg mb-6">
            <h3 className="text-2xl font-bold mb-4">
              {companyName ? `${companyName} - ` : ''}Total Weighted Score: {weightedTotal.toFixed(1)}/30
            </h3>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
              <h4 className="font-semibold mb-3 text-white">Score Breakdown:</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span>Mission Alignment (20%):</span>
                  <span className="font-bold">{(scores.missionAlignment * 0.20 * 6).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Education Fit (20%):</span>
                  <span className="font-bold">{(scores.educationFit * 0.20 * 6).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Presence (20%):</span>
                  <span className="font-bold">{(scores.communityPresence * 0.20 * 6).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Giving Capacity (23%):</span>
                  <span className="font-bold">{(scores.givingCapacity * 0.23 * 6).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee Engagement (10%):</span>
                  <span className="font-bold">{(scores.employeeEngagement * 0.10 * 6).toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marketing Alignment (7%):</span>
                  <span className="font-bold">{(scores.marketingAlignment * 0.07 * 6).toFixed(1)}</span>
                </div>
              </div>
            </div>

            {weightedTotal > 0 && (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className={`${scoreBand.color} px-4 py-2 rounded-lg text-white font-bold`}>
                    {scoreBand.label}
                  </div>
                  <span className="text-lg">{scoreBand.desc}</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-emerald-50 p-5 rounded-lg border-2 border-emerald-200">
            <h3 className="font-bold text-emerald-900 mb-3">Scoring Reference</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Individual Metric Scale (1-5):</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li><strong>5:</strong> Excellent match</li>
                  <li><strong>4:</strong> Strong match</li>
                  <li><strong>3:</strong> Moderate/Fair match</li>
                  <li><strong>2:</strong> Weak match</li>
                  <li><strong>1:</strong> Poor match / misaligned</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Total Score Bands (Max 30 points):</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded"></div>
                    <span><strong>25.5-30:</strong> Excellent fit - High-priority target</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span><strong>21-25.5:</strong> Strong fit - Worth cultivating</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span><strong>15-21:</strong> Moderate fit - Opportunistic sponsor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span><strong>6-15:</strong> Weak fit - Likely not worth major effort</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-600 italic">
              Note: Scores are automatically weighted based on the importance of each metric to T.A.P.'s mission and operational needs.
            </p>
          </div>
        </section>

        {/* Example Research - Patagonia */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Example 1: Patagonia Research Profile</h2>
          </div>

          <div className="bg-emerald-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-emerald-900 mb-2">Company Overview</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Industry:</strong> Outdoor apparel & gear</li>
                  <li>• <strong>Size:</strong> ~3,000 employees</li>
                  <li>• <strong>Revenue:</strong> $1B+ annually</li>
                  <li>• <strong>HQ:</strong> Ventura, CA</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-emerald-900 mb-2">Environmental Commitment</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 1% for the Planet member</li>
                  <li>• Strong sustainability messaging</li>
                  <li>• History of environmental activism</li>
                  <li>• Community grant programs</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Why Patagonia is an Ideal Target:</h4>
              <p className="text-sm text-gray-700">
                Patagonia's brand is built on environmental stewardship. T.A.P. aligns perfectly with their
                values of grassroots activism and community engagement. Their existing grant programs show
                they actively seek partnerships with environmental initiatives.
              </p>
            </div>

            <div className="mt-4 p-3 bg-green-600 text-white rounded-lg text-sm font-semibold">
              Estimated Score: 27/30 (Excellent Fit - High-Priority Target)
            </div>
          </div>
        </section>

        {/* Example Research - Qualcomm Foundation */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Example 2: Qualcomm Foundation Research Profile</h2>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Foundation Overview</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Industry:</strong> Technology/Telecommunications</li>
                  <li>• <strong>Parent Company:</strong> Qualcomm Inc. (50,000+ employees)</li>
                  <li>• <strong>Foundation Focus:</strong> STEM education & community engagement</li>
                  <li>• <strong>HQ:</strong> San Diego, CA</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Community Initiatives</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Strong focus on youth STEM education</li>
                  <li>• Technology-enabled learning programs</li>
                  <li>• Employee volunteer programs</li>
                  <li>• Community engagement & environmental sustainability</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Strengths</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Strong youth education focus</li>
                  <li>• Tech leadership enables innovative engagement</li>
                  <li>• Large employee base for volunteer potential</li>
                  <li>• Foundation specifically dedicated to community impact</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Challenges</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• STEM focus may prioritize technology over environment</li>
                  <li>• Geographic concentration in certain tech hubs</li>
                  <li>• May have existing program commitments</li>
                  <li>• Foundation grant cycles can be competitive</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Why Qualcomm Foundation is a Strong Prospect:</h4>
              <p className="text-sm text-gray-700">
                The Qualcomm Foundation's commitment to youth education and hands-on STEM learning aligns well with T.A.P.'s
                mission of engaging students in environmental action. Their focus on innovative, technology-enabled learning experiences
                complements T.A.P.'s water testing stations perfectly. The Foundation's employee volunteer programs and community
                engagement initiatives provide multiple partnership opportunities beyond financial support.
              </p>
            </div>

            <div className="mt-4 p-3 bg-green-500 text-white rounded-lg text-sm font-semibold">
              Estimated Score: 23/30 (Strong Fit - Worth Cultivating)
            </div>
          </div>
        </section>

        {/* Target List Builder */}
        <section className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Build Your Target List</h2>
          <p className="text-blue-50 mb-6">
            Start listing companies you want to reach out to. We've included some suggestions to get you started:
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Your Target Companies:</h3>
              <div className="space-y-3 mb-6">
                {targetCompanies.map((company) => (
                  <div key={company.id} className="bg-white rounded-lg p-4 text-gray-900">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900">{company.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{company.reason}</p>
                      </div>
                      <button
                        onClick={() => setTargetCompanies(targetCompanies.filter(c => c.id !== company.id))}
                        className="ml-4 text-red-500 hover:text-red-700 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-3 text-white">Add a New Company:</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Company Name:</label>
                  <input
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="e.g., Tesla Foundation"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Why they're a good fit:</label>
                  <textarea
                    value={newCompanyReason}
                    onChange={(e) => setNewCompanyReason(e.target.value)}
                    placeholder="e.g., Environmental innovation leader, clean energy focus, youth education programs"
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <button
                  onClick={() => {
                    if (newCompanyName.trim() && newCompanyReason.trim()) {
                      const newCompany: TargetCompany = {
                        id: Date.now().toString(),
                        name: newCompanyName.trim(),
                        reason: newCompanyReason.trim()
                      };
                      setTargetCompanies([...targetCompanies, newCompany]);
                      setNewCompanyName('');
                      setNewCompanyReason('');
                    }
                  }}
                  disabled={!newCompanyName.trim() || !newCompanyReason.trim()}
                  className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Target List
                </button>
              </div>
            </div>
          </div>
        </section>
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
