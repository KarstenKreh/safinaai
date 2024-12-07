import { Link } from "react-router-dom";
import logoLight from "../assets/images/Logo-safina-ai-on-light.svg";
import logoDark from "../assets/images/Logo-safina-ai-on-dark.svg";
import { Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  isDarkTheme: boolean;
  onCookieSettingsClick: () => void;
}

function Footer({ isDarkTheme, onCookieSettingsClick }: FooterProps) {
  return (
    <footer className={`${isDarkTheme ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkTheme ? 'border-gray-800' : 'border-gray-100'}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and Claim */}
          <div className="flex flex-col items-center">
            <img
              src={isDarkTheme ? logoDark : logoLight}
              alt="Safina AI Logo"
              className="h-8 w-auto mb-2"
            />
            <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              Your personal AI powered phone assistant
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/privacy-policy"
              className={`text-sm ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-use"
              className={`text-sm ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
            >
              Terms of Use
            </Link>
            <Link
              to="/imprint"
              className={`text-sm ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
            >
              Imprint
            </Link>
            <button
              onClick={onCookieSettingsClick}
              className={`text-sm ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
            >
              Cookie Settings
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/company/safina-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-teal-600 transition-colors ${
                isDarkTheme ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600'
              }`}
              aria-label="Follow us on LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/Safina_AI_app"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-teal-600 transition-colors ${
                isDarkTheme ? 'text-gray-400 hover:text-teal-400' : 'text-gray-600'
              }`}
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
