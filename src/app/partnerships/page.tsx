import Link from "next/link";
import { Handshake, Building2, Stethoscope, PenTool, ArrowRight, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default function PartnershipsPage() {
  const t = await getTranslations();
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-200/30 to-blue-200/30 dark:from-brand-500/10 dark:to-blue-500/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-brand-700 dark:text-brand-400 rounded-full px-4 py-2 text-sm font-medium mb-6 shadow-lg">
            <Handshake className="h-4 w-4" />
            Partnership Opportunities
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Partner with MedLens Pro
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            Join us in improving medication safety and literacy across the MENA region. Together, we can make a real difference in patient care.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#pharmacy"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-6 py-3 text-sm font-medium hover:bg-brand-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Building2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Pharmacy Partnerships
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#provider"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Stethoscope className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Healthcare Providers
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Why Partner with MedLens Pro?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We offer flexible partnership models designed to create mutual value and improve patient outcomes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-lg">
                Zero Cost Integration
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Basic API integration and co-branded materials are completely free. We believe in creating value first.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-lg">
                Bilingual Support
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Full Arabic and English support, perfect for serving diverse patient populations across MENA.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-5">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-lg">
                Proven Impact
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our platform has helped thousands of patients understand their medications better and improve adherence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pharmacy Partnerships Section */}
      <section id="pharmacy" className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Pharmacy Partnerships
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Enhance your customer experience with integrated drug information
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
                Partnership Models
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">API Integration</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Integrate our drug lookup API into your mobile app or website
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Co-branded Materials</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Patient education materials with your pharmacy branding
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Affiliate Program</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Revenue sharing on premium features and referrals
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Referral Partnership</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Cross-promotion to our growing user base
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
                Benefits for Your Pharmacy
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Enhanced Customer Experience</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Provide value-added services that differentiate your pharmacy
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Increased Customer Engagement</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Keep customers coming back with useful tools
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Competitive Differentiation</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Stand out with innovative digital patient education
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Potential Revenue Stream</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Generate additional revenue through affiliate partnerships
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-8">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
              Target Markets
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🇸🇦</div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Saudi Arabia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🇦🇪</div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">UAE</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🇪🇬</div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Egypt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🇶🇦</div>
                <div className="text-sm font-medium text-slate-900 dark:text-slate-100">Qatar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Provider Section */}
      <section id="provider" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Healthcare Provider Partnerships
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Empower your practice with patient education tools
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
                Provider Portal Features
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Bulk Drug Lookup</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Search multiple medications at once for efficiency
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Patient-Friendly Summaries</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Generate easy-to-understand medication summaries
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Drug Interaction Checking</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Identify potential interactions between medications
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Export to PDF</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Create printable patient handouts with your branding
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
                Benefits for Your Practice
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Time Savings</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Reduce time spent on patient education by up to 50%
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Improved Adherence</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Help patients understand and follow their medication regimens
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Enhanced Satisfaction</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Patients appreciate clear, bilingual information
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Reduced Errors</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Catch potential drug interactions before they cause harm
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-8">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
              Pricing Tiers
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Basic</h4>
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-4">Free</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Up to 5 providers</li>
                  <li>• Standard features</li>
                  <li>• Email support</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-brand-500">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Professional</h4>
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-4">$99/mo</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Up to 20 providers</li>
                  <li>• Advanced features</li>
                  <li>• Priority support</li>
                  <li>• Custom training</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Enterprise</h4>
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-4">Custom</div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Unlimited providers</li>
                  <li>• All features</li>
                  <li>• Dedicated support</li>
                  <li>• Custom integrations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Partnerships Section */}
      <section id="content" className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <PenTool className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Content Partnerships
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Collaborate on health education content
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
                Partnership Opportunities
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Guest Posting</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Write articles for our blog or vice versa
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Content Exchange</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Swap blog posts and cross-promote
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Co-created Content</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Collaborate on infographics, guides, and videos
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Backlink Building</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Earn high-quality backlinks to improve SEO
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 text-lg">
                Topics We Cover
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Medication Safety</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Drug interactions, side effects, proper usage
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Patient Education</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Understanding labels, adherence tips
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">Health Technology</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Digital health trends, telemedicine, AI in healthcare
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 dark:text-slate-100">MENA Health</strong>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Regional health challenges and solutions
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-brand-600 to-brand-700 dark:from-brand-700 dark:to-brand-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Partner?
            </h2>
            <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can work together to improve medication safety and patient care across the MENA region.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:partnerships@med.medtechai.net"
                className="group inline-flex items-center gap-2 rounded-xl bg-white text-brand-700 px-6 py-3 text-sm font-medium hover:bg-brand-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Email Us
              </a>
              <a
                href="tel:+966500000000"
                className="group inline-flex items-center gap-2 rounded-xl border-2 border-white text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-all"
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Call Us
              </a>
            </div>
            <div className="mt-8 text-sm text-brand-200">
              <p>Or reach out directly:</p>
              <div className="flex items-center justify-center gap-6 mt-2">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  partnerships@med.medtechai.net
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +966 50 000 0000
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Riyadh, Saudi Arabia
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
