import ModuleLayout from '../components/ModuleLayout';
import { TrendingUp, Award, Package, Users } from 'lucide-react';
import { useState } from 'react';

interface Module5Props {
  onComplete: () => void;
  onBack: () => void;
}

export default function Module5({ onComplete, onBack }: Module5Props) {
  const [selectedTier, setSelectedTier] = useState<string>('gold');

  const tiers = [
    {
      id: 'bronze',
      name: 'Bronze',
      price: '$1,000',
      color: 'from-orange-400 to-amber-600',
      borderColor: 'border-amber-500',
      benefits: [
        'Logo on T.A.P. website',
        'Social media thank you post (example reach: ~300)',
        'Inclusion in annual impact report',
        'Tax-deductible contribution'
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      price: '$5,000',
      color: 'from-gray-400 to-gray-600',
      borderColor: 'border-gray-500',
      benefits: [
        'All Bronze benefits',
        'Logo signage at 2 T.A.P. stations (example monthly reach: ~10,000)',
        'Quarterly impact reports',
        'Recognition in press releases',
        'Social media spotlight (quarterly)'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: '$10,000',
      color: 'from-yellow-400 to-yellow-600',
      borderColor: 'border-yellow-500',
      popular: true,
      benefits: [
        'All Silver benefits',
        'Logo signage at 5 T.A.P. stations (example monthly reach: ~25,000)',
        'Monthly impact reports with photos',
        'Employee volunteer event',
        'Co-branded marketing materials',
        'Speaking opportunity at T.A.P. event'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: '$25,000+',
      color: 'from-slate-400 to-slate-700',
      borderColor: 'border-slate-600',
      benefits: [
        'All Gold benefits',
        'Custom branded T.A.P. station',
        'Dedicated impact page on website',
        'Executive advisory board seat',
        'Premium media & PR package',
        'Employee engagement program',
        'Quarterly sponsor showcase events'
      ]
    }
  ];

  return (
    <ModuleLayout
      moduleNumber={5}
      title="Sponsorship Packages & Proposals"
      description="Create tiered offerings that showcase value"
      onBack={onBack}
      onComplete={onComplete}
      color="bg-purple-500"
    >
      <div className="space-y-8">
        {/* Tiered Packages Overview */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">T.A.P. Sponsorship Tiers Example</h2>
          </div>

          <p className="text-gray-600 mb-8">
            Offering multiple tiers gives prospects options and makes it easier for them to say yes at their
            comfort level:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative bg-white rounded-xl border-3 ${
                  tier.popular ? 'border-yellow-400 shadow-lg' : 'border-gray-200'
                } p-6 hover:shadow-xl transition-all cursor-pointer ${
                  selectedTier === tier.id ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className={`bg-gradient-to-br ${tier.color} text-white p-4 rounded-lg mb-4 text-center`}>
                  <h3 className="text-2xl font-bold">{tier.name}</h3>
                  <p className="text-3xl font-bold mt-2">{tier.price}</p>
                </div>

                <ul className="space-y-3">
                  {tier.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-emerald-500 font-bold flex-shrink-0">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-blue-900 mb-2">Pricing Psychology Tips:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Offer 3-4 tiers to create choice without overwhelming</li>
              <li>• Make middle tier most attractive (anchor effect)</li>
              <li>• Show value progression clearly</li>
              <li>• Use "+ Custom" on highest tier to suggest flexibility</li>
              <li>• Present annually vs. monthly to reduce sticker shock</li>
            </ul>
          </div>

          <div className="mt-4 bg-emerald-50 p-5 rounded-lg border-l-4 border-emerald-500">
            <h3 className="font-bold text-emerald-900 mb-2">Reach Estimates (Examples Only):</h3>
            <p className="text-sm text-gray-700 mb-2">
              <strong className="text-emerald-800">Note: These are example figures for illustration purposes only and not accurate projections.</strong> Monthly reach per T.A.P. station is estimated at <strong>5,000 people</strong>. Additional stations multiply your reach:
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• 1 station = ~5,000 monthly reach (example)</li>
              <li>• 2 stations = ~10,000 monthly reach (example)</li>
              <li>• 5 stations = ~25,000 monthly reach (example)</li>
              <li>• Social media posts provide additional reach of ~300 per post (example)</li>
            </ul>
          </div>
        </section>

        {/* Real-World Example: Pacific Beach Coalition */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Learning from Pacific Beach Coalition</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">
                Northern California Nonprofit Success Story
              </h3>
              <p className="text-gray-700 mb-4">
                The Pacific Beach Coalition, a Northern California environmental nonprofit, offers an excellent
                sponsorship model that T.A.P. can learn from. Their approach demonstrates transparency,
                clear value proposition, and audience reach metrics.
              </p>
              <a
                href="https://www.pacificbeachcoalition.org/become-a-sponsor/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-sm underline"
              >
                View Pacific Beach Coalition's Sponsorship Page →
              </a>
            </div>

            <div className="bg-white border-2 border-emerald-200 rounded-lg p-6">
              <h3 className="font-bold text-emerald-900 mb-4 text-lg">
                Their Sponsorship Model ($1,500/year)
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-bold text-emerald-900 mb-2 text-sm">Multiple Touchpoints</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Registration table presence (60-100 people per event)</li>
                      <li>• Monthly newsletter (20,000 readers)</li>
                      <li>• Event emails (100-600 readers)</li>
                      <li>• Partner webpage (3,000 people)</li>
                      <li>• Social media announcements (2,000 people)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2 text-sm">Key Features</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Beach cleanup/habitat restoration sponsorship</li>
                      <li>• Earth Day & EcoFest Partners page feature</li>
                      <li>• Annual EcoFest reach (5,500+ individuals)</li>
                      <li>• 501(c)(3) tax-deductible donations</li>
                      <li>• Customizable sponsorship packages</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
              <h3 className="font-bold text-purple-900 mb-4 text-lg">
                Key Takeaways for T.A.P.
              </h3>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📊</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Transparent Reach Metrics</h4>
                      <p className="text-sm text-gray-700">
                        Pacific Beach Coalition lists specific audience numbers for each benefit (newsletter: 20,000 readers,
                        social media: 2,000 people). T.A.P. should similarly quantify reach for stations, website, and social media.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Multiple Visibility Channels</h4>
                      <p className="text-sm text-gray-700">
                        They don't rely on just one touchpoint. They offer a comprehensive visibility package including
                        newsletters, events, website, and social media. T.A.P. can bundle station signage with digital presence.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔧</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Customization Option</h4>
                      <p className="text-sm text-gray-700">
                        They explicitly mention "customizable sponsorship packages," allowing flexibility for larger sponsors.
                        T.A.P. should emphasize this flexibility beyond standard tiers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💚</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Mission-Driven Value</h4>
                      <p className="text-sm text-gray-700">
                        Their page emphasizes supporting environmental education, community engagement, and coastal preservation.
                        T.A.P. should lead with the environmental and community impact story.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">✨</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Event-Based Opportunities</h4>
                      <p className="text-sm text-gray-700">
                        Their annual EcoFest reaches 5,500+ people. T.A.P. can create similar special event sponsorship
                        opportunities (trail cleanups, Earth Day activations, etc.) for additional visibility.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-bold text-teal-900 mb-2">Action Items for T.A.P.:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Calculate and publish your actual reach metrics (station foot traffic, website visitors, social followers)</li>
                <li>• Create a dedicated "Become a Sponsor" page on your website with clear benefits</li>
                <li>• Bundle physical presence (station signage) with digital visibility (newsletter, social, website)</li>
                <li>• Emphasize the mission and community impact, not just logo placement</li>
                <li>• Offer customization for sponsors with unique needs or larger budgets</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Community Partnerships */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-indigo-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Building Credibility Through Community Partnerships</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg border-2 border-indigo-200">
              <h3 className="font-bold text-indigo-900 mb-3 text-lg">
                Why Scheduled Community Programs Matter
              </h3>
              <p className="text-gray-700 mb-4">
                While T.A.P. station usage by individuals and groups is valuable, having regularly scheduled partnerships
                with established community organizations provides concrete, verifiable value that sponsors can count on.
                These partnerships serve as a reliable foundation when communicating your value proposition.
              </p>
            </div>

            <div className="bg-white border-2 border-indigo-200 rounded-lg p-6">
              <h3 className="font-bold text-indigo-900 mb-4">The Power of Predictable Engagement</h3>

              <div className="space-y-4">
                <div className="bg-indigo-50 p-5 rounded-lg">
                  <h4 className="font-bold text-indigo-900 mb-2">Quantifiable vs. Estimated Impact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-orange-400">
                      <p className="text-xs font-bold text-orange-600 uppercase mb-2">Less Reliable</p>
                      <p className="text-sm text-gray-700 mb-2 font-semibold">Estimated Station Usage</p>
                      <p className="text-xs text-gray-600">
                        "Our stations get approximately 5,000 monthly visitors" - This is an estimate that's
                        difficult to verify and may vary significantly.
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-emerald-500">
                      <p className="text-xs font-bold text-emerald-600 uppercase mb-2">More Reliable</p>
                      <p className="text-sm text-gray-700 mb-2 font-semibold">Scheduled Partnership</p>
                      <p className="text-xs text-gray-600">
                        "We partner with Boy Scout Troop 247 (45 members) for monthly trail maintenance events" -
                        This is concrete, verifiable, and guaranteed engagement.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 mb-2">Example Community Partnership Opportunities</h4>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🎯</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">Boy Scouts / Girl Scouts</h5>
                        <p className="text-sm text-gray-700">
                          Monthly service projects for badge requirements. Guaranteed participation of 20-50 youth plus adult leaders.
                          Sponsors get visibility to families committed to community service.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🏫</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">Local Schools</h5>
                        <p className="text-sm text-gray-700">
                          Quarterly environmental education field trips. Partner with 3-4 schools = 200+ students per year
                          experiencing T.A.P. stations directly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🏃</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">Running/Hiking Clubs</h5>
                        <p className="text-sm text-gray-700">
                          "Adopt-a-Trail" programs with weekly runs. A club with 100 members running weekly routes past
                          your sponsored stations = 5,200 annual impressions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">🌱</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">Environmental Nonprofits</h5>
                        <p className="text-sm text-gray-700">
                          Co-host Earth Day cleanups, trail restoration events, or educational workshops. Leverage their
                          existing volunteer base and credibility.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">💼</span>
                      <div>
                        <h5 className="font-bold text-gray-900 text-sm mb-1">Corporate Volunteer Programs</h5>
                        <p className="text-sm text-gray-700">
                          Recurring employee volunteer days with local companies. Offer them T.A.P. station maintenance as
                          a turnkey CSR opportunity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border-2 border-emerald-200">
              <h3 className="font-bold text-emerald-900 mb-4">Benefits for Sponsor Conversations</h3>

              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    Concrete Numbers to Share
                  </h4>
                  <p className="text-sm text-gray-700">
                    Instead of saying "thousands of trail users," you can say "450 Boy Scouts and Girl Scouts participate
                    in our program annually, plus our partnership with 3 local schools reaches 200+ students."
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    Documented Impact with Photos
                  </h4>
                  <p className="text-sm text-gray-700">
                    Scheduled events give you photo opportunities showing sponsor logos alongside community groups in action.
                    Much more powerful than an empty trail photo.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    Third-Party Validation
                  </h4>
                  <p className="text-sm text-gray-700">
                    When the local Scout leader or school principal can vouch for your program, it carries more weight
                    than self-reported metrics.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    Something to Fall Back On
                  </h4>
                  <p className="text-sm text-gray-700">
                    If a sponsor questions your reach estimates, you can pivot to guaranteed engagement: "Even if station
                    usage varies, you're guaranteed visibility to our 50+ monthly Scout volunteers and quarterly school groups."
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="text-emerald-600">✓</span>
                    Activation Opportunities
                  </h4>
                  <p className="text-sm text-gray-700">
                    Sponsors can attend partnership events, provide snacks for volunteers, offer branded gear, or send
                    employee representatives - creating deeper engagement beyond logo placement.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-900 mb-2">Action Steps to Build Community Partnerships:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Identify 3-5 local organizations that align with T.A.P.'s mission (Scouts, schools, hiking clubs, environmental groups)</li>
                <li>• Propose a recurring schedule (monthly or quarterly events) rather than one-off activities</li>
                <li>• Document participation numbers, take photos, and collect testimonials from each event</li>
                <li>• Create a "Community Partners" page on your website showcasing these relationships</li>
                <li>• Include partnership statistics in all sponsor proposals as guaranteed, verifiable reach</li>
                <li>• Offer sponsors the opportunity to activate at partnership events for deeper engagement</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-lg">
              <p className="font-semibold text-center">
                Established community partnerships transform your pitch from "we estimate X users" to "we guarantee
                engagement with Y community members through documented programs." This credibility is invaluable when
                approaching skeptical sponsors.
              </p>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Storytelling with Impact Metrics</h2>
          </div>

          <p className="text-gray-600 mb-6">
            Help sponsors see the ROI by translating their investment into tangible outcomes:
          </p>

          <div className="bg-gradient-to-r from-blue-500 to-teal-600 text-white p-6 rounded-xl mb-6">
            <h3 className="text-xl font-bold mb-4">Example ROI Story for $10,000 Gold Sponsor:</h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-bold mb-1">52,000+</div>
                <p className="text-blue-50">Impressions per year (1,000 weekly path users × 52 weeks)</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-bold mb-1">1 ton</div>
                <p className="text-blue-50">Estimated litter removed from sponsored stations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-bold mb-1">500+</div>
                <p className="text-blue-50">Community members actively engaged</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-3xl font-bold mb-1">$5/person</div>
                <p className="text-blue-50">Cost per community engagement (vs. $50+ traditional CSR)</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-yellow-900 mb-2">Make It Real:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use specific numbers, not ranges</li>
              <li>• Include photos and testimonials when possible</li>
              <li>• Compare to alternative CSR program costs</li>
              <li>• Show year-over-year growth trends</li>
              <li>• Highlight unexpected positive outcomes</li>
            </ul>
          </div>
        </section>

        {/* Package Customization */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-teal-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Creating Custom Packages</h2>

          <div className="space-y-4">
            <div className="bg-teal-50 p-5 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-bold text-teal-900 mb-2">When to Customize:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Company has specific budget constraints</li>
                <li>• They want benefits from multiple tiers</li>
                <li>• They have unique activation ideas</li>
                <li>• Very large potential investment ({'>'} $25K)</li>
                <li>• Multi-year commitment discussions</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-900 mb-2">Customization Ideas:</h3>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Geographic Focus</p>
                  <p className="text-xs text-gray-700">
                    Concentrate stations near their offices/stores
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Themed Campaigns</p>
                  <p className="text-xs text-gray-700">
                    Earth Day, company anniversary, product launches
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Employee Programs</p>
                  <p className="text-xs text-gray-700">
                    Quarterly volunteer days, step challenges
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Content Creation</p>
                  <p className="text-xs text-gray-700">
                    Video testimonials, case studies, social assets
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white">
            <p className="font-semibold">
              💡 Remember: Always start with standard tiers. Only customize after they've shown serious interest
              and you understand their specific needs.
            </p>
          </div>
        </section>

        {/* Design Tips */}
        <section className="bg-white rounded-xl shadow-md p-8 border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Proposal Design Best Practices</h2>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">Visual Elements:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Use high-quality photos of T.A.P. stations in action
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Include infographics for impact statistics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Show logo mockups on stations/materials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">✓</span>
                  Keep text minimal, let visuals tell story
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900">Format Tips:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✓</span>
                  PDF format for easy sharing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✓</span>
                  Single page or 2-page max
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✓</span>
                  Mobile-friendly layout
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">✓</span>
                  Include clickable links to case studies
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Encouragement */}
        <div className="bg-emerald-50 p-6 rounded-lg border-2 border-emerald-200 text-center">
          <p className="text-lg font-semibold text-emerald-900">
            Great proposals show sponsors exactly how their investment creates impact. Focus on their benefits,
            not your needs!
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
