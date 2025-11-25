import { ArrowLeft, Copy, Mail, FileText, Users, MessageSquare, Handshake, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface TemplateLibraryProps {
  onBack: () => void;
}

export default function TemplateLibrary({ onBack }: TemplateLibraryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const templates = [
    {
      id: 'cold-email',
      title: 'First Outreach Email',
      category: 'Email Templates',
      icon: Mail,
      color: 'bg-blue-500',
      content: `Subject: Re: Partnership Opportunity: [Company Name] x T.A.P.

Dear [Name],

My name is Gary Blume and I'm reaching out as the founder of the Total Altruism Project (TAP), an environmental nonprofit based in San Diego dedicated to advancing practical, community-first solutions for climate action and sustainability.

I started TAP with a simple goal: to make it easier for people to care for the places they already love. Thus, we install litter-grabber stations in parks so anyone can take part in keeping their neighborhood clean. Over time, when communities have the tools and opportunity to take small actions together, those efforts grow into real pride and connection.

I've been following [Company Name]'s work, especially [specific initiative, for example REI's Opt Outside movement], and I really admire your commitment to community and environmental well-being. I believe our values align and see great potential for collaboration, especially with the momentum TAP is building in San Diego.

Please see the attached proposal for details on our activities and sponsorship opportunities. If you're interested in connecting, I'd be happy to set up a call or meet in person at your convenience (here's my Calendly: [Calendly link]).

Thanks for considering. Looking forward to connecting soon!

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'follow-up-1',
      title: 'Follow-Up Email #1 (Day 3)',
      category: 'Email Templates',
      icon: Mail,
      color: 'bg-teal-500',
      content: `Subject: Re: Partnership Opportunity: [Company Name] x T.A.P.

Dear [Name],

I'm writing to politely follow up on the email I sent a few days ago regarding a potential collaboration between [Company Name] and the Total Altruism Project. I'm resending it below for easy reference.

At TAP, we've seen firsthand how our litter-grabber stations bring neighbors and businesses together, creating unique moments where people see their impact on their environment. Thus, your support plays a direct role in making that possible.

We offer:
- Recognition opportunities at events and on social media
- Volunteer programs for your employees
- Customizable sponsorship packages to meet your CSR goals

Our missions align so well, and I'd love to find a brief 20-minute slot in your calendar in the coming weeks. Here's my Calendly link to find a time that works: [Calendly Link]

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'follow-up-2',
      title: 'Follow-Up Email #2 (Day 7)',
      category: 'Email Templates',
      icon: Mail,
      color: 'bg-emerald-500',
      content: `Subject: Re: Partnership Opportunity: [Company Name] x T.A.P.

Dear [Name],

Hope you've had a great week! I'm following up and really curious…Did anything in our proposal surprise or spark questions for you?

If you are still hesitating, here are 3 reasons why you should collaborate with the Total Altruism Project:
- Purpose-Driven Collaboration: We design all efforts around measurable impact, local engagement, and transparent reporting.
- Visibility and Goodwill: Our channels connect with an active network of advocates, students, and community leaders. Highlighting your partnership would showcase genuine corporate citizenship.
- Tailored Opportunities: From sponsorship packages to employee volunteer programs, we create meaningful avenues for companies to participate based on their capacity and priorities.

As I thought about [Company Name]'s commitment to community, I kept imagining what we might accomplish by combining forces. From co-hosted clean-up days to fun local challenges, the possibilities are exciting.

I am open to any ideas! What partnership would inspire you and your team most?

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'follow-up-3',
      title: 'Follow-Up #3 (3 Days After the Last Email)',
      category: 'Email Templates',
      icon: Mail,
      color: 'bg-cyan-500',
      content: `Subject: Re: Partnership Opportunity: [Company Name] x T.A.P.

Dear [Name],

As the Total Altruism Project grows, we've seen tremendous interest from schools in using our stations for environmental education.

A partnership could position [Company Name] as a leader in [their priorities, such as supporting hands-on learning for youth] – creating a direct link between your company and the next generation of eco-conscious citizens.

Would you be interested in brainstorming youth engagement initiatives with us?

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'follow-up-4',
      title: 'Follow-Up #4 (1 week After Last Email)',
      category: 'Email Templates',
      icon: Mail,
      color: 'bg-sky-500',
      content: `Subject: Building Community Impact Together

Dear [Name],

I wanted to follow up once more and share that TAP is currently expanding our community network across San Diego. We're identifying a few select partners to collaborate on this next phase — particularly those who value visible, local impact.

Your team's focus on [insert company's focus, e.g., sustainability, local engagement, education] really stood out to me, and I believe this could be a great fit. Even a small collaboration could make a tangible difference in how residents interact with their parks and neighborhoods.

Would you be open to a short exploratory call next week to discuss possibilities?

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'follow-up-5',
      title: 'Follow-Up #5 (10–14 Days Later)',
      category: 'Email Templates',
      icon: Mail,
      color: 'bg-lime-500',
      content: `Subject: Quick Update from T.A.P.

Dear [Name],

I wanted to send a quick update on T.A.P.'s progress. We recently installed new litter-grabber stations in two additional parks, which led to a 48% reduction in visible litter within the first month. It's amazing to see how visible action encourages others to get involved.

We're now looking for partners to help replicate this success in new communities. It would be wonderful to explore how [Company Name] could be part of this momentum — whether through sponsorship, employee volunteering, or shared storytelling.

Would you be open to a brief conversation this month?

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'follow-up-6',
      title: 'Follow-Up #6 (Final Touchpoint, 3–4 Weeks Later)',
      category: 'Email Templates',
      icon: Mail,
      color: 'bg-amber-500',
      content: `Subject: Keeping the Door Open for Future Collaboration

Dear [Name],

I know your time is valuable, so I wanted to send one final note and thank you for considering a partnership with the Total Altruism Project. We deeply appreciate organizations that share our belief that small, visible actions can create lasting community change.

If this isn't the right time, I completely understand. I'd still love to keep in touch and share periodic updates — perhaps we can revisit the conversation later this year.
Thank you again for your time and for the work you're doing to strengthen communities and the environment.

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'meeting-request',
      title: 'Meeting Confirmation Email',
      category: 'Email Templates',
      icon: Handshake,
      color: 'bg-orange-500',
      content: `Subject: Confirmed: T.A.P. Partnership Discussion - [Date/Time]

Hi [First Name],

Thank you for agreeing to meet! I'm looking forward to our conversation on [Date] at [Time].

Meeting Details:
• Date: [Date]
• Time: [Time] [Timezone]
• Duration: 30 minutes
• Video Link: [Zoom/Google Meet Link]

What we'll cover:
1. T.A.P.'s mission and impact to date
2. Partnership benefits and sponsorship tiers
3. Success stories from current sponsors
4. Next steps and timeline

Please let me know if you'd like me to send any materials in advance.

See you soon,
[Your Name]`
    },
    {
      id: 'thank-you',
      title: 'Post-Meeting Thank You',
      category: 'Email Templates',
      icon: CheckCircle,
      color: 'bg-green-500',
      content: `Subject: Thank you - T.A.P. Partnership Discussion

Hi [Name],

It was a pleasure speaking with you on [write the day]! I enjoyed learning about [state key takeaways/details from your initial conversation, especially things that will be most relevant for the next steps]. I really appreciate you taking the time to share all of this with me.

As we discussed, [mention the key points of the value proposition of TAP that you highlighted for this company and/or the next steps and how can you can help achieve them, but really focus on what seems most appropriate to get the ball rolling and keep everything concise]

Please don't hesitate to reach out if you have any questions or if there is anything else I can provide at the moment. I look forward to what is to come and help [you/your company] achieve [any specific goal/objective].

Warm regards,
Gary Blume
Founder | Total Altruism Project
[Phone Number] | [Email Address] | [Website Link] | [Calendly Link]`
    },
    {
      id: 'industry-customization',
      title: 'Customization Guide for Different Industries',
      category: 'Reference Guides',
      icon: FileText,
      color: 'bg-violet-500',
      isTable: true,
      tableData: {
        headers: ['Industry', 'Guiding Point'],
        rows: [
          {
            industry: 'Retail & Consumer Goods',
            guidingPoint: 'Focus on brand visibility and local connection. Mention how TAP installations provide everyday visibility and goodwill among community members, aligning with customer values and local engagement.'
          },
          {
            industry: 'Environmental Services & Waste Management',
            guidingPoint: 'Emphasize TAP\'s contribution to cleaner, safer environments and waste reduction. Highlight quantifiable data like decreased litter volume and increased recycling awareness in community parks.'
          },
          {
            industry: 'Local Government & Public Agencies',
            guidingPoint: 'Focus on civic pride, public engagement, and neighborhood revitalization. Position TAP as a partner that supports city beautification goals and encourages residents to participate in maintaining clean public spaces.'
          },
          {
            industry: 'Health & Wellness',
            guidingPoint: 'Connect TAP\'s mission to mental and physical health benefits of clean, safe environments. Emphasize how cleaner parks promote wellbeing and social connection.'
          },
          {
            industry: 'Hospitality & Tourism',
            guidingPoint: 'Focus on creating welcoming, attractive public spaces that improve visitor experience. Mention how TAP initiatives contribute to community reputation and local tourism appeal.'
          },
          {
            industry: 'Construction & Real Estate Development',
            guidingPoint: 'Emphasize TAP\'s role in enhancing neighborhood appeal and long-term property value. Note how visible community care increases livability and local pride around development sites.'
          },
          {
            industry: 'Outdoor & Recreation',
            guidingPoint: 'Highlight shared goals around environmental stewardship, access to nature, and community engagement in outdoor spaces. Mention TAP\'s role in keeping parks and trails clean to support active lifestyles and sustainability.'
          },
          {
            industry: 'Technology & Startups',
            guidingPoint: 'Highlight TAP\'s innovative, data-driven approach to community building. Mention the potential to collaborate on tech-enabled tracking or impact measurement tools.'
          }
        ]
      }
    },
    {
      id: 'sponsor-sheet',
      title: 'Contact Tracking Spreadsheet Structure',
      category: 'Tracking Templates',
      icon: Users,
      color: 'bg-purple-500',
      content: `CONTACT TRACKING SPREADSHEET COLUMNS:

1. Company Name
2. Contact Name
3. Contact Title
4. Email Address
5. Phone Number
6. LinkedIn URL
7. Company Website
8. Industry
9. Employee Count
10. CSR/Environmental Initiatives
11. Date First Contact
12. Last Contact Date
13. Outreach Stage (Cold/Warm/Meeting/Proposal/Closed)
14. Email Status (Sent/Opened/Replied/No Response)
15. Follow-Up Date
16. Meeting Date
17. Proposal Tier (Bronze/Silver/Gold/Platinum)
18. Status (Prospect/Qualified/Negotiation/Won/Lost)
19. Notes
20. Next Action Required`
    },
    {
      id: 'meeting-agenda',
      title: 'Sponsor Meeting Agenda',
      category: 'Meeting Templates',
      icon: MessageSquare,
      color: 'bg-pink-500',
      content: `SPONSOR MEETING AGENDA (30 minutes)

INTRODUCTION (5 min)
• Thank attendees for their time
• Brief overview of meeting goals
• Quick ice breaker about their company's environmental initiatives

T.A.P. OVERVIEW (8 min)
• Mission: Making environmental action accessible
• Current impact: [# of stations, litter removed, participants]
• Geographic reach and expansion plans
• Visual examples of T.A.P. stations in action

PARTNERSHIP BENEFITS (7 min)
• Review sponsorship tiers
• Focus on tier most relevant to their budget
• Show case studies from similar companies
• ROI: Community goodwill, brand visibility, employee engagement

THEIR NEEDS & GOALS (7 min)
• What are their current CSR priorities?
• What challenges are they facing in community engagement?
• How do they measure CSR success?
• Budget considerations and timing

NEXT STEPS (3 min)
• Summarize key points
• Send proposal within [timeframe]
• Schedule follow-up meeting
• Answer any remaining questions

FOLLOW-UP ITEMS:
□ Send meeting recap email within 24 hours
□ Prepare custom proposal
□ Connect on LinkedIn
□ Schedule follow-up meeting`
    },
  ];

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Template Library</h1>
            <p className="text-gray-600 mt-1">Ready-to-use templates for every stage of your outreach</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {templates
                .filter((t) => t.category === category)
                .map((template) => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.id}
                      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`${template.color} p-3 rounded-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{template.title}</h3>
                        </div>
                        {!template.isTable && (
                          <button
                            onClick={() => copyToClipboard(template.content || '', template.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                          >
                            {copiedId === template.id ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      {template.isTable && template.tableData ? (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-100">
                                {template.tableData.headers.map((header, idx) => (
                                  <th
                                    key={idx}
                                    className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {template.tableData.rows.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="border border-gray-300 px-4 py-3 text-gray-900 align-top">
                                    {row.industry}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-3 text-gray-700 align-top">
                                    {row.guidingPoint}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                          {template.content}
                        </pre>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="mt-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Pro Tip: Customize Every Template</h3>
          <p className="text-emerald-50">
            These templates are starting points. Always personalize them with specific details about the company
            you're reaching out to. Reference their recent initiatives, achievements, or values to show you've
            done your research.
          </p>
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
      </main>
    </div>
  );
}
