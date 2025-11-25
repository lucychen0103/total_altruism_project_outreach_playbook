import ModuleLayout from '../components/ModuleLayout';
import InteractiveTextArea from '../components/InteractiveTextArea';
import ChecklistItem from '../components/ChecklistItem';
import { Lightbulb, Target, Rocket } from 'lucide-react';

interface Module1Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Module1({ onComplete, onBack }: Module1Props) {
  return (
    <ModuleLayout
      moduleNumber={1}
      title="Foundation & Preparation"
      description="Build your value proposition and perfect your pitch"
      onBack={onBack}
      onComplete={onComplete}
      color="bg-emerald-500"
    >
      <div className="space-y-8">
        {/* Understanding Value Proposition */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Lightbulb className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Understanding Your Value Proposition</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
              <h3 className="font-bold text-emerald-900 mb-2">What is T.A.P.?</h3>
              <p className="text-gray-700">
                The Total Altruism Project provides free litter-grabbing tools on public paths, making it easy
                for anyone to participate in environmental cleanup. We transform passive public spaces into
                active environmental engagement opportunities.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-900 mb-2">What You're Offering Sponsors</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Authentic environmental impact with measurable results</li>
                <li>Community engagement and brand visibility</li>
                <li>Employee volunteer opportunities</li>
                <li>ESG metrics and CSR portfolio enhancement</li>
                <li>Positive PR and social media content</li>
              </ul>
            </div>

            <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-bold text-teal-900 mb-2">Key Differentiators</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Low barrier to entry - anyone can participate</li>
                <li>Immediate, visible impact in local communities</li>
                <li>Scalable model with proven success</li>
                <li>Cost-effective compared to traditional CSR programs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Elevator Pitch Exercise */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Your 30-Second Elevator Pitch</h2>
          </div>

          <div className="mb-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-bold text-gray-900 mb-2">Sample Pitch Structure:</h3>
              <p className="text-sm text-gray-700 mb-3">
                "Hi, I'm [Name] from The Total Altruism Project. We provide free litter-grabbing tools on
                public paths that enable thousands of community members to clean up their neighborhoods. We're
                partnering with [type of companies] who want to demonstrate real environmental commitment while
                engaging their local communities. Companies like [Company Name] gain brand visibility, measurable
                impact metrics, and authentic ESG credentials through our sponsorship program."
              </p>
            </div>

            <InteractiveTextArea
              id="elevator-pitch"
              label="Write Your Elevator Pitch"
              placeholder="Hi, I'm [Your Name] from The Total Altruism Project..."
              rows={6}
              storageKey="module1"
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-yellow-900 mb-2">Pro Tips:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              <li>Keep it under 30 seconds when spoken</li>
              <li>Lead with the problem you solve (littering, community disengagement)</li>
              <li>Emphasize partnership, not charity</li>
              <li>End with a clear call to action</li>
              <li>Practice until it feels natural, not rehearsed</li>
            </ul>
          </div>
        </section>

        {/* Workspace Setup Checklist */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-teal-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-teal-100 p-3 rounded-lg">
              <Rocket className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Essential Tools Setup</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Check off each item as you set it up. These tools are essential for effective outreach:
          </p>

          <div className="space-y-3">
            <ChecklistItem
              id="professional-email"
              label="Professional email signature with T.A.P. branding and contact info"
              storageKey="module1-checklist"
            />
            <ChecklistItem
              id="linkedin-profile"
              label="Updated LinkedIn profile mentioning your role with T.A.P."
              storageKey="module1-checklist"
            />
            <ChecklistItem
              id="calendar-tool"
              label="Calendar scheduling tool (Calendly free account or similar)"
              storageKey="module1-checklist"
            />
            <ChecklistItem
              id="crm-spreadsheet"
              label="Contact tracking spreadsheet or basic CRM"
              storageKey="module1-checklist"
            />
            <ChecklistItem
              id="materials-folder"
              label="Digital folder with T.A.P. materials (logo, photos, impact stats)"
              storageKey="module1-checklist"
            />
            <ChecklistItem
              id="email-templates"
              label="Email templates saved and ready to customize"
              storageKey="module1-checklist"
            />
            <ChecklistItem
              id="video-setup"
              label="Video call setup tested (good lighting, clear audio, professional background)"
              storageKey="module1-checklist"
            />
            <ChecklistItem
              id="pitch-deck"
              label="One-page T.A.P. overview document ready to share"
              storageKey="module1-checklist"
            />
          </div>
        </section>

        {/* Personal Goals */}
        <section className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Set Your Outreach Goals</h2>
          <p className="text-emerald-50 mb-6">
            Having clear goals keeps you motivated and focused. Write down what you want to achieve:
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <InteractiveTextArea
              id="outreach-goals"
              label="My Outreach Goals (e.g., 'Contact 50 companies this quarter, secure 5 meetings, close 2 sponsors')"
              placeholder="Example: Contact 10 companies per week, secure 2 meetings per month, close 1 sponsor per quarter..."
              rows={4}
              storageKey="module1"
            />
          </div>
        </section>

        {/* Encouragement */}
        <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200 text-center">
          <p className="text-lg font-semibold text-blue-900">
            You're building something meaningful! Every sponsor you secure helps create a cleaner environment
            and more engaged communities.
          </p>
        </div>
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
