import ModuleLayout from '../components/ModuleLayout';
import InteractiveTextArea from '../components/InteractiveTextArea';
import ChecklistItem from '../components/ChecklistItem';
import { Video, MessageSquare, Calendar, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Module6Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Module6({ onComplete, onBack }: Module6Props) {
  const [selectedObjection, setSelectedObjection] = useState(0);

  const objections = [
    {
      objection: "We don't have budget right now",
      response:
        "I understand budget constraints. Many of our partners start with our Bronze tier at $1,000 annually, which can often come from discretionary funds or marketing budgets. Would it be helpful to explore smaller partnership options?",
      tips: ['Offer payment plans', 'Suggest starting next fiscal year', 'Ask about other budget sources']
    },
    {
      objection: 'We already have CSR partnerships',
      response:
        "That's wonderful! T.A.P. actually complements existing programs. Unlike many CSR initiatives, our model provides immediate, visible community impact that your employees can participate in directly. How would you feel about adding T.A.P. as a focused environmental component?",
      tips: ['Position as complementary, not competitive', 'Emphasize unique value prop', 'Ask about their current partnerships']
    },
    {
      objection: 'How do we measure the impact?',
      response:
        "Great question! We provide detailed metrics including: tons of litter removed, number of community participants, hours of environmental service, and social media reach. Our sponsors receive quarterly impact reports with photos and data specific to their sponsored stations.",
      tips: ['Have specific numbers ready', 'Show sample reports', 'Relate to their ESG reporting needs']
    },
    {
      objection: 'We need to discuss internally',
      response:
        "Absolutely, that makes complete sense. To help facilitate your internal discussion, would it be helpful if I prepared a one-page summary highlighting the key benefits and ROI? When would be a good time to reconnect after your team has had a chance to review?",
      tips: ['Provide materials to support them', 'Set specific follow-up date', 'Offer to present to full team']
    }
  ];

  return (
    <ModuleLayout
      moduleNumber={6}
      title="Meeting & Negotiation"
      description="Present confidently and handle objections"
      onBack={onBack}
      onComplete={onComplete}
      color="bg-orange-500"
    >
      <div className="space-y-8">
        {/* Meeting Setup */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Setting Up Professional Meetings</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-900 mb-3">Calendly Setup (Free Plan)</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Why Calendly:</strong> Eliminates back-and-forth email scheduling, looks
                  professional, integrates with your calendar
                </p>
                <div className="mt-3">
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Set up Calendly Free Account
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-bold text-emerald-900 mb-2">Recommended Settings:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 30-minute meeting duration</li>
                  <li>• 24-hour minimum notice</li>
                  <li>• Buffer time between meetings</li>
                  <li>• Confirmation emails enabled</li>
                  <li>• Calendar reminders active</li>
                </ul>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-bold text-teal-900 mb-2">Ideal Meeting Times:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Tuesday-Thursday (best days)</li>
                  <li>• 10am-11am or 2pm-3pm slots</li>
                  <li>• Avoid Mondays and Fridays</li>
                  <li>• Avoid lunch hours (12-1pm)</li>
                  <li>• Consider their timezone</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Video Call Best Practices */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Video Call Best Practices</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-3">Technical Setup</h3>
              <ul className="text-sm text-blue-50 space-y-2">
                <li>✓ Test audio/video 10min before</li>
                <li>✓ Good lighting (face camera)</li>
                <li>✓ Stable internet connection</li>
                <li>✓ Close unnecessary programs</li>
                <li>✓ Have backup (phone) ready</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-3">Visual Presence</h3>
              <ul className="text-sm text-emerald-50 space-y-2">
                <li>✓ Professional background</li>
                <li>✓ Eye-level camera angle</li>
                <li>✓ Appropriate attire</li>
                <li>✓ Camera on throughout</li>
                <li>✓ Maintain eye contact</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-3">During Meeting</h3>
              <ul className="text-sm text-orange-50 space-y-2">
                <li>✓ Join 2-3 minutes early</li>
                <li>✓ Mute when not speaking</li>
                <li>✓ Take brief notes</li>
                <li>✓ Screen share prepared</li>
                <li>✓ Smile and be enthusiastic!</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-yellow-900 mb-2">First Impressions Matter:</h3>
            <p className="text-sm text-gray-700">
              You have about 7 seconds to make a first impression on video. Smile, be energetic, and start with
              confidence. Technical issues happen—apologize briefly and move on without dwelling on them.
            </p>
          </div>
        </section>

        {/* Meeting Flow */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-teal-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Meeting Presentation Flow</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-teal-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  1
                </span>
                <h3 className="font-bold text-lg">Opening (5 minutes)</h3>
              </div>
              <ul className="text-teal-50 text-sm ml-13 space-y-1">
                <li>• Thank them for their time</li>
                <li>• Brief personal connection or ice breaker</li>
                <li>• Outline meeting agenda</li>
                <li>• Set expectations for duration</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-blue-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  2
                </span>
                <h3 className="font-bold text-lg">Discovery (7 minutes)</h3>
              </div>
              <ul className="text-blue-50 text-sm ml-13 space-y-1">
                <li>• Ask about their CSR priorities</li>
                <li>• Learn about current community programs</li>
                <li>• Understand their challenges</li>
                <li>• Listen more than you talk (70/30 rule)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-purple-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  3
                </span>
                <h3 className="font-bold text-lg">T.A.P. Presentation (8 minutes)</h3>
              </div>
              <ul className="text-purple-50 text-sm ml-13 space-y-1">
                <li>• Mission and impact overview</li>
                <li>• Show visuals of stations in action</li>
                <li>• Present partnership tiers (focus on one recommended)</li>
                <li>• Share relevant case study</li>
                <li>• Connect directly to their stated priorities</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  4
                </span>
                <h3 className="font-bold text-lg">Q&A & Next Steps (10 minutes)</h3>
              </div>
              <ul className="text-orange-50 text-sm ml-13 space-y-1">
                <li>• Address questions and concerns</li>
                <li>• Handle objections (see below)</li>
                <li>• Discuss timeline and decision process</li>
                <li>• Agree on clear next steps</li>
                <li>• Schedule follow-up if needed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Objection Handling */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-rose-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Handling Common Objections</h2>

          <p className="text-gray-600 mb-6">
            Objections are buying signals! They mean the prospect is engaged. Practice these responses:
          </p>

          <div className="space-y-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {objections.map((obj, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedObjection(idx)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                    selectedObjection === idx
                      ? 'bg-rose-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Objection {idx + 1}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl border-2 border-rose-200">
              <div className="mb-4">
                <span className="text-xs font-bold text-rose-600 uppercase">Objection</span>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  "{objections[selectedObjection].objection}"
                </p>
              </div>

              <div className="mb-4">
                <span className="text-xs font-bold text-emerald-600 uppercase">Your Response</span>
                <p className="text-gray-700 mt-1 bg-white p-4 rounded-lg">
                  {objections[selectedObjection].response}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Pro Tips</span>
                <ul className="mt-2 space-y-1">
                  {objections[selectedObjection].tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-blue-500">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-900 mb-2">The Feel-Felt-Found Technique:</h3>
            <p className="text-sm text-gray-700">
              "I understand how you <strong>feel</strong>. Other companies have <strong>felt</strong> the same
              way initially. What they <strong>found</strong> was..." This validates their concern while
              repositioning with social proof.
            </p>
          </div>
        </section>

        {/* Post-Meeting Follow-Up */}
        <section className="bg-gradient-to-r from-orange-500 to-rose-600 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Post-Meeting Follow-Up Strategy</h2>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">Within 1 Hour:</h3>
              <p className="text-orange-50 text-sm">
                Send brief thank you email referencing specific conversation points. Include any materials you
                promised.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">Within 24 Hours:</h3>
              <p className="text-orange-50 text-sm">
                Send comprehensive follow-up with meeting recap, proposal, next steps, and timeline. Connect on
                LinkedIn.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-bold mb-2">3-5 Days Later:</h3>
              <p className="text-orange-50 text-sm">
                Check in if no response. Share additional resource (case study, impact report) to add value.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white/20 rounded-lg p-4">
            <InteractiveTextArea
              id="meeting-notes-template"
              label="Your Meeting Notes Template"
              placeholder="MEETING NOTES - [Company Name] - [Date]&#10;&#10;Attendees:&#10;&#10;Key Discussion Points:&#10;&#10;Their Priorities:&#10;&#10;Objections Raised:&#10;&#10;Next Steps:&#10;&#10;Follow-Up Required:"
              rows={10}
              storageKey="module6"
            />
          </div>
        </section>

        {/* Practice Checklist */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-emerald-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Meeting Preparation Checklist</h2>

          <div className="space-y-3">
            <ChecklistItem
              id="calendly-setup"
              label="Calendly or scheduling tool configured"
              storageKey="module6-checklist"
            />
            <ChecklistItem
              id="video-tested"
              label="Video call setup tested (audio, video, screen share)"
              storageKey="module6-checklist"
            />
            <ChecklistItem
              id="presentation-ready"
              label="Presentation slides or materials prepared"
              storageKey="module6-checklist"
            />
            <ChecklistItem
              id="company-research"
              label="Researched prospect company thoroughly"
              storageKey="module6-checklist"
            />
            <ChecklistItem
              id="objections-practiced"
              label="Practiced objection handling responses"
              storageKey="module6-checklist"
            />
            <ChecklistItem
              id="questions-prepared"
              label="Discovery questions written down"
              storageKey="module6-checklist"
            />
            <ChecklistItem
              id="followup-template"
              label="Follow-up email templates ready"
              storageKey="module6-checklist"
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
