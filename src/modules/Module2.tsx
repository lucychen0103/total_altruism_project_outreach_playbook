import ModuleLayout from '../components/ModuleLayout';
import InteractiveTextArea from '../components/InteractiveTextArea';
import { Building2, Search, Calculator } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Module2Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Module2({ onComplete, onBack }: Module2Props) {
  const [companyName, setCompanyName] = useState('');
  const [scores, setScores] = useState({
    alignment: 0,
    budget: 0,
    accessibility: 0
  });

  const totalScore = scores.alignment + scores.budget + scores.accessibility;
  const averageScore = totalScore / 3;

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRecommendation = (avg: number) => {
    if (avg >= 8) return '🎯 Excellent Target - Prioritize this company!';
    if (avg >= 6) return '✅ Good Target - Worth pursuing';
    if (avg >= 4) return '⚠️ Moderate Target - Proceed with caution';
    return '❌ Low Priority - Consider other prospects first';
  };

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
              <h3 className="font-bold text-gray-900 mb-3">Where to Find Ideal Sponsors:</h3>
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
              <h3 className="font-bold text-gray-900 mb-3">Key Research Points:</h3>
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

        {/* Sponsor Scoring Calculator */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Sponsor Evaluation Matrix</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Use this interactive tool to score potential sponsors. Rate each factor from 1-10:
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Patagonia"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Values Alignment (environmental commitment, community focus)
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.alignment)}`}>
                    {scores.alignment}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scores.alignment}
                  onChange={(e) => setScores({ ...scores, alignment: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Budget Potential (company size, profitability)
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.budget)}`}>{scores.budget}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scores.budget}
                  onChange={(e) => setScores({ ...scores, budget: Number(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Decision-Maker Accessibility (connections, contact info availability)
                  </label>
                  <span className={`font-bold ${getScoreColor(scores.accessibility)}`}>
                    {scores.accessibility}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={scores.accessibility}
                  onChange={(e) => setScores({ ...scores, accessibility: Number(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {companyName && totalScore > 0 && (
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">
                {companyName} - Overall Score: {averageScore.toFixed(1)}/10
              </h3>
              <p className="text-lg">{getRecommendation(averageScore)}</p>
            </div>
          )}

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-yellow-900 mb-2">Scoring Guide:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><strong>8-10:</strong> Excellent match - prioritize outreach</li>
              <li><strong>6-7:</strong> Good prospect - worth pursuing</li>
              <li><strong>4-5:</strong> Moderate fit - lower priority</li>
              <li><strong>1-3:</strong> Poor match - consider other targets</li>
            </ul>
          </div>
        </section>

        {/* Example Research */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Example: Patagonia Research Profile</h2>
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
          </div>
        </section>

        {/* Target List Builder */}
        <section className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Build Your Target List</h2>
          <p className="text-blue-50 mb-6">
            Start listing companies you want to reach out to. Include notes about why they're a good fit:
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <InteractiveTextArea
              id="target-list"
              label="My Target Companies (Company Name - Why they're a good fit)"
              placeholder="Example:&#10;1. REI - Strong environmental focus, community programs, retail locations near T.A.P. stations&#10;2. Starbucks - Community engagement priority, thousands of locations, sustainability goals&#10;3. Local Credit Union - Community-focused, regional presence..."
              rows={10}
              storageKey="module2"
            />
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
