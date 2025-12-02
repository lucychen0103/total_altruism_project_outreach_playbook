import ModuleLayout from '../components/ModuleLayout';
import ChecklistItem from '../components/ChecklistItem';
import { Award, FileCheck, Heart, TrendingUp } from 'lucide-react';

interface Module7Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Module7({ onComplete, onBack }: Module7Props) {
  return (
    <ModuleLayout
      moduleNumber={7}
      title="Closing & Maintaining Partnerships"
      description="Seal the deal and nurture long-term relationships"
      onBack={onBack}
      onComplete={onComplete}
      color="bg-green-600"
    >
      <div className="space-y-8">
        {/* Moving to Agreement */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">From Verbal Yes to Signed Agreement</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-500">
              <h3 className="font-bold text-emerald-900 mb-3">The Closing Process:</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Verbal Commitment</h4>
                    <p className="text-sm text-gray-700">
                      Celebrate their decision! Confirm details: tier, budget, start date. Express enthusiasm
                      about the partnership.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Send Agreement Draft</h4>
                    <p className="text-sm text-gray-700">
                      Within 24 hours, send sponsorship agreement. Include clear terms, deliverables, and
                      payment schedule.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address Questions</h4>
                    <p className="text-sm text-gray-700">
                      Be responsive to their legal/procurement team. Expect negotiations on terms. Stay
                      flexible but protect key elements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Execute & Invoice</h4>
                    <p className="text-sm text-gray-700">
                      Once signed, send invoice per agreed payment terms. Begin onboarding process
                      immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-900 mb-2">Common Delay Reasons:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Legal review process (can take 2-4 weeks)</li>
                <li>• Budget approval workflows</li>
                <li>• Multiple stakeholder sign-offs</li>
                <li>• Procurement department requirements</li>
              </ul>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Stay patient and persistent.</strong> Check in weekly with friendly reminders.
              </p>
            </div>
          </div>
        </section>

        {/* Contract Basics */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileCheck className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Basic Contract Considerations</h2>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200 mb-6">
            <p className="text-sm text-red-800">
              <strong>⚠️ Important:</strong> This is educational information only, not legal advice. Always
              have contracts reviewed by a qualified attorney before finalizing agreements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-bold text-blue-900 mb-3">Essential Contract Elements:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <div>
                    <strong>Parties:</strong> Full legal names of both organizations
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <div>
                    <strong>Term:</strong> Start date, end date, renewal terms
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <div>
                    <strong>Payment:</strong> Amount, schedule, method
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <div>
                    <strong>Deliverables:</strong> Specific benefits and timeline
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <div>
                    <strong>Logo Usage:</strong> Rights and restrictions
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <div>
                    <strong>Termination:</strong> Conditions and notice period
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg">
              <h3 className="font-bold text-teal-900 mb-3">Payment Terms to Consider:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">✓</span>
                  <div>
                    <strong>Full Payment:</strong> 100% upfront (ideal for smaller amounts)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">✓</span>
                  <div>
                    <strong>50/50 Split:</strong> Half upfront, half at mid-term
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">✓</span>
                  <div>
                    <strong>Quarterly:</strong> 25% every 3 months (easier for budgets)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-600">✓</span>
                  <div>
                    <strong>Net 30:</strong> Payment due within 30 days of invoice
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-700 mt-3">
                <strong>Pro Tip:</strong> Larger sponsors often require quarterly invoicing for accounting
                purposes.
              </p>
            </div>
          </div>

          <div className="mt-6 bg-purple-50 p-5 rounded-lg">
            <h3 className="font-bold text-purple-900 mb-4">Exportable Contract Template:</h3>
            <div className="bg-white p-6 rounded-lg border-2 border-purple-200 mb-3">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
{`SPONSORSHIP AGREEMENT

This Sponsorship Agreement ("Agreement") is entered into on [Date], between:

The Total Altruism Project ("T.A.P.")
Address: [Your Organization Address]
Email: [Your Email]
Phone: [Your Phone Number]

AND

[Sponsor Company Legal Name] ("Sponsor")
Address: [Sponsor Address]
Email: [Sponsor Contact Email]
Phone: [Sponsor Phone Number]

WHEREAS, T.A.P. is a nonprofit organization dedicated to [brief mission statement]; and
WHEREAS, Sponsor desires to support T.A.P.'s mission and receive certain benefits in return.

NOW, THEREFORE, in consideration of the mutual covenants and agreements herein, the parties agree as follows:

1. AGREEMENT TERM
This Agreement shall commence on [Start Date] and continue through [End Date], unless terminated earlier in accordance with Section 7.

2. SPONSORSHIP LEVEL AND AMOUNT
Sponsor agrees to provide financial support at the [Bronze/Silver/Gold/Platinum] sponsorship level in the amount of $[Dollar Amount] USD.

3. PAYMENT TERMS
The sponsorship amount shall be paid as follows:
☐ Full payment of $[Amount] due upon execution of this Agreement
☐ 50% ($[Amount]) due upon execution, 50% ($[Amount]) due on [Mid-term Date]
☐ Quarterly payments of $[Amount] due on [Date], [Date], [Date], and [Date]
☐ Other: [Specify custom payment schedule]

Payment shall be made by:
☐ Check payable to "The Total Altruism Project" and mailed to [Address]
☐ Wire transfer to [Banking Details]
☐ Credit card via [Payment Link/Portal]

4. SPONSOR BENEFITS
In exchange for the sponsorship contribution, T.A.P. will provide the following benefits:

Recognition & Visibility:
• [e.g., Logo placement on T.A.P. website sponsor page]
• [e.g., Recognition in quarterly newsletter reaching 5,000+ subscribers]
• [e.g., Logo on [X] litter-grabber station installations]
• [e.g., Social media features on T.A.P. Instagram and Facebook (combined 10,000+ followers)]
• [List all recognition benefits from sponsorship tier]

Engagement Opportunities:
• [e.g., Invitation to [X] T.A.P. community events annually]
• [e.g., Opportunity for [X] employee volunteer days at T.A.P. installations]
• [e.g., Participation in joint press releases or media opportunities]
• [List all engagement benefits]

Impact Reporting:
• [e.g., Quarterly impact reports detailing litter removal statistics and community engagement]
• [e.g., Annual comprehensive impact summary with photos and testimonials]
• [e.g., Access to real-time data dashboard (if applicable)]

5. SPONSOR OBLIGATIONS
Sponsor agrees to:
• Provide high-resolution logo files in [formats: .PNG, .SVG, .EPS] within [5] business days of execution
• Review and approve any materials featuring Sponsor's logo within [3] business days of submission
• Designate a primary point of contact for partnership communications
• [Any other sponsor obligations]

6. LOGO AND TRADEMARK USAGE
• T.A.P. is granted a non-exclusive license to use Sponsor's name, logo, and trademarks solely for the purpose of fulfilling the benefits outlined in Section 4.
• All uses of Sponsor's marks shall comply with Sponsor's brand guidelines, if provided.
• Sponsor is granted a non-exclusive license to use T.A.P.'s name and logo to publicly acknowledge the partnership.
• All uses require prior written approval from the respective party, such approval not to be unreasonably withheld.
• Neither party may imply endorsement beyond the scope of this sponsorship.

7. TERMINATION
Either party may terminate this Agreement with [30/60/90] days written notice if:
• The other party materially breaches this Agreement and fails to cure within [15] days of written notice
• The other party ceases operations or becomes insolvent
• [Other termination conditions]

Upon termination:
• Sponsor remains obligated to pay any amounts due for benefits already provided
• T.A.P. will provide a pro-rated refund for unfulfilled benefits (if applicable)
• Both parties will cease use of the other's logos and trademarks within [30] days

8. IMPACT REPORTING
T.A.P. will provide Sponsor with impact reports according to the following schedule:
• [Monthly/Quarterly/Annual] updates including: [specific metrics]
• Reports will be delivered via [email/portal] to Sponsor's designated contact
• Reports will include: litter removal statistics, community engagement numbers, photos, and stories

9. CONFIDENTIALITY
Both parties agree to keep confidential any proprietary or sensitive information shared during this partnership, including financial terms, unless required by law or with prior written consent.

10. LIMITATION OF LIABILITY
To the fullest extent permitted by law, neither party shall be liable for indirect, incidental, consequential, or punitive damages arising from this Agreement.

11. INDEPENDENT CONTRACTOR
The parties are independent contractors. This Agreement does not create a partnership, joint venture, agency, or employment relationship.

12. RENEWAL
The parties may discuss renewal options beginning [90] days prior to the Agreement end date. Any renewal shall be subject to a new written agreement.

13. GENERAL PROVISIONS
• This Agreement constitutes the entire agreement between the parties
• Any amendments must be in writing and signed by both parties
• This Agreement shall be governed by the laws of [State/Jurisdiction]
• Any disputes shall be resolved through [mediation/arbitration/courts of [County, State]]
• If any provision is found invalid, the remainder of the Agreement remains in effect
• Notices shall be sent to the addresses listed above or as updated in writing

AGREED AND ACCEPTED:

FOR THE TOTAL ALTRUISM PROJECT:

________________________________
Signature

________________________________
[Your Name], [Your Title]

Date: ___________________________


FOR [SPONSOR COMPANY NAME]:

________________________________
Signature

________________________________
[Contact Name], [Title]

Date: ___________________________`}
              </pre>
            </div>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">
                <strong>How to use:</strong> Select all text above, copy it to a document editor, then fill in all [bracketed] sections with your specific information. Check boxes (☐) can be marked with an X when applicable.
              </p>
            </div>
          </div>
        </section>

        {/* Onboarding Process */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Onboarding New Sponsors</h2>
          </div>

          <p className="text-gray-600 mb-6">
            First impressions set the tone for the entire partnership. Create a smooth onboarding experience:
          </p>

          <div className="space-y-3 mb-6">
            <ChecklistItem
              id="welcome-email"
              label="Send welcome email with partnership overview and timeline"
              storageKey="module7-onboarding"
            />
            <ChecklistItem
              id="logo-request"
              label="Request high-resolution logos and brand guidelines"
              storageKey="module7-onboarding"
            />
            <ChecklistItem
              id="kickoff-call"
              label="Schedule kickoff call with key stakeholders"
              storageKey="module7-onboarding"
            />
            <ChecklistItem
              id="deliverables-timeline"
              label="Share detailed timeline for all deliverables"
              storageKey="module7-onboarding"
            />
            <ChecklistItem
              id="point-of-contact"
              label="Establish single point of contact on both sides"
              storageKey="module7-onboarding"
            />
            <ChecklistItem
              id="social-announcement"
              label="Plan joint social media announcement"
              storageKey="module7-onboarding"
            />
            <ChecklistItem
              id="first-report"
              label="Set date for first impact report delivery"
              storageKey="module7-onboarding"
            />
          </div>

          <div className="bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-500">
            <h3 className="font-bold text-emerald-900 mb-2">The First 30 Days Are Critical:</h3>
            <p className="text-sm text-gray-700">
              Over-communicate in the first month. Send updates on progress, share early wins, introduce team
              members. This builds confidence and excitement about the partnership.
            </p>
          </div>
        </section>

        {/* Maintaining Relationships */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-pink-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-pink-100 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Nurturing Long-Term Partnerships</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Regular Touchpoints:</h3>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Monthly</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Impact updates (even brief ones)</li>
                  <li>• Photos of stations in action</li>
                  <li>• Community stories</li>
                </ul>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">Quarterly</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Formal impact report</li>
                  <li>• Check-in call</li>
                  <li>• Social media features</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Annually</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Year-end comprehensive report</li>
                  <li>• Renewal discussion</li>
                  <li>• Future opportunities planning</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Going Above & Beyond:</h3>

              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">★</span>
                    <div>Send handwritten thank you notes for major milestones</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">★</span>
                    <div>Surprise them with extra coverage or media mentions</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">★</span>
                    <div>Invite them to special T.A.P. events</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">★</span>
                    <div>Create custom content for their internal communications</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">★</span>
                    <div>Acknowledge their team members publicly</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">★</span>
                    <div>Remember and celebrate their company milestones</div>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Building Champions:</h4>
                <p className="text-sm text-gray-700">
                  Identify and nurture internal champions at sponsor companies. These advocates will defend
                  the partnership during budget reviews and renewal discussions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Renewal Strategy */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Renewal Strategy</h2>

          <div className="space-y-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">90 Days Before Expiration:</h3>
              <p className="text-green-50 text-sm">
                Begin renewal conversations. Share preliminary year-end data. Ask about their satisfaction and
                future goals.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">60 Days Before:</h3>
              <p className="text-green-50 text-sm">
                Present renewal proposal. Consider offering upgrade options or multi-year discounts. Emphasize
                continuity of impact.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2">30 Days Before:</h3>
              <p className="text-green-50 text-sm">
                Follow up on proposal. Address any concerns. If they're hesitant, offer to maintain at current
                level rather than lose partnership.
              </p>
            </div>
          </div>

          <div className="bg-white/20 rounded-lg p-5">
            <h3 className="font-bold mb-3">Renewal Success Factors:</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-green-50">Delivered all promised benefits</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-green-50">Regular communication maintained</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-green-50">Provided measurable impact data</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-green-50">Built strong personal relationships</span>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Update Template */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Sponsor Update Template</h2>

          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-3">Email Template:</h3>
            <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
{`Subject: [Month] Impact Update - [Sponsor Name] Partnership

Hi [Contact Name],

Happy to share this month's highlights from your T.A.P. partnership!

📊 IMPACT THIS MONTH:
• [X] lbs of litter removed from your sponsored stations
• [X] community members participated
• [X] volunteer hours contributed

📸 VISUAL HIGHLIGHTS:
[Attach 2-3 photos]

🎉 SPECIAL MOMENT:
[Brief story or testimonial]

🔜 COMING UP:
[Any upcoming activities or events]

As always, let me know if you need anything or have questions!

Best,
[Your Name]`}
              </pre>
            </div>
            <div className="mt-3 bg-teal-50 p-3 rounded border-l-4 border-teal-500">
              <p className="text-sm text-gray-700">
                <strong>How to use:</strong> Copy this template and personalize it with specific numbers, photos, and stories each month. Keep the tone warm and personal while showcasing measurable impact.
              </p>
            </div>
          </div>
        </section>

        {/* Final Celebration */}
        <section className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-xl shadow-lg p-8 text-white text-center">
          <div className="mb-4">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">Congratulations!</h2>
          </div>

          <p className="text-xl mb-4">
            You've completed all 7 modules of the T.A.P. Outreach Playbook!
          </p>

          <p className="text-lg text-yellow-50 max-w-2xl mx-auto mb-6">
            You now have everything you need to successfully find sponsors, make compelling presentations, close
            deals, and build lasting partnerships. Remember: every sponsor you secure directly contributes to
            cleaner communities and a healthier planet.
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="font-bold text-xl mb-3">Your Next Steps:</h3>
            <ol className="text-left space-y-2 text-yellow-50">
              <li>1. Review the Template Library for all ready-to-use materials</li>
              <li>2. Set up your contact tracking system</li>
              <li>3. Research and list your first 20 target companies</li>
              <li>4. Start reaching out - aim for 10 emails this week</li>
              <li>5. Celebrate small wins along the way</li>
            </ol>
          </div>

          <div className="mt-8 text-2xl font-bold">
            You're making the world cleaner, one sponsor at a time! 🌍
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
