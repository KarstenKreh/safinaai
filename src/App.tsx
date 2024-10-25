import React, { useState } from 'react';
import {
  Phone,
  Shield,
  Brain,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  Bot,
  Menu,
  X,
  PhoneOff,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { Features } from './components/Features';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Free Trial',
      price: '0',
      features: [
        '14-day trial',
        'Basic call screening',
        '5 AI conversations/month',
        'Text summaries',
      ],
      cta: 'See plans',
    },
    {
      name: 'Pro',
      price: '19',
      features: [
        'Unlimited call screening',
        'Unlimited AI conversations',
        'Priority support',
        'Custom greetings',
      ],
      cta: 'Get Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Custom integration',
        'Advanced analytics',
        'Dedicated support',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
    },
  ];

  const faqs = [
    {
      question: 'How accurate is the AI in screening calls?',
      answer:
        'SafinaAI achieves 99.9% accuracy in identifying spam calls through advanced machine learning algorithms trained on millions of call patterns.',
    },
    {
      question: 'Can I customize how the AI responds to callers?',
      answer:
        'Yes! You can set custom greetings, conversation styles, and response preferences to match your personal or business needs.',
    },
    {
      question: 'What happens to my voicemail data?',
      answer:
        'All voicemail data is encrypted end-to-end and stored securely. We never share or sell your data to third parties.',
    },
    {
      question: 'Does it work with my current phone system?',
      answer:
        'SafinaAI integrates seamlessly with most major carriers and VoIP systems. Check our compatibility list for specific details.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                SafinaAI
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900"
              >
                How it Works
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">
                FAQ
              </a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600">
                How it Works
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600">
                Pricing
              </a>
              <a href="#faq" className="block px-3 py-2 text-gray-600">
                FAQ
              </a>
              <button className="w-full mt-2 bg-blue-600 text-white px-6 py-2 rounded-full">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: 'url(/src/Images/Safina-call-agent-hero-background-soundwaves.jpg)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70 pointer-events-none"></div>
        <div
          className="absolute inset-0"
          style={{
            mixBlendMode: 'screen',
            opacity: 0.6,
            backgroundImage: 'url(/src/Images/Safina-call-agent-hero-background-soundwaves.jpg)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        ></div>

        {/* Ensure content is vertically centered */}
        <div className="relative flex justify-center px-4 min-h-screen">
          <div className="max-w-screen-lg w-full flex flex-col gap-12 items-center">
            <div className="space-y-8 text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white leading-snug font-semibold">
                Your personal AI powered
                <span className="text-blue-200"> call secretary</span>
              </h1>

              <p className="text-xl text-white">
                Safina is an intelligent AI assistant designed to manage your
                calls seamlessly by filtering unwanted or unknown callers and
                providing clear call summaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition-colors">
                  See plans
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white justify-center">
                <div className="flex items-center bg-white/[.15] p-2 rounded-xl">
                  <MessageCircle className="w-5 h-5 text-white mr-2" />
                  <span className="text-m">Natural Conversations</span>
                </div>
                <div className="flex items-center bg-white/[.15] p-2 rounded-xl">
                  <FileText className="w-5 h-5 text-white mr-2" />
                  <span className="text-m">Actionable Summaries</span>
                </div>
                <div className="flex items-center bg-white/[.15] p-2 rounded-xl">
                  <Shield className="w-5 h-5 text-white mr-2" />
                  <span className="text-m">Intercepting spam calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">(Think of a subheader)</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '1',
                title: "Choose Safina's voice",
                description:
                  'Select the voice that best matches your style and needs to ensure a personalized call management experience.',
              },
              {
                number: '2',
                title: 'Receive a test call',
                description:
                  'Experience firsthand how Safina handles callers by going through a test call scenario with yourself.',
              },
              {
                number: '3',
                title: 'Get your new Safina number',
                description:
                  'Receive a dedicated Safina number that will serve as your smart call management hub.',
              },
              {
                number: '4',
                title: 'Choose notification options',
                description:
                  'Customize how you receive notifications about calls and interactions, aligning with your preferences.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6 text-3xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that works best for you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular ? 'ring-2 ring-blue-600' : ''
                }`}
              >
                {plan.popular && (
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mt-4">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="ml-1 text-gray-500">/month</span>
                  )}
                </div>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full mt-8 px-6 py-3 rounded-full font-medium ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Call Experience?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust SafinaAI to manage their calls
            intelligently
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-white mb-4">
              <Bot className="h-6 w-6 mr-2" />
              <span className="font-bold">SafinaAI</span>
            </div>
            <p className="text-sm">Intelligent call management powered by AI</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} SafinaAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
