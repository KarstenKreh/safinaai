import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { Shield, ChevronDown, CheckCircle2, Bot, Menu, X, FileText, MessageCircle, Moon, Sun } from 'lucide-react';
import { Features } from './components/Features';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import Imprint from './components/Imprint';
import Footer from './components/Footer';
import { Metric } from './components/Metric';
// Image imports
import heroBackground from './assets/images/Safina-call-agent-hero-background-soundwaves.jpg';
import mockup01 from './assets/images/Safina-AI-App-Mockup-01.jpg';
import mockup02 from './assets/images/Safina-AI-App-Mockup-02.jpg';
import mockup03 from './assets/images/Safina-AI-App-Mockup-03.jpg';
import mockup04 from './assets/images/Safina-AI-App-Mockup-04.jpg';
import appStoreBadge from './assets/images/Badge-Safina-App-appstore.svg';
import playStoreBadge from './assets/images/Badge-Safina-App-googleplay.svg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const plans = [
    {
      name: 'Mini',
      price: '20',
      features: [
        'Safina takes calls up to 30 min',
        'Dedicated personal Safina phone number',
        'Available 24/7 with natural, human-like conversations',
        'Built-in spam protection and call screening',
        'Smart summaries of each call',
        'Full access to all features of the Safina app',
        'Choose from dozens of different voices',
      ],
    },
    {
      name: 'Basic',
      price: '30',
      features: [
        'Everything included in "Mini" +',
        'Safina takes calls up to 50 min',
        'Custom call-handling preferences tailored to your needs',
        'Comprehensive call summaries and full transcripts',
        'Access to downloadable audio recordings of each call',
      ],
      popular: true,
    },
    {
      name: 'Professional',
      price: '50',
      features: [
        'Everything included in "Basic" +',
        'Safina takes calls up to 100 min',
      ],
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
    {
      question: 'Is it possible to temporarily disable Safina without cancelling the service?',
      answer: 'Of course this is possible. To disable forwarding to Safina, simply call #400#.',
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full ${isDarkTheme ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-lg z-50 border-b ${isDarkTheme ? 'border-gray-700' : 'border-gray-100'} transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <Bot className="h-8 w-8 text-teal-600" />
                <span className={`ml-2 text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                  Safina AI
                </span>
              </Link>
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
              <button 
                onClick={() => scrollToSection('features')} 
                className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className={`${isDarkTheme ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-base`}
              >
                FAQ
              </button>
              <button 
                className="bg-teal-600 text-white px-6 py-2 rounded text-base font-medium hover:bg-teal-700 transition-colors"
                onClick={() => scrollToSection('pricing')}
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
              <button 
                onClick={() => {
                  scrollToSection('features');
                  setIsMenuOpen(false);
                }} 
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  scrollToSection('how-it-works');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                How it Works
              </button>
              <button 
                onClick={() => {
                  scrollToSection('pricing');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                Pricing
              </button>
              <button 
                onClick={() => {
                  scrollToSection('faq');
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                FAQ
              </button>
              <button 
                onClick={() => {
                  scrollToSection('pricing');
                  setIsMenuOpen(false);
                }}
                className="w-full mt-2 bg-teal-600 text-white px-6 py-3 rounded-full text-lg"
              >
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

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section
              className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
              style={{
                backgroundImage: `url(${heroBackground})`,
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
                  backgroundImage: `url(${heroBackground})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                }}
              ></div>

              {/* Ensure content is vertically centered */}
              <div className="relative flex justify-center px-4 min-h-[80vh]">
                <div className="max-w-screen-lg w-full flex flex-col justify-between pt-16 sm:pt-24"> {/* Added padding-top here */}
                  <div className="space-y-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight font-bold">
                      <span className="text-teal-200"> Safina AI </span>
                      is your personal AI powered phone assistant
                    </h1>

                    <p className="text-xl text-white max-w-2xl mx-auto">
                    Never miss an important call again. Safina answers, converses naturally, and delivers clear actionable summaries straight to you.
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
              <div className="max-w-7xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Safina helps an average user to ...
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                  <Metric 
                    number={34} 
                    prefix="... save"
                    suffix="min of time a month."
                  />
                  <Metric 
                    number={46}
                    prefix="... avoid"
                    suffix="unwanted interruptions a month."
                  />
                  <Metric 
                    number={11}
                    prefix="... intercept"
                    suffix="spam calls a year."
                  />
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
                      image: mockup01,
                      title: "Configure Safina",
                      description:
                        'Choose a voice that matches your style, ensuring every call sounds professional.',
                    },
                    {
                      number: '2',
                      image: mockup02,
                      title: 'Test call',
                      description:
                        'Experience firsthand how Safina handles callers by going through a test call scenario.',
                    },
                    {
                      number: '3',
                      image: mockup03,
                      title: 'Set forwarding',
                      description:
                        'Forwarding to Safina is set up with just one call to a dedicated number.',
                    },
                    {
                      number: '4',
                      image: mockup04,
                      title: 'Notifications',
                      description:
                        'Customize when to receive notifications about calls, aligning with your preferences.',
                    },
                  ].map((step, index) => (
                    <div key={index} className="text-center">
                      <div className="aspect-square w-full mb-6 relative">
                        <img 
                          src={step.image} 
                          alt={`Step ${step.number}`} 
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mx-auto mb-6 text-2xl font-bold">
                        {step.number}
                      </div>
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
                    <div className="p-6">
                      <img 
                        src="/src/Images/Intuitive Dashboard Design.png"
                        alt="Intuitive Dashboard Design"
                        className="w-full h-auto drop-shadow-lg"
                      />
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Intuitive Dashboard Design</h3>
                      <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                        Easily navigate a sleek dashboard for quick call overviews, sentiment assessments, and interaction prioritization.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Seamless Multi-Device Access */}
                  <div className={`md:col-span-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                    <div className="md:flex h-full">
                      <div className="md:w-1/2 pr-6 pb-6">
                        <img 
                          src="/src/Images/Seamless Multi-Device Access.png"
                          alt="Seamless Multi-Device Access"
                          className="w-full h-auto drop-shadow-lg"
                        />
                      </div>
                      <div className="md:w-1/2 p-6 flex flex-col justify-center">
                        <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Seamless Multi-Device Access</h3>
                        <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                          Manage calls effortlessly across devices—browser, iOS, or Android—for consistent, convenient access wherever you are.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Comprehensive Call Reports */}
                  <div className={`md:col-span-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-visible`}>
                    <div className="md:flex h-full">
                      <div className="md:w-1/2 p-6 flex flex-col justify-center">
                        <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Comprehensive Call Reports</h3>
                        <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                          Get detailed reports with conversation summaries, insights, sentiment assessments, access to caller details, transcripts, and audio.
                        </p>
                      </div>
                      <div className="md:w-1/2 p-6 flex items-center">
                        <img 
                          src="/src/Images/Snipped Comprehensive Call Reports.png" 
                          alt="Comprehensive Call Reports"
                          className="w-full h-auto drop-shadow-lg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Personalized Interaction and Notifications */}
                  <div className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
                    <div className="p-6">
                      <img 
                        src="/src/Images/Snipped Personalized Interaction and Notifications.png" 
                        alt="Personalized Interaction and Notifications"
                        className="w-full h-auto drop-shadow-lg"
                      />
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Personalized Interaction and Notifications</h3>
                      <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                        Customize Safina's voice and tone, set unique call excuses, and choose email or push notifications for call summaries to suit your workflow preferences.
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {plans.map((plan, index) => (
                    <div
                      key={index}
                      className={`${isDarkTheme ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 ${
                        plan.popular ? 'ring-2 ring-teal-600' : ''
                      }`}
                    >
                      {plan.popular && (
                        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      )}
                      <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mt-4`}>
                        {plan.name}
                      </h3>
                      <div className="mt-4 flex items-baseline">
                        {plan.price !== 'Request' ? (
                          <>
                            <span className="text-3xl font-bold">{getDisplayPrice(plan.price)[0]}</span>
                            <span className="text-lg">.{getDisplayPrice(plan.price)[1]}</span>
                            <span className="ml-1 text-xl">€</span>
                            <span className="ml-1 text-gray-500 text-base">/month</span>
                          </>
                        ) : (
                          <button
                            onClick={() => window.location.href = 'mailto:support@safinaai.com'}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-400 transition-colors"
                          >
                            Request
                          </button>
                        )}
                      </div>
                      {isAnnualBilling && plan.price !== 'Request' && (
                        <p className="text-sm text-green-600 mt-2">
                          Save 20% with annual billing
                        </p>
                      )}
                      <ul className="mt-6 space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                            <span 
                              className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm`}
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
                        src={appStoreBadge} 
                        alt="Download on the App Store" 
                        className="h-12"
                      />
                    </a>
                    <a href="https://play.google.com/store/apps/your-app-link" target="_blank" rel="noopener noreferrer">
                      <img 
                        src={playStoreBadge} 
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
          </>
        } />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/imprint" element={<Imprint />} />
      </Routes>

      <Footer isDarkTheme={isDarkTheme} />
    </div>
  );
}

export default App;
