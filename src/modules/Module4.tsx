import ModuleLayout from '../components/ModuleLayout';
import ChecklistItem from '../components/ChecklistItem';
import { Mail, Zap, TrendingUp, ExternalLink, BarChart3 } from 'lucide-react';

interface Module4Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Module4({ onComplete, onBack }: Module4Props) {

  const subjectLines = [
    'Partnership opportunity: [Company] x T.A.P.',
    '[First Name], interested in community environmental impact?',
    'Quick question about [Company]\'s sustainability initiatives',
    'Loved [Company]\'s recent [specific CSR initiative]',
    '[Mutual Connection] suggested I reach out',
    'Environmental partnership for [Company]\'s [location] community'
  ];

  return (
    <ModuleLayout
      moduleNumber={4}
      title="Email Outreach Campaign"
      description="Craft compelling emails and automate follow-ups"
      onBack={onBack}
      onComplete={onComplete}
      color="bg-indigo-500"
    >
      <div className="space-y-8">
        {/* Email Best Practices */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Email Copywriting Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-green-900 mb-2">✅ DO:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Personalize with specific company details</li>
                  <li>• Keep it under 150 words</li>
                  <li>• Lead with value, not your needs</li>
                  <li>• Include a clear call-to-action</li>
                  <li>• Reference mutual connections if possible</li>
                  <li>• Mention recent company news or initiatives</li>
                  <li>• Use their first name</li>
                  <li>• Write like a human, not a robot</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-900 mb-2">❌ DON'T:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Send generic mass emails</li>
                  <li>• Write long, dense paragraphs</li>
                  <li>• Focus on what you need</li>
                  <li>• Use aggressive sales language</li>
                  <li>• Include multiple attachments in first email</li>
                  <li>• Ask for money directly in cold email</li>
                  <li>• Use "Dear Sir/Madam"</li>
                  <li>• Apologize for reaching out</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">The AIDA Formula for Cold Emails:</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="bg-blue-500 text-white font-bold py-2 rounded">A</div>
                <p className="text-sm mt-2 text-gray-700"><strong>Attention</strong><br/>Hook with subject line</p>
              </div>
              <div>
                <div className="bg-blue-500 text-white font-bold py-2 rounded">I</div>
                <p className="text-sm mt-2 text-gray-700"><strong>Interest</strong><br/>Personalized opening</p>
              </div>
              <div>
                <div className="bg-blue-500 text-white font-bold py-2 rounded">D</div>
                <p className="text-sm mt-2 text-gray-700"><strong>Desire</strong><br/>Show value/benefits</p>
              </div>
              <div>
                <div className="bg-blue-500 text-white font-bold py-2 rounded">A</div>
                <p className="text-sm mt-2 text-gray-700"><strong>Action</strong><br/>Clear CTA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Lines */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Subject Lines That Get Opened</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Your subject line determines if your email gets opened. Here are proven formulas:
          </p>

          <div className="space-y-3">
            {subjectLines.map((subject, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500 flex items-center justify-between">
                <code className="text-sm text-gray-800">{subject}</code>
                <span className="text-xs text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
                  High Open Rate
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-yellow-900 mb-2">Subject Line Tips:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Keep it under 50 characters (mobile-friendly)</li>
              <li>• Personalize with their name or company</li>
              <li>• Avoid spam triggers: FREE, !!!, ALL CAPS</li>
              <li>• Ask questions to create curiosity</li>
              <li>• A/B test different approaches</li>
            </ul>
          </div>
        </section>

        {/* Email Automation Tools */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Email Automation Tools for Outreach</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Compare the top email automation tools to find the best fit for your outreach campaign:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                  <th className="p-4 text-left font-bold">Feature</th>
                  <th className="p-4 text-center font-bold border-l-2 border-yellow-300">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <span>Woodpecker</span>
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-xs font-bold">RECOMMENDED</span>
                      </div>
                      <a
                        href="https://woodpecker.co"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-green-100 hover:text-white"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </th>
                  <th className="p-4 text-center font-bold">
                    <div className="flex flex-col items-center gap-1">
                      <span>Instantly</span>
                      <a
                        href="https://instantly.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-green-100 hover:text-white"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </th>
                  <th className="p-4 text-center font-bold">
                    <div className="flex flex-col items-center gap-1">
                      <span>Lemlist</span>
                      <a
                        href="https://lemlist.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-green-100 hover:text-white"
                      >
                        Visit <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900">Free Trial</td>
                  <td className="p-4 text-center text-gray-700 bg-yellow-50 border-l-2 border-r-2 border-yellow-300 font-semibold text-green-700">14 days</td>
                  <td className="p-4 text-center text-gray-700">7 days</td>
                  <td className="p-4 text-center text-gray-700">14 days</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Starting Price</td>
                  <td className="p-4 text-center text-gray-700 bg-yellow-50 border-l-2 border-r-2 border-yellow-300 font-semibold text-green-700">$35/month</td>
                  <td className="p-4 text-center text-gray-700">$37/month</td>
                  <td className="p-4 text-center text-gray-700">$69/month</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900">Email Accounts</td>
                  <td className="p-4 text-center text-gray-700 bg-yellow-50 border-l-2 border-r-2 border-yellow-300">1-5 (plan dependent)</td>
                  <td className="p-4 text-center text-gray-700 font-semibold text-green-700">Unlimited</td>
                  <td className="p-4 text-center text-gray-700">1-5 (plan dependent)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Automated Follow-ups</td>
                  <td className="p-4 text-center bg-yellow-50 border-l-2 border-r-2 border-yellow-300">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900">Email Tracking</td>
                  <td className="p-4 text-center bg-yellow-50 border-l-2 border-r-2 border-yellow-300">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Personalization</td>
                  <td className="p-4 text-center text-sm text-gray-700 bg-yellow-50 border-l-2 border-r-2 border-yellow-300">Custom fields</td>
                  <td className="p-4 text-center text-sm text-gray-700">Custom fields + spintax</td>
                  <td className="p-4 text-center text-sm text-gray-700">Custom fields + images</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900">Deliverability Tools</td>
                  <td className="p-4 text-center bg-yellow-50 border-l-2 border-r-2 border-yellow-300">
                    <span className="text-green-600 font-bold text-xl">✓✓</span>
                    <p className="text-xs text-gray-600 mt-1">High priority</p>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓✓</span>
                    <p className="text-xs text-gray-600 mt-1">Advanced warmup</p>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">A/B Testing</td>
                  <td className="p-4 text-center bg-yellow-50 border-l-2 border-r-2 border-yellow-300">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-600 font-bold text-xl">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900">CRM Integration</td>
                  <td className="p-4 text-center text-sm text-gray-700 bg-yellow-50 border-l-2 border-r-2 border-yellow-300">Limited</td>
                  <td className="p-4 text-center text-sm text-gray-700">Zapier + API</td>
                  <td className="p-4 text-center text-sm text-gray-700">Native + Zapier</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Ease of Use</td>
                  <td className="p-4 text-center text-sm text-gray-700 bg-yellow-50 border-l-2 border-r-2 border-yellow-300 font-semibold text-green-700">Very Easy</td>
                  <td className="p-4 text-center text-sm text-gray-700">Very Easy</td>
                  <td className="p-4 text-center text-sm text-gray-700">Moderate</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-semibold text-gray-900">Best For</td>
                  <td className="p-4 text-center text-xs text-gray-700 bg-yellow-50 border-l-2 border-r-2 border-yellow-300 font-semibold">Beginners, nonprofits, focused cold email</td>
                  <td className="p-4 text-center text-xs text-gray-700">Scaling outreach, unlimited accounts</td>
                  <td className="p-4 text-center text-xs text-gray-700">Sales teams needing multi-channel</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg border-2 border-yellow-300">
            <h3 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Why Woodpecker is Recommended for T.A.P.
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong className="text-gray-900">User-Friendly Interface:</strong> Woodpecker has an intuitive, simple interface that makes campaign setup and management easy, even without technical experience—perfect for beginners.
              </p>
              <p>
                <strong className="text-gray-900">High Deliverability Focus:</strong> The platform prioritizes reaching the inbox with features that detect invalid emails, manage bounce rates, and mimic human sending behavior, ensuring your messages get through.
              </p>
              <p>
                <strong className="text-gray-900">Cold Email Specialist:</strong> Unlike other platforms that offer multi-channel outreach, Woodpecker concentrates exclusively on optimizing and automating email-only campaigns effectively.
              </p>
              <p>
                <strong className="text-gray-900">Straightforward & Reliable:</strong> For organizations that need a reliable cold email tool without unnecessary complexity, Woodpecker provides exactly what you need to launch successful campaigns.
              </p>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-900 mb-2">Decision Framework:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• <strong>Choose Woodpecker</strong> if you're a beginner who needs a straightforward, reliable cold email tool with strong deliverability</li>
              <li>• <strong>Choose Instantly</strong> if you need unlimited email accounts and plan to scale your outreach quickly</li>
              <li>• <strong>Choose Lemlist</strong> if you want advanced personalization features (images, videos) and multi-channel outreach</li>
            </ul>
          </div>

          <div className="mt-4 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-purple-900 mb-2">Compliance & Unsubscribe:</h3>
            <p className="text-sm text-gray-700">
              All major email automation tools automatically include an unsubscribe feature in your emails to ensure compliance with email regulations (CAN-SPAM, GDPR). Recipients can opt out at any time, and the tools will automatically remove them from your campaigns.
            </p>
          </div>
        </section>

        {/* Why Email Automation Tools Matter */}
        <section className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-md p-8 text-gray-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Why Email Automation Tools Are Essential</h2>
          </div>

          <p className="text-gray-700 mb-6">
            Manual email outreach is time-consuming and nearly impossible to track effectively. Email automation tools are game-changers for cold outreach campaigns because they provide:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Critical Analytics & Insights</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Open Rates:</strong> Track which subject lines and sending times get the most opens</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Reply Rates:</strong> Measure which email copy resonates and drives responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Click-Through Rates:</strong> See which links and CTAs generate interest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Bounce & Unsubscribe Rates:</strong> Maintain list health and sender reputation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Automation Benefits</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Large-Scale Outreach:</strong> Send hundreds or thousands of personalized emails efficiently, reaching far more prospects than manual outreach ever could</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Automatic Follow-Ups:</strong> Send sequences without manual work</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Smart Scheduling:</strong> Optimize send times based on timezone and data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Response Detection:</strong> Automatically stop sequences when prospects reply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span><strong>Personalization at Scale:</strong> Insert custom fields for hundreds of emails</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-emerald-200">
            <h3 className="font-bold text-lg mb-3 text-gray-900">Data-Driven Optimization</h3>
            <p className="text-gray-700 mb-4">
              Without analytics, you're flying blind. Email automation tools let you continuously improve your outreach by:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-700 mb-2">30-40%</div>
                <p className="text-sm text-gray-700">Average open rate for well-targeted cold emails</p>
              </div>
              <div className="bg-emerald-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-700 mb-2">5-10%</div>
                <p className="text-sm text-gray-700">Typical reply rate with personalized outreach</p>
              </div>
              <div className="bg-emerald-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-700 mb-2">3-4x</div>
                <p className="text-sm text-gray-700">Increase in responses with proper follow-up sequences</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-emerald-100 rounded-lg p-5 border-l-4 border-emerald-600">
            <p className="text-gray-700">
              <strong className="text-gray-900">Bottom Line:</strong> These tools don't just save time—they provide the data you need to refine your approach, improve your messaging, and ultimately secure more partnerships. Without tracking open and reply rates, you won't know what's working and what needs improvement.
            </p>
          </div>
        </section>

        {/* Email Sequence Strategy */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The 6-Email Follow-Up Sequence</h2>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <h3 className="font-bold text-lg">First Outreach Email (Day 0)</h3>
              </div>
              <p className="text-blue-50 text-sm ml-11">
                Introduce T.A.P., demonstrate you've researched their company, and propose a brief call. Include your proposal attachment and Calendly link. Keep it friendly, professional, and value-focused.
              </p>
            </div>

            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-teal-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <h3 className="font-bold text-lg">Follow-Up #1 (Day 3)</h3>
              </div>
              <p className="text-teal-50 text-sm ml-11">
                Politely follow up and resend the original email for easy reference. Highlight recognition opportunities, volunteer programs, and customizable sponsorship packages. Include Calendly link for a 20-minute call.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
                <h3 className="font-bold text-lg">Follow-Up #2 (Day 7)</h3>
              </div>
              <p className="text-emerald-50 text-sm ml-11">
                Ask if anything in the proposal sparked questions. Provide 3 clear reasons to collaborate: purpose-driven work, visibility and goodwill, and tailored opportunities. End with an open question about partnership ideas.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-cyan-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  4
                </span>
                <h3 className="font-bold text-lg">Follow-Up #3 (3 Days After Last Email)</h3>
              </div>
              <p className="text-cyan-50 text-sm ml-11">
                Highlight interest from schools using T.A.P. stations for environmental education. Position the partnership as an opportunity for them to support hands-on learning for youth and connect with the next generation of eco-conscious citizens.
              </p>
            </div>

            <div className="bg-gradient-to-r from-sky-500 to-sky-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-sky-600 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  5
                </span>
                <h3 className="font-bold text-lg">Follow-Up #4 (1 Week After Last Email)</h3>
              </div>
              <p className="text-sky-50 text-sm ml-11">
                Share that T.A.P. is expanding its community network and identifying select partners for the next phase. Emphasize visible, local impact and relevance to their focus areas. Request a short exploratory call.
              </p>
            </div>

            <div className="bg-gradient-to-r from-lime-500 to-lime-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-lime-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  6
                </span>
                <h3 className="font-bold text-lg">Follow-Up #5 (10-14 Days Later)</h3>
              </div>
              <p className="text-lime-50 text-sm ml-11">
                Send a quick progress update with specific impact data (e.g., 48% reduction in visible litter). Position partnership opportunities around sponsorship, volunteering, or shared storytelling. Request a brief conversation this month.
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-amber-700 w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  7
                </span>
                <h3 className="font-bold text-lg">Follow-Up #6 - Final Touchpoint (3-4 Weeks Later)</h3>
              </div>
              <p className="text-amber-50 text-sm ml-11">
                Send one final gracious note thanking them for considering a partnership. Acknowledge if timing isn't right and offer to keep in touch with periodic updates. Leave the door open for future collaboration.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
            <h3 className="font-bold text-lg text-blue-900 mb-4">Email Sequence Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">31-42%</div>
                <p className="text-sm text-gray-700 mt-1">Average Open Rate</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">3-8.5%</div>
                <p className="text-sm text-gray-700 mt-1">Average Response Rate</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">~2%</div>
                <p className="text-sm text-gray-700 mt-1">Positive Response Rate</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-700">10-15%+</div>
                <p className="text-sm text-gray-700 mt-1">"Good" Response Rate</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              These industry benchmarks help you measure your campaign's success. Aim for the "good" response rate range through personalization, timing optimization, and continuous A/B testing.
            </p>
          </div>

          <div className="mt-4 bg-emerald-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong className="text-emerald-900">Pro Tip:</strong> Stop the sequence immediately if they
              respond at any stage. Many automation tools do this automatically.
            </p>
          </div>
        </section>

        {/* A/B Testing */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-emerald-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Simple A/B Testing Guide</h2>

          <div className="bg-emerald-50 p-5 rounded-lg mb-4">
            <h3 className="font-bold text-emerald-900 mb-3">What to Test:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Subject lines (biggest impact)</li>
                  <li>• Email length (short vs. detailed)</li>
                  <li>• Call-to-action wording</li>
                  <li>• Opening line approach</li>
                </ul>
              </div>
              <div>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Sending time (morning vs. afternoon)</li>
                  <li>• Sending day (Tue-Thu typically best)</li>
                  <li>• Value proposition emphasis</li>
                  <li>• Formal vs. casual tone</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">How to A/B Test:</h3>
            <ol className="text-sm text-gray-700 space-y-2">
              <li>
                <strong>1. Choose one variable:</strong> Only test one thing at a time (e.g., subject line)
              </li>
              <li>
                <strong>2. Split your list:</strong> Send version A to 50%, version B to other 50%
              </li>
              <li>
                <strong>3. Send simultaneously:</strong> Same day, same time for both versions
              </li>
              <li>
                <strong>4. Track results:</strong> Open rates, reply rates, meeting bookings
              </li>
              <li>
                <strong>5. Pick winner:</strong> Use winning version for next batch
              </li>
            </ol>
          </div>
        </section>

        {/* Implementation Checklist */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-teal-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Email Campaign Setup Checklist</h2>

          <div className="space-y-3">
            <ChecklistItem
              id="email-tool"
              label="Selected and set up email automation tool (Woodpecker/Instantly/Lemlist)"
              storageKey="module4-checklist"
            />
            <ChecklistItem
              id="templates-ready"
              label="All 8 email templates written and saved"
              storageKey="module4-checklist"
            />
            <ChecklistItem
              id="subject-lines"
              label="Created 5+ subject line variations for A/B testing"
              storageKey="module4-checklist"
            />
            <ChecklistItem
              id="email-signature"
              label="Professional email signature with links and contact info"
              storageKey="module4-checklist"
            />
            <ChecklistItem
              id="test-emails"
              label="Sent test emails to myself and reviewed formatting"
              storageKey="module4-checklist"
            />
            <ChecklistItem
              id="tracking-setup"
              label="Tracking system ready to log email responses"
              storageKey="module4-checklist"
            />
            <ChecklistItem
              id="first-batch"
              label="Ready to send first batch of 10 emails"
              storageKey="module4-checklist"
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
