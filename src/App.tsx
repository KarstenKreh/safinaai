import { useState, useEffect } from 'react';
import {
  Shield,
  ChevronDown,
  CheckCircle2,
  Bot,
  Menu,
  X,
  FileText,
  MessageCircle,
  Moon,
  Sun,
} from 'lucide-react';
import { Features } from './components/Features';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: '12',
      features: [
        'Safina takes up to 50 calls/month',
        'Personal Safina phone number included',
        'All features of the Safina mobile app',
        'Choose from dozens of different voices',
      ],
    },
    {
      name: 'Professional',
      price: '20',
      features: [
        'Everything included in the Basic plan +',
        'Safina takes up to 100 calls/month',
        'Detailed call summaries and transcripts',
        'Access to audio files of calls',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Request',
      features: [
        'Everything included in the Professional plan +',
        'Safina takes unlimited calls',
        'Access to our API',
        'Custom voice training',        
        'Add multiple Safina numbers',
      ],
    },
  ];

  const faqs = [
    {
      question: 'What is Safina and how does it work?',
      answer: 'Safina is an AI-powered personal phone secretary that manages your calls by answering those you miss or decline. It identifies spam or phishing calls, provides actionable summaries of interactions, and helps you avoid unnecessary interruptions.',
    },
    {
      question: 'How does Safina determine which calls to answer?',
      answer: 'Safina automatically answers a call if you decline it, if it rings more than five times, or if you\'re in Focus Mode, ensuring important calls are managed effectively without bothering you.',
    },
    {
      question: 'How does Safina assess the risk level of calls?',
      answer: 'Safina evaluates calls and categorizes them into Harmless, Suspicious, or Dangerous. This assessment helps you understand the potential risk level of each call based on various indicators.',
    },
    {
      question: 'What type of information does Safina provide in call summaries?',
      answer: 'Safina asks callers for the purpose of their call and provides concise summaries, offering you a clear understanding of the caller\'s intent and the importance of the interaction.',
    },
    {
      question: 'How can I personalize Safina\'s voice and notification settings?',
      answer: 'You can always modify Safina\'s voice and notification preferences by updating your profile settings, allowing you to tailor the experience to your liking.',
    },
    {
      question: 'What are the benefits of upgrading to a higher plan with Safina?',
      answer: 'Upgrading to a higher plan, such as Pro, allows for unlimited calls and access to all mobile app features, providing a comprehensive call management solution suitable for busy professionals.',
    },
    {
      question: 'How does Focus Mode work with Safina?',
      answer: 'In Focus Mode, all calls are seamlessly forwarded to Safina, allowing you to concentrate on your tasks without interruptions while ensuring that no calls are missed.',
    },
    {
      question: 'Can Safina handle international calls?',
      answer: 'Yes, Safina can always handle international calls, regardless of the subscription plan, providing consistent call management globally.',
    },
    {
      question: 'Is it necessary to use the dedicated Safina number?',
      answer: 'Using the dedicated Safina number is optional. Calls made to this number are always received by Safina, ensuring seamless handling and management, enhancing your call experience.',
    },
  ];

  const getDisplayPrice = (price: string | number): [string, string] => {
    if (typeof price === 'string' && price.toLowerCase() === 'request') return ['Request', ''];
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    const formattedPrice = (isAnnualBilling ? numPrice : numPrice / 0.8).toFixed(2);
    const [euros, cents] = formattedPrice.split('.');
    return [euros, cents];
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkTheme(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    // Apply the theme to the body element
    document.body.classList.toggle('dark', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full ${isDarkTheme ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-lg z-50 border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-100'} transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-teal-600" />
              <span className={`ml-2 text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                Safina AI
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
              <a href="#features" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}>
                Features
              </a>
              <a
                href="#how-it-works"
                className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}
              >
                How it Works
              </a>
              <a href="#pricing" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}>
                Pricing
              </a>
              <a href="#faq" className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}>
                FAQ
              </a>
              <button 
                className="bg-teal-600 text-white px-6 py-2 rounded text-base font-medium hover:bg-teal-700 transition-colors"
                onClick={() => {
                  const pricingSection = document.getElementById('pricing');
                  pricingSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Safina
              </button>
              
              {/* Add theme toggle button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${isDarkTheme ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
              >
                {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-100'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 text-lg">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600 text-lg">
                How it Works
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 text-lg">
                Pricing
              </a>
              <a href="#faq" className="block px-3 py-2 text-gray-600 text-lg">
                FAQ
              </a>
              <button className="w-full mt-2 bg-teal-600 text-white px-6 py-3 rounded-full text-lg">
                Get Safina
              </button>
            </div>
            
            {/* Add theme toggle button to mobile menu */}
            <div className="px-3 py-2">
              <button
                onClick={toggleTheme}
                className={`w-full text-left px-3 py-2 ${isDarkTheme ? 'text-white' : 'text-gray-600'}`}
              >
                {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
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
            opacity: 0.3,
            backgroundImage: 'url(/src/Images/Safina-call-agent-hero-background-soundwaves.jpg)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        ></div>

        {/* Ensure content is vertically centered */}
        <div className="relative flex justify-center px-4 min-h-[80vh]">
          <div className="max-w-screen-lg w-full flex flex-col justify-between pt-16 sm:pt-24"> {/* Added padding-top here */}
            <div className="space-y-8 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight font-bold">
                Your personal AI powered
                <span className="text-teal-200"> call assistant</span>
              </h1>

              <p className="text-xl text-white max-w-2xl mx-auto">
                Safina is an intelligent AI assistant designed to manage your
                calls seamlessly by filtering unwanted or unknown callers and
                providing clear call summaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  className="bg-white text-teal-600 px-8 py-3 rounded text-lg font-medium hover:bg-gray-200 transition-colors"
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    pricingSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Safina
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white justify-center mt-8">
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
      </section>

      {/* Metrics Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Safina helps an average user to ...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-lg">... save</p>
              <p className="text-6xl font-bold text-teal-600 my-4">23 min</p>
              <p className="text-lg">of time a month.</p>
            </div>
            <div className="text-center">
              <p className="text-lg">... avoid</p>
              <p className="text-6xl font-bold text-teal-600 my-4">46</p>
              <p className="text-lg">unwanted interruptions a month.</p>
            </div>
            <div className="text-center">
              <p className="text-lg">... summarize calls with</p>
              <p className="text-6xl font-bold text-teal-600 my-4">98 %</p>
              <p className="text-lg">accuracy.</p>
            </div>
            <div className="text-center">
              <p className="text-lg">... intercept</p>
              <p className="text-6xl font-bold text-teal-600 my-4">13</p>
              <p className="text-lg">spam calls a year.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features isDarkTheme={isDarkTheme} />

      {/* How It Works */}
      <section
        id="how-it-works"
        className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '1',
                image: '/src/Images/Safina-AI-App-Mockup-01.jpg',
                title: "Choose Safina's voice",
                description:
                  'Select the voice that best matches your style and needs to ensure a personalized call management experience.',
              },
              {
                number: '2',
                image: '/src/Images/Safina-AI-App-Mockup-02.jpg',
                title: 'Receive a test call',
                description:
                  'Experience firsthand how Safina handles callers by going through a test call scenario with yourself.',
              },
              {
                number: '3',
                image: '/src/Images/Safina-AI-App-Mockup-03.jpg',
                title: 'Get your new Safina number',
                description:
                  'Receive a dedicated Safina number that will serve as your smart call management hub.',
              },
              {
                number: '4',
                image: '/src/Images/Safina-AI-App-Mockup-04.jpg',
                title: 'Choose notification options',
                description:
                  'Customize how you receive notifications about calls and interactions, aligning with your preferences.',
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mx-auto mb-6 text-3xl font-bold">
                  {step.number}
                </div>
                <img src={step.image} alt={`Step ${step.number}`} className="w-full h-48 object-cover rounded-lg mb-6" />
                <h3 className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mb-4`}>
                  {step.title}
                </h3>
                <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Features Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-16 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Discover What Sets Safina Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Comprehensive Call Reports */}
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Comprehensive Call Reports</h3>
                <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  Receive detailed reports with conversation summaries, actionable insights, sentiment assessments, and for Professional Plan users, access to caller details, transcripts, and audio. Stay informed and manage communications effectively.
                </p>
              </div>
            </div>

            {/* Card 2: Seamless Multi-Device Access */}
            <div className={`md:col-span-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <div className="h-48 md:h-full bg-gray-300"></div>
                </div>
                <div className="md:w-1/2 p-6">
                  <h3 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Seamless Multi-Device Access</h3>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Manage your calls effortlessly across devices—browser, iOS, or Android. Enjoy consistent, convenient access to your call tools anywhere, ensuring you're always connected and in control.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Intuitive Dashboard Design */}
            <div className={`md:col-span-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="md:flex">
                <div className="md:w-1/2 p-6">
                  <h3 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Intuitive Dashboard Design</h3>
                  <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                    Navigate a sleek dashboard for a quick overview of all calls. Access sentiment assessments easily, prioritize interactions, and maintain effective communication at a glance.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="h-48 md:h-full bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Card 4: Personalized Interaction and Notifications */}
            <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Personalized Interaction and Notifications</h3>
                <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  Customize Safina's voice and tone—polite or witty—plus set unique call excuses. Choose email or push notifications for call summaries, aligning with your personal workflow preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Choose a plan that works for you
            </h2>
            <div className="mt-6 flex items-center justify-center">
              <span className={`mr-3 ${isAnnualBilling 
                ? (isDarkTheme ? 'text-gray-400' : 'text-gray-500') 
                : (isDarkTheme ? 'text-white' : 'text-gray-900')}`}>
                Billed Monthly
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isAnnualBilling}
                  onChange={() => setIsAnnualBilling(!isAnnualBilling)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
              </label>
              <span className={`ml-3 ${isAnnualBilling 
                ? (isDarkTheme ? 'text-white' : 'text-gray-900') 
                : (isDarkTheme ? 'text-gray-400' : 'text-gray-500')}`}>
                Billed annually
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-8 ${
                  plan.popular ? 'ring-2 ring-teal-600' : ''
                }`}
              >
                {plan.popular && (
                  <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mt-4`}>
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  {plan.price !== 'Request' ? (
                    <>
                      <span className="text-4xl font-bold">{getDisplayPrice(plan.price)[0]}</span>
                      <span className="text-xl">.{getDisplayPrice(plan.price)[1]}</span>
                      <span className="ml-1 text-2xl">€</span>
                      <span className="ml-1 text-gray-500 text-lg">/month</span>
                    </>
                  ) : (
                    <button
                      onClick={() => window.location.href = 'mailto:support@safinaai.com'}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-lg font-medium hover:bg-gray-400 transition-colors"
                    >
                      Request
                    </button>
                  )}
                </div>
                {isAnnualBilling && plan.price !== 'On request' && (
                  <p className="text-sm text-green-600 mt-2">
                    Save 20% with annual billing
                  </p>
                )}
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span 
                        className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-base`}
                        dangerouslySetInnerHTML={{ __html: feature }}
                      ></span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* New primary button */}
          <div className="mt-12 text-center">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors">
              Get Safina
            </button>
          </div>
          
          {/* Availability and App Store Badges */}
          <div className="mt-16 text-center">
            <h3 className={`text-2xl font-bold mb-8 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Safina is Available for iOS, Android, and in your web browser
            </h3>
            <div className="flex justify-center space-x-4">
              <a href="https://apps.apple.com/your-app-link" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/src/Images/Badge-Safina-App-appstore.svg" 
                  alt="Download on the App Store" 
                  className="h-12"
                />
              </a>
              <a href="https://play.google.com/store/apps/your-app-link" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/src/Images/Badge-Safina-App-googleplay.svg" 
                  alt="Get it on Google Play" 
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow`}>
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <span className={`font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'} text-lg`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} transform transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className={`px-6 pb-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-base`}>{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Call Experience?
          </h2>
          <p className="text-xl mb-8 text-teal-100 max-w-2xl mx-auto">
            Join thousands of users who trust Safina to manage their calls
            intelligently
          </p>
          <button className="bg-white text-teal-600 px-8 py-3 rounded text-lg font-medium hover:bg-teal-50 transition-colors">
            Get Safina
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-400'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center text-white mb-4">
              <Bot className="h-6 w-6 mr-2" />
              <span className="font-bold">Safina AI</span>
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
          {new Date().getFullYear()} Safina AI. Fuck copyrights. Do whatever you want with it.
        </div>
      </footer>
    </div>
  );
}

export default App;
