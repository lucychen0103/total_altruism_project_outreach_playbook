import ModuleLayout from '../components/ModuleLayout';
import ChecklistItem from '../components/ChecklistItem';
import { Lightbulb, Target, Rocket, Sparkles, CheckCircle2, AlertCircle, Plus, Minus, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Module1Props {
  onComplete: () => void;
  onBack: () => void;
}

interface FeedbackItem {
  type: 'success' | 'warning' | 'tip';
  message: string;
}

interface OutreachGoal {
  id: string;
  label: string;
  target: number;
  current: number;
  unit: string;
  color: string;
}

function analyzePitch(pitch: string): FeedbackItem[] {
  const feedback: FeedbackItem[] = [];
  const wordCount = pitch.trim().split(/\s+/).length;
  const lowerPitch = pitch.toLowerCase();

  // Word count check
  if (wordCount < 30) {
    feedback.push({
      type: 'warning',
      message: 'Your pitch seems short. Aim for 80-100 words to adequately explain the value proposition.'
    });
  } else if (wordCount > 120) {
    feedback.push({
      type: 'warning',
      message: 'Your pitch is getting long. Try to keep it under 100 words for a crisp 30-second delivery.'
    });
  } else {
    feedback.push({
      type: 'success',
      message: `Good length! Your pitch is ${wordCount} words, which fits well within 30 seconds.`
    });
  }

  // Introduction check
  if (lowerPitch.includes("i'm") || lowerPitch.includes("my name")) {
    feedback.push({
      type: 'success',
      message: 'Great! You included a personal introduction.'
    });
  } else {
    feedback.push({
      type: 'tip',
      message: 'Consider starting with a personal introduction: "Hi, I\'m [Name] from T.A.P..."'
    });
  }

  // T.A.P. or organization mention
  if (lowerPitch.includes('t.a.p') || lowerPitch.includes('total altruism')) {
    feedback.push({
      type: 'success',
      message: 'Good! You mentioned the organization name.'
    });
  } else {
    feedback.push({
      type: 'warning',
      message: 'Make sure to mention "The Total Altruism Project" or "T.A.P." in your pitch.'
    });
  }

  // Problem or solution mention
  const hasProblem = lowerPitch.includes('litter') || lowerPitch.includes('cleanup') ||
                     lowerPitch.includes('environment') || lowerPitch.includes('community');
  if (hasProblem) {
    feedback.push({
      type: 'success',
      message: 'Excellent! You addressed the problem or solution clearly.'
    });
  } else {
    feedback.push({
      type: 'tip',
      message: 'Emphasize the problem you solve: litter, community engagement, or environmental impact.'
    });
  }

  // Partnership language
  const hasPartnership = lowerPitch.includes('partner') || lowerPitch.includes('sponsor') ||
                        lowerPitch.includes('collaborate') || lowerPitch.includes('work with');
  if (hasPartnership) {
    feedback.push({
      type: 'success',
      message: 'Great use of partnership language! This frames it as collaboration, not charity.'
    });
  } else {
    feedback.push({
      type: 'tip',
      message: 'Use partnership language: "partner with," "collaborate," or "work together" rather than focusing on donations.'
    });
  }

  // Value proposition for sponsors
  const hasValue = lowerPitch.includes('brand') || lowerPitch.includes('visibility') ||
                   lowerPitch.includes('esg') || lowerPitch.includes('impact') ||
                   lowerPitch.includes('csr') || lowerPitch.includes('employee') ||
                   lowerPitch.includes('community engagement');
  if (hasValue) {
    feedback.push({
      type: 'success',
      message: 'Nice! You highlighted specific value for sponsors.'
    });
  } else {
    feedback.push({
      type: 'warning',
      message: 'Include sponsor benefits: brand visibility, ESG metrics, employee engagement, or measurable impact.'
    });
  }

  // Call to action
  const hasCTA = lowerPitch.includes('?') || lowerPitch.includes('discuss') ||
                 lowerPitch.includes('schedule') || lowerPitch.includes('meeting') ||
                 lowerPitch.includes('call') || lowerPitch.includes('interested') ||
                 lowerPitch.includes('learn more');
  if (hasCTA) {
    feedback.push({
      type: 'success',
      message: 'Perfect! You included a call to action.'
    });
  } else {
    feedback.push({
      type: 'tip',
      message: 'End with a clear call to action: "Would you be open to a brief call?" or "Can we schedule 15 minutes to discuss?"'
    });
  }

  return feedback;
}

export default function Module1({ onComplete, onBack }: Module1Props) {
  const [elevatorPitch, setElevatorPitch] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);

  const [goals, setGoals] = useState<OutreachGoal[]>([
    { id: 'contacts', label: 'Companies Contacted', target: 50, current: 0, unit: 'companies', color: 'bg-blue-500' },
    { id: 'meetings', label: 'Meetings Secured', target: 10, current: 0, unit: 'meetings', color: 'bg-purple-500' },
    { id: 'sponsors', label: 'Sponsors Closed', target: 3, current: 0, unit: 'sponsors', color: 'bg-emerald-500' }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('module1-outreach-goals');
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load goals');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('module1-outreach-goals', JSON.stringify(goals));
  }, [goals]);

  const updateGoal = (id: string, field: 'target' | 'current', value: number) => {
    setGoals(goals.map(g =>
      g.id === id ? { ...g, [field]: Math.max(0, value) } : g
    ));
  };

  const incrementCurrent = (id: string) => {
    setGoals(goals.map(g =>
      g.id === id ? { ...g, current: Math.min(g.current + 1, g.target) } : g
    ));
  };

  const decrementCurrent = (id: string) => {
    setGoals(goals.map(g =>
      g.id === id ? { ...g, current: Math.max(0, g.current - 1) } : g
    ));
  };
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
            <h2 className="text-2xl font-bold text-gray-900">Sponsor Positioning & Value Proposition</h2>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg mb-6 border-2 border-emerald-200">
            <p className="text-lg italic text-gray-700 mb-2">
              "If we make it easier for people to do good, more people will do it — and that will make the world, and everyone in it, a little happier."
            </p>
            <p className="text-sm text-gray-600 font-semibold">— T.A.P.'s Central Belief</p>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900">The Four Core Impact Metrics: T.A.P.'s Pillars of Identity</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-5 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-bold text-orange-900 mb-3 text-lg">Educational Impact</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>35 education standards</strong> reinforced using T.A.P.</li>
                  <li>• <strong>64+ nearby schools</strong> located within one block of a community park—ready for expansion</li>
                </ul>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-600">
                <h4 className="font-bold text-green-900 mb-3 text-lg">Environmental Impact</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Mesa College research showed a <strong>~30-46% drop in litter</strong> after T.A.P. grabber installations</li>
                  <li>• National benchmarks (e.g., Keep America Beautiful) report <strong>25-35% sustained litter reduction</strong>, reinforcing T.A.P.'s measurable impact</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-900 mb-3 text-lg">Wellbeing Impact</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Strengthens community cohesion and shared purpose across <strong>families, seniors, and youth groups</strong></li>
                  <li>• Volunteering linked to a <strong>7-11% boost</strong> in life satisfaction and social wellbeing</li>
                </ul>
              </div>

              <div className="bg-cyan-50 p-5 rounded-lg border-l-4 border-cyan-500">
                <h4 className="font-bold text-cyan-900 mb-3 text-lg">Behavioral Impact</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Youth volunteers are <strong>66% more likely to flourish</strong>, showing stronger purpose and civic engagement</li>
                  <li>• Adult volunteers experience a <strong>4% lower risk of depression</strong> through purpose-driven action</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-5 rounded-lg border-2 border-gray-300">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                Brand Alignment
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Corporations with CSR/ESG goals would be ideal</li>
                <li>• Specifically, corporations that align with one of the four core metrics identified for T.A.P.</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border-2 border-blue-300">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">📢</span>
                Audience Reach
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Community reach:</strong> The estimated size and scope of T.A.P.'s audience</li>
                <li>• <strong>Engagement channels:</strong> How T.A.P. reaches those groups</li>
              </ul>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg border-2 border-teal-300">
              <h4 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                Value Proposition
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Sponsors can place logos on T.A.P. signage and literature (e.g., PB Coalition)</li>
                <li>• Co-branding opportunities for sponsors</li>
                <li>• Sponsors can expect positive emotional value related to the four core metrics</li>
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

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Write Your Elevator Pitch
              </label>
              <textarea
                value={elevatorPitch}
                onChange={(e) => {
                  setElevatorPitch(e.target.value);
                  setShowFeedback(false);
                }}
                placeholder="Hi, I'm [Your Name] from The Total Altruism Project..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={() => {
                if (elevatorPitch.trim()) {
                  setFeedback(analyzePitch(elevatorPitch));
                  setShowFeedback(true);
                }
              }}
              disabled={!elevatorPitch.trim()}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              <Sparkles className="w-5 h-5" />
              Get AI Feedback
            </button>

            {showFeedback && feedback.length > 0 && (
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-900">AI Feedback on Your Pitch</h3>
                </div>
                <div className="space-y-3">
                  {feedback.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-lg ${
                        item.type === 'success'
                          ? 'bg-green-100 border-l-4 border-green-500'
                          : item.type === 'warning'
                          ? 'bg-yellow-100 border-l-4 border-yellow-500'
                          : 'bg-blue-100 border-l-4 border-blue-500'
                      }`}
                    >
                      {item.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-sm text-gray-800">{item.message}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-white/60 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Keep refining your pitch and check the feedback again. Practice saying it out loud to ensure
                    it flows naturally!
                  </p>
                </div>
              </div>
            )}
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
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Track Your Outreach Goals</h2>
          </div>
          <p className="text-emerald-50 mb-6">
            Set your targets and track your progress. Update your current progress as you reach out to companies!
          </p>

          <div className="space-y-6">
            {goals.map((goal) => {
              const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
              const isComplete = goal.current >= goal.target;

              return (
                <div key={goal.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-white">{goal.label}</h3>
                    {isComplete && (
                      <CheckCircle2 className="w-6 h-6 text-green-300" />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-emerald-100 block mb-2">Target Goal</label>
                      <input
                        type="number"
                        min="0"
                        value={goal.target}
                        onChange={(e) => updateGoal(goal.id, 'target', Number(e.target.value))}
                        className="w-full px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:border-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-emerald-100 block mb-2">Current Progress</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => decrementCurrent(goal.id)}
                          disabled={goal.current === 0}
                          className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="0"
                          max={goal.target}
                          value={goal.current}
                          onChange={(e) => updateGoal(goal.id, 'current', Number(e.target.value))}
                          className="flex-1 px-3 py-2 rounded bg-white/20 text-white border border-white/30 focus:border-white focus:outline-none text-center"
                        />
                        <button
                          onClick={() => incrementCurrent(goal.id)}
                          disabled={goal.current >= goal.target}
                          className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-emerald-100">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                      <span className="font-bold text-white">{percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${goal.color} transition-all duration-500 rounded-full`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {isComplete && (
                    <div className="mt-3 bg-green-400/20 border border-green-300 text-green-100 px-3 py-2 rounded text-sm font-semibold">
                      Goal achieved! Great work!
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-bold text-white mb-2 text-sm">Quick Tips:</h4>
            <ul className="text-xs text-emerald-100 space-y-1">
              <li>• Update your progress after each outreach attempt</li>
              <li>• Adjust targets as you learn what's realistic for your schedule</li>
              <li>• Celebrate small wins - each contact brings you closer to sponsorship!</li>
            </ul>
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
