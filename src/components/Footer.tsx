import React from 'react';
import { Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  isDarkTheme: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkTheme }) => {
  return (
    <footer className={`py-12 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-900 text-gray-300' : 'bg-gray-900 text-gray-400'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center text-white mb-4">
            <Bot className="h-6 w-6 mr-2" />
            <span className="font-bold">Safina</span>
          </div>
          <p className="text-sm">AI powered phone assistant</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/#features" className="hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link to="/#pricing" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:text-white">
                Security
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/#" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/#" className="hover:text-white">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-use" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/imprint" className="hover:text-white">
                Imprint
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-center">
        {new Date().getFullYear()} Safina AI is not copyrighted. Feel free to use it as you wish.
      </div>
    </footer>
  );
};

export default Footer;
