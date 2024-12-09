import { useState, useEffect, useRef } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import {
  Shield,
  ChevronDown,
  CheckCircle2,
  Menu,
  X,
  FileText,
  MessageCircle,
  Moon,
  Sun,
  PhoneCall,
} from "lucide-react";
import { Features } from "./components/Features";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfUse from "./components/TermsOfUse";
import Imprint from "./components/Imprint";
import Footer from "./components/Footer";
import { Metric } from "./components/Metric";
import { Player } from "@lottiefiles/react-lottie-player";
import { useInView } from "./hooks/useInView";
import { ContactForm } from "./components/ContactForm";
// Image imports
import mockup01 from "./assets/images/Safina-AI-App-Mockup-01.jpg";
import mockup02 from "./assets/images/Safina-AI-App-Mockup-02.jpg";
import mockup03 from "./assets/images/Safina-AI-App-Mockup-03.jpg";
import mockup04 from "./assets/images/Safina-AI-App-Mockup-04.jpg";
import intuitiveDashboard from "./assets/images/Intuitive-Dashboard-Design.png";
import seamlessAccess from "./assets/images/Seamless-Multi-Device-Access.png";
import callReports from "./assets/images/Snipped-Comprehensive-Call-Reports.png";
import personalizedInteraction from "./assets/images/Snipped-Personalized-Interaction-and-Notifications.png";
import waveAnimationHero from "./assets/lottie/wave-animation-hero.json";
import logoLight from "./assets/images/Logo-safina-ai-on-light.svg";
import logoDark from "./assets/images/Logo-safina-ai-on-dark.svg";
import appStoreBadgeDesktop from "./assets/images/Badge-Safina-App-appstore-desktop.svg";
import appStoreBadgePhone from "./assets/images/Badge-Safina-App-appstore-phone.svg";
import playStoreBadgeDesktop from "./assets/images/Badge-Safina-App-googleplay-desktop.svg";
import playStoreBadgePhone from "./assets/images/Badge-Safina-App-googleplay-phone.svg";
import posthog from "./utils/posthog";
import { CookieBanner } from "./components/CookieBanner";
import NotFound from "./components/NotFound";
import transformCallExperience from "./assets/images/safina-ai-ready-to-transform-your-call-experience.png";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import ukFlag from "./assets/images/uk-flag.svg";
import deFlag from "./assets/images/de-flag.svg";

function App() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isAnnualBilling, setIsAnnualBilling] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const location = useLocation();
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    navigator.language.split("-")[0]
  );
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const plans = [
    {
      name: t("pricing.plans.personal.name"),
      price: "4.99",
      features: t("pricing.plans.personal.features", { returnObjects: true }),
    },
    {
      name: t("pricing.plans.professional.name"),
      price: "9.99",
      features: t("pricing.plans.professional.features", {
        returnObjects: true,
      }),
      popular: true,
    },
    {
      name: t("pricing.plans.enterprise.name"),
      price: t("pricing.requestButton"),
      features: t("pricing.plans.enterprise.features", { returnObjects: true }),
    },
  ];

  const faqs = [
    {
      question: t("faq.questions.whatIsSafina.question"),
      answer: t("faq.questions.whatIsSafina.answer"),
    },
    {
      question: t("faq.questions.howDoesItAnswer.question"),
      answer: t("faq.questions.howDoesItAnswer.answer"),
    },
    {
      question: t("faq.questions.riskAssessment.question"),
      answer: t("faq.questions.riskAssessment.answer"),
    },
    {
      question: t("faq.questions.callSummaries.question"),
      answer: t("faq.questions.callSummaries.answer"),
    },
    {
      question: t("faq.questions.personalization.question"),
      answer: t("faq.questions.personalization.answer"),
    },
    {
      question: t("faq.questions.upgradeBenefits.question"),
      answer: t("faq.questions.upgradeBenefits.answer"),
    },
    {
      question: t("faq.questions.focusMode.question"),
      answer: t("faq.questions.focusMode.answer"),
    },
    {
      question: t("faq.questions.internationalCalls.question"),
      answer: t("faq.questions.internationalCalls.answer"),
    },
    {
      question: t("faq.questions.dedicatedNumber.question"),
      answer: t("faq.questions.dedicatedNumber.answer"),
    },
    {
      question: t("faq.questions.temporaryDisable.question"),
      answer: t("faq.questions.temporaryDisable.answer"),
    },
  ];

  const getDisplayPrice = (price: string | number): [string, string] => {
    if (typeof price === "string" && price.toLowerCase() === "request")
      return ["Request", ""];
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    const formattedPrice = (
      isAnnualBilling ? numPrice : numPrice / 0.8
    ).toFixed(2);
    const [euros, cents] = formattedPrice.split(".");
    return [euros, cents];
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDarkTheme(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    // Apply the theme to the body element
    document.body.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [ref1, isInView1] = useInView({ threshold: 0.1 });
  const [ref2, isInView2] = useInView({ threshold: 0.1 });
  const [ref3, isInView3] = useInView({ threshold: 0.1 });
  const ref4 = useRef<HTMLDivElement | null>(null);
  const [isInView4] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (import.meta.env.PROD) {
      posthog.capture("$pageview");
    }
  }, [location]);

  const handlePricingClick = (planName: string) => {
    if (import.meta.env.PROD) {
      posthog.capture("pricing_plan_clicked", {
        plan: planName,
        billing: isAnnualBilling ? "annual" : "monthly",
      });
    }
    // ... rest of your click handling code
  };

  useEffect(() => {
    // Set initial language based on browser language
    const browserLang = navigator.language.split("-")[0];
    const supportedLanguages = ["en", "de"];
    const defaultLang = supportedLanguages.includes(browserLang)
      ? browserLang
      : "en";

    i18next.changeLanguage(defaultLang);
    setCurrentLanguage(defaultLang);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkTheme ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full ${
          isDarkTheme ? "bg-gray-900/80" : "bg-white/80"
        } backdrop-blur-lg z-50 border-b ${
          isDarkTheme ? "border-gray-700" : "border-gray-100"
        } transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center"
                onClick={(e) => {
                  if (window.location.pathname === "/") {
                    // If we're on homepage, prevent default and scroll to top
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  // If we're on another page, let the Link component handle navigation to home
                }}
              >
                <img
                  src={isDarkTheme ? logoDark : logoLight}
                  alt="Safina AI Logo"
                  className="h-6 w-auto"
                />
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
                onClick={() => scrollToSection("features")}
                className={`${
                  isDarkTheme
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } text-base`}
              >
                {t("common.features")}
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className={`${
                  isDarkTheme
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } text-base`}
              >
                {t("common.howItWorks")}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className={`${
                  isDarkTheme
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } text-base`}
              >
                {t("common.pricing")}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className={`${
                  isDarkTheme
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } text-base`}
              >
                {t("common.faq")}
              </button>
              <button
                className="bg-teal-600 text-white px-6 py-2 rounded text-base font-medium hover:bg-teal-700 transition-colors"
                onClick={() => scrollToSection("pricing")}
              >
                {t("cta.button")}
              </button>

              {/* Desktop Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                  }
                  className={`flex items-center space-x-2 px-3 py-1 rounded-md ${
                    isDarkTheme
                      ? "bg-gray-800 text-gray-300 hover:text-white"
                      : "bg-gray-200 text-gray-700 hover:text-gray-900"
                  }`}
                >
                  <img
                    src={currentLanguage === "en" ? ukFlag : deFlag}
                    alt={currentLanguage === "en" ? "English" : "Deutsch"}
                    className="w-5 h-5 rounded-sm"
                  />
                  <span>{currentLanguage.toUpperCase()}</span>
                  <ChevronDown
                    className={`w-4 h-4 transform transition-transform ${
                      isLanguageDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isLanguageDropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                      isDarkTheme ? "bg-gray-800" : "bg-white"
                    } ring-1 ring-black ring-opacity-5 z-50`}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          i18next.changeLanguage("en");
                          setCurrentLanguage("en");
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`flex items-center space-x-3 px-4 py-2 w-full text-left ${
                          isDarkTheme
                            ? "hover:bg-gray-700 text-gray-300"
                            : "hover:bg-gray-100 text-gray-700"
                        } ${
                          currentLanguage === "en"
                            ? "bg-teal-50 text-teal-600"
                            : ""
                        }`}
                      >
                        <img
                          src={ukFlag}
                          alt="English"
                          className="w-5 h-5 rounded-sm"
                        />
                        <span>English</span>
                      </button>
                      <button
                        onClick={() => {
                          i18next.changeLanguage("de");
                          setCurrentLanguage("de");
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`flex items-center space-x-3 px-4 py-2 w-full text-left ${
                          isDarkTheme
                            ? "hover:bg-gray-700 text-gray-300"
                            : "hover:bg-gray-100 text-gray-700"
                        } ${
                          currentLanguage === "de"
                            ? "bg-teal-50 text-teal-600"
                            : ""
                        }`}
                      >
                        <img
                          src={deFlag}
                          alt="Deutsch"
                          className="w-5 h-5 rounded-sm"
                        />
                        <span>Deutsch</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Existing theme toggle button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${
                  isDarkTheme
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {isDarkTheme ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden ${
              isDarkTheme ? "bg-gray-900" : "bg-white"
            } border-b ${isDarkTheme ? "border-gray-700" : "border-gray-100"}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  scrollToSection("features");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                {t("mobileMenu.features")}
              </button>
              <button
                onClick={() => {
                  scrollToSection("how-it-works");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                {t("mobileMenu.howItWorks")}
              </button>
              <button
                onClick={() => {
                  scrollToSection("pricing");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                {t("mobileMenu.pricing")}
              </button>
              <button
                onClick={() => {
                  scrollToSection("faq");
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 text-gray-600 text-lg w-full text-left"
              >
                {t("mobileMenu.faq")}
              </button>
              <button
                onClick={() => {
                  scrollToSection("pricing");
                  setIsMenuOpen(false);
                }}
                className="w-full mt-2 bg-teal-600 text-white px-6 py-3 rounded-full text-lg"
              >
                {t("mobileMenu.getSafina")}
              </button>

              {/* Mobile Language Selector */}
              <div className="px-2 pt-2 pb-3">
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      i18next.changeLanguage("en");
                      setCurrentLanguage("en");
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md ${
                      currentLanguage === "en"
                        ? "bg-teal-50 text-teal-600"
                        : isDarkTheme
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={ukFlag}
                      alt="English"
                      className="w-5 h-5 rounded-sm"
                    />
                    <span>English</span>
                  </button>
                  <button
                    onClick={() => {
                      i18next.changeLanguage("de");
                      setCurrentLanguage("de");
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md ${
                      currentLanguage === "de"
                        ? "bg-teal-50 text-teal-600"
                        : isDarkTheme
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={deFlag}
                      alt="Deutsch"
                      className="w-5 h-5 rounded-sm"
                    />
                    <span>Deutsch</span>
                  </button>
                </div>
              </div>

              {/* Existing theme toggle */}
              <button
                onClick={toggleTheme}
                className={`w-full text-left px-3 py-2 ${
                  isDarkTheme ? "text-white" : "text-gray-600"
                }`}
              >
                {isDarkTheme
                  ? t("mobileMenu.lightMode")
                  : t("mobileMenu.darkMode")}
              </button>
            </div>
          </div>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <h1 className="sr-only">{t("common.title")}</h1>
                {/* Hero section */}
                <section aria-labelledby="hero-heading">
                  <h2 id="hero-heading" className="text-4xl">
                    ...
                  </h2>
                </section>
              </main>

              {/* Hero 2 Section */}
              <section className="relative h-screen overflow-hidden">
                <div className="absolute inset-0">
                  <Player
                    autoplay
                    loop
                    src={waveAnimationHero}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      objectFit: "cover",
                      transform: "scale(1.5)",
                    }}
                    rendererSettings={{
                      preserveAspectRatio: "xMidYMid slice",
                      clearCanvas: true,
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black opacity-70 pointer-events-none"></div>
                <div className="relative flex justify-center items-center h-full">
                  <div className="max-w-screen-lg w-full flex flex-col justify-between pt-16 sm:pt-24 px-4">
                    <div className="space-y-8 text-center">
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white leading-loose font-bold px-4">
                        {t("hero.title")}
                        <br />
                        <span className="text-teal-200 leading-loose">
                          {" "}
                          {t("hero.aiPowered")}{" "}
                        </span>
                        <br />
                        {t("hero.voiceMailAssistant")}
                      </h1>
                      <p className="text-xl text-white max-w-2xl mx-auto px-4">
                        {t("hero.subtitle")}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                          href="tel:+498962828095"
                          className="border-2 border-white text-white px-8 py-3 rounded text-lg font-medium hover:bg-white/10 transition-colors"
                        >
                          {t("hero.callSafina")}
                        </a>
                        <button
                          className="bg-white text-teal-600 px-8 py-3 rounded text-lg font-medium hover:bg-gray-200 transition-colors"
                          onClick={() => {
                            const pricingSection =
                              document.getElementById("pricing");
                            pricingSection?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }}
                        >
                          {t("cta.button")}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-white justify-center mt-8">
                      <div className="flex items-center bg-white/[.15] p-2 rounded-xl">
                        <MessageCircle className="w-5 h-5 text-white mr-2" />
                        <span className="text-m">
                          {t("hero.features.naturalConversations")}
                        </span>
                      </div>
                      <div className="flex items-center bg-white/[.15] p-2 rounded-xl">
                        <FileText className="w-5 h-5 text-white mr-2" />
                        <span className="text-m">
                          {t("hero.features.actionableSummaries")}
                        </span>
                      </div>
                      <div className="flex items-center bg-white/[.15] p-2 rounded-xl">
                        <Shield className="w-5 h-5 text-white mr-2" />
                        <span className="text-m">
                          {t("hero.features.spamProtection")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Metrics Section */}
              <section
                className={`py-16 px-4 sm:px-6 lg:px-8 ${
                  isDarkTheme ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
                    {t("metrics.title")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <Metric
                      number={34}
                      prefix={t("metrics.save")}
                      suffix={t("metrics.minutes")}
                    />
                    <Metric
                      number={46}
                      prefix={t("metrics.avoid")}
                      suffix={t("metrics.interruptions")}
                    />
                    <Metric
                      number={11}
                      prefix={t("metrics.intercept")}
                      suffix={t("metrics.spam")}
                    />
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <Features isDarkTheme={isDarkTheme} />

              {/* How It Works */}
              <section
                id="how-it-works"
                className={`py-20 px-4 sm:px-6 lg:px-8 ${
                  isDarkTheme ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <h2
                      className={`text-3xl sm:text-4xl font-bold ${
                        isDarkTheme ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("howItWorks.title")}
                    </h2>
                  </div>
                  <div className="grid md:grid-cols-4 gap-8">
                    {[
                      {
                        number: "1",
                        image: mockup01,
                        title: t("howItWorks.steps.configure.title"),
                        description: t(
                          "howItWorks.steps.configure.description"
                        ),
                      },
                      {
                        number: "2",
                        image: mockup02,
                        title: t("howItWorks.steps.test.title"),
                        description: t("howItWorks.steps.test.description"),
                      },
                      {
                        number: "3",
                        image: mockup03,
                        title: t("howItWorks.steps.forwarding.title"),
                        description: t(
                          "howItWorks.steps.forwarding.description"
                        ),
                      },
                      {
                        number: "4",
                        image: mockup04,
                        title: t("howItWorks.steps.notifications.title"),
                        description: t(
                          "howItWorks.steps.notifications.description"
                        ),
                      },
                    ].map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="aspect-square w-full mb-6 relative">
                          <img
                            src={step.image}
                            alt={`Step ${step.number}`}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-0 animate-fade-in"
                            loading="lazy"
                          />
                        </div>
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mx-auto mb-6 text-2xl font-bold">
                          {step.number}
                        </div>
                        <h3
                          className={`text-xl font-semibold ${
                            isDarkTheme ? "text-white" : "text-gray-900"
                          } mb-4`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={
                            isDarkTheme ? "text-gray-300" : "text-gray-600"
                          }
                        >
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* New Features Section */}
              <section
                className={`py-20 px-4 sm:px-6 lg:px-8 ${
                  isDarkTheme ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="max-w-7xl mx-auto">
                  <h2
                    className={`text-3xl sm:text-4xl font-bold text-center mb-16 ${
                      isDarkTheme ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {t("features.discover.title")}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1: Personalized Interaction and Notifications */}
                    <div
                      ref={ref4}
                      className={`fade-in-up ${isInView4 ? "visible" : ""} ${
                        isDarkTheme ? "bg-gray-700" : "bg-white"
                      } rounded-lg shadow-lg overflow-hidden`}
                    >
                      <div className="p-6">
                        <img
                          src={personalizedInteraction}
                          alt={t(
                            "features.discover.personalizedInteraction.title"
                          )}
                          className="w-full h-auto drop-shadow-lg"
                        />
                      </div>
                      <div className="p-6 pt-0">
                        <h3
                          className={`text-2xl font-semibold mb-4 ${
                            isDarkTheme ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {t("features.discover.personalizedInteraction.title")}
                        </h3>
                        <p
                          className={`${
                            isDarkTheme ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {t(
                            "features.discover.personalizedInteraction.description"
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Card 2: Comprehensive Call Reports */}
                    <div
                      ref={ref3 as React.RefObject<HTMLDivElement>}
                      className={`fade-in-up ${
                        isInView3 ? "visible" : ""
                      } md:col-span-2 ${
                        isDarkTheme ? "bg-gray-700" : "bg-white"
                      } rounded-lg shadow-lg overflow-visible`}
                    >
                      <div className="md:flex h-full">
                        <div className="md:w-1/2 p-6 flex flex-col justify-center">
                          <h3
                            className={`text-2xl font-semibold mb-4 ${
                              isDarkTheme ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {t("features.discover.callReports.title")}
                          </h3>
                          <p
                            className={`${
                              isDarkTheme ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {t("features.discover.callReports.description")}
                          </p>
                        </div>
                        <div className="md:w-1/2 p-6 flex items-center">
                          <img
                            src={callReports}
                            alt={t("features.discover.callReports.title")}
                            className="w-full h-auto drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Seamless Multi-Device Access */}
                    <div
                      ref={ref2 as React.RefObject<HTMLDivElement>}
                      className={`fade-in-up ${
                        isInView2 ? "visible" : ""
                      } md:col-span-2 ${
                        isDarkTheme ? "bg-gray-700" : "bg-white"
                      } rounded-lg shadow-lg overflow-hidden`}
                    >
                      <div className="md:flex h-full">
                        <div className="md:w-1/2 pr-6 pb-6">
                          <img
                            src={seamlessAccess}
                            alt={t("features.discover.seamlessAccess.title")}
                            className="w-full h-auto drop-shadow-lg"
                          />
                        </div>
                        <div className="md:w-1/2 p-6 flex flex-col justify-center">
                          <h3
                            className={`text-2xl font-semibold mb-4 ${
                              isDarkTheme ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {t("features.discover.seamlessAccess.title")}
                          </h3>
                          <p
                            className={`${
                              isDarkTheme ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {t("features.discover.seamlessAccess.description")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Intuitive Dashboard Design */}
                    <div
                      ref={ref1 as React.RefObject<HTMLDivElement>}
                      className={`fade-in-up ${isInView1 ? "visible" : ""} ${
                        isDarkTheme ? "bg-gray-700" : "bg-white"
                      } rounded-lg shadow-lg overflow-hidden`}
                    >
                      <div className="p-6">
                        <img
                          src={intuitiveDashboard}
                          alt={t("features.discover.dashboard.title")}
                          className="w-full h-auto drop-shadow-lg"
                        />
                      </div>
                      <div className="p-6 pt-0">
                        <h3
                          className={`text-2xl font-semibold mb-4 ${
                            isDarkTheme ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {t("features.discover.dashboard.title")}
                        </h3>
                        <p
                          className={`${
                            isDarkTheme ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {t("features.discover.dashboard.description")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-16 flex justify-center">
                    <button
                      className="flex items-center gap-4 border-2 border-white text-white px-8 py-3 rounded text-lg font-medium hover:bg-white/10 transition-colors"
                      onClick={() => {
                        window.location.href = "tel:+498962828095";
                      }}
                    >
                      <PhoneCall className="w-5 h-5" color="white" />
                      {t("hero.callSafina")}
                    </button>
                  </div>
                </div>
              </section>

              {/* Pricing */}
              <section
                id="pricing"
                className={`py-20 px-4 sm:px-6 lg:px-8 ${
                  isDarkTheme ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <h2
                      className={`text-3xl sm:text-4xl font-bold ${
                        isDarkTheme ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("pricing.choosePlan")}
                    </h2>
                    <div className="mt-6 flex items-center justify-center">
                      <span
                        className={`mr-3 ${
                          isAnnualBilling
                            ? isDarkTheme
                              ? "text-gray-400"
                              : "text-gray-500"
                            : isDarkTheme
                            ? "text-white"
                            : "text-gray-900"
                        }`}
                      >
                        {t("pricing.billingToggle.monthly")}
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
                      <span
                        className={`ml-3 ${
                          isAnnualBilling
                            ? isDarkTheme
                              ? "text-white"
                              : "text-gray-900"
                            : isDarkTheme
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {t("pricing.billingToggle.annually")}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => {
                      const [ref, isInView] = useInView({ threshold: 0.1 });
                      return (
                        <div
                          key={index}
                          ref={ref as React.RefObject<HTMLDivElement>}
                          className={`fade-in-up ${isInView ? "visible" : ""} ${
                            isDarkTheme ? "bg-gray-700" : "bg-gray-50"
                          } rounded-2xl shadow-lg p-6 ${
                            plan.popular ? "ring-2 ring-teal-600" : ""
                          }`}
                          onClick={() => handlePricingClick(plan.name)}
                        >
                          {plan.popular && (
                            <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {t("pricing.mostPopular")}
                            </span>
                          )}
                          <h3
                            className={`text-xl font-bold ${
                              isDarkTheme ? "text-white" : "text-gray-900"
                            } mt-4`}
                          >
                            {plan.name}
                          </h3>
                          <div className="mt-4 flex items-baseline">
                            {plan.price !== t("pricing.requestButton") ? (
                              <>
                                <span className="text-3xl font-bold font-merriweather">
                                  {getDisplayPrice(plan.price)[0]}
                                </span>
                                <span className="text-lg font-merriweather">
                                  .{getDisplayPrice(plan.price)[1]}
                                </span>
                                <span className="ml-1 text-xl font-merriweather">
                                  €
                                </span>
                                <span className="ml-1 text-gray-500 text-base">
                                  {t("pricing.perMonth")}
                                </span>
                              </>
                            ) : (
                              <button
                                onClick={() => {
                                  document
                                    .getElementById("contact")
                                    ?.scrollIntoView({
                                      behavior: "smooth",
                                    });
                                }}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-400 transition-colors"
                              >
                                {t("pricing.requestButton")}
                              </button>
                            )}
                          </div>
                          {isAnnualBilling && plan.price !== "Request" && (
                            <p className="text-sm text-green-600 mt-2">
                              {t("pricing.billingToggle.saveText")}
                            </p>
                          )}
                          <ul className="mt-6 space-y-3">
                            {(plan.features as string[]).map(
                              (feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-center"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                                  <span
                                    className={`${
                                      isDarkTheme
                                        ? "text-gray-300"
                                        : "text-gray-600"
                                    } text-sm`}
                                    dangerouslySetInnerHTML={{
                                      __html: feature,
                                    }}
                                  ></span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {/* Availability and App Store Badges */}
                  <div className="mt-16 text-center">
                    <h3
                      className={`text-2xl font-bold mb-8 ${
                        isDarkTheme ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("appStore.title")}
                    </h3>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
                      <a
                        href="https://apps.apple.com/your-app-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={appStoreBadgeDesktop}
                          alt={t("appStore.appStore")}
                          className="h-auto w-[200px] hidden md:block"
                        />
                        <img
                          src={appStoreBadgePhone}
                          alt={t("appStore.appStore")}
                          className="h-auto w-[200px] md:hidden"
                        />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/your-app-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={playStoreBadgeDesktop}
                          alt={t("appStore.playStore")}
                          className="h-auto w-[200px] hidden md:block"
                        />
                        <img
                          src={playStoreBadgePhone}
                          alt={t("appStore.playStore")}
                          className="h-auto w-[200px] md:hidden"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section
                id="contact"
                className={`py-20 px-4 sm:px-6 lg:px-8 ${
                  isDarkTheme ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-16">
                    <h2
                      className={`text-3xl sm:text-4xl font-bold ${
                        isDarkTheme ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("contact.title")}
                    </h2>
                    <p
                      className={`mt-4 text-xl ${
                        isDarkTheme ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {t("contact.subtitle")}
                    </p>
                  </div>
                  <ContactForm isDarkTheme={isDarkTheme} />
                </div>
              </section>

              {/* FAQ */}
              <section
                id="faq"
                className={`py-20 px-4 sm:px-6 lg:px-8 ${
                  isDarkTheme ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="max-w-3xl mx-auto">
                  <div className="text-center mb-16">
                    <h2
                      className={`text-3xl sm:text-4xl font-bold ${
                        isDarkTheme ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("faq.title")}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div
                        key={index}
                        className={`${
                          isDarkTheme ? "bg-gray-700" : "bg-white"
                        } rounded-lg shadow`}
                      >
                        <button
                          className="w-full px-6 py-4 text-left flex justify-between items-center"
                          onClick={() =>
                            setActiveFaq(activeFaq === index ? null : index)
                          }
                        >
                          <span
                            className={`font-medium ${
                              isDarkTheme ? "text-white" : "text-gray-900"
                            } text-lg`}
                          >
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 ${
                              isDarkTheme ? "text-gray-400" : "text-gray-500"
                            } transform transition-transform ${
                              activeFaq === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {activeFaq === index && (
                          <div
                            className={`px-6 pb-4 ${
                              isDarkTheme ? "text-gray-300" : "text-gray-600"
                            } text-base`}
                          >
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section
                className={`py-20 px-4 sm:px-6 lg:px-8 ${
                  isDarkTheme ? "bg-gray-900" : "bg-white"
                }`}
              >
                <div className="max-w-7xl mx-auto bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl overflow-hidden">
                  <div className="flex flex-col-reverse md:flex-row items-center">
                    {/* Image - now with 3rem padding */}
                    <div className="w-full md:w-1/2 px-12 pt-12">
                      <img
                        src={transformCallExperience}
                        alt={t("cta.title")}
                        className="cta-image w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-full md:w-1/2 p-12 text-left">
                      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                        {t("cta.title")}
                      </h2>
                      <p className="text-xl mb-8 text-teal-100 max-w-2xl">
                        {t("cta.subtitle")}
                      </p>
                      <button
                        onClick={() => {
                          const pricingSection =
                            document.getElementById("pricing");
                          pricingSection?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                        className="bg-white text-teal-600 px-8 py-3 rounded text-lg font-medium hover:bg-teal-50 transition-colors"
                      >
                        {t("cta.button")}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="*" element={<NotFound isDarkTheme={isDarkTheme} />} />
      </Routes>

      <Footer
        isDarkTheme={isDarkTheme}
        onCookieSettingsClick={() => setIsCookieBannerVisible(true)}
      />
      <CookieBanner
        isDarkTheme={isDarkTheme}
        isVisible={isCookieBannerVisible}
        setIsVisible={setIsCookieBannerVisible}
      />
    </div>
  );
}

export default App;
