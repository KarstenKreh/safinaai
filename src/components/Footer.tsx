import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoLight from "../assets/images/Logo-safina-ai-on-light.svg";
import logoDark from "../assets/images/Logo-safina-ai-on-dark.svg";
import { Linkedin, Twitter } from "lucide-react";

interface FooterProps {
  isDarkTheme: boolean;
  onCookieSettingsClick: () => void;
}

function Footer({ isDarkTheme, onCookieSettingsClick }: FooterProps) {
  const { t } = useTranslation();

  return (
    <footer
      className={`${isDarkTheme ? "bg-gray-900" : "bg-white"} border-t ${
        isDarkTheme ? "border-gray-800" : "border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo and Claim */}
          <div className="flex flex-col items-center">
            <img
              src={isDarkTheme ? logoDark : logoLight}
              alt="Safina AI Logo"
              className="h-8 w-auto mb-2"
            />
            <p
              className={`text-sm ${
                isDarkTheme ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {t("footer.tagline")}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/privacy-policy"
              className={`text-sm ${
                isDarkTheme
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              to="/terms-of-use"
              className={`text-sm ${
                isDarkTheme
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              {t("footer.termsOfUse")}
            </Link>
            <Link
              to="/imprint"
              className={`text-sm ${
                isDarkTheme
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              {t("footer.imprint")}
            </Link>
            <button
              onClick={onCookieSettingsClick}
              className={`text-sm ${
                isDarkTheme
                  ? "text-gray-400 hover:text-gray-300"
                  : "text-gray-500 hover:text-gray-600"
              }`}
            >
              {t("footer.cookieSettings")}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/company/safina-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-teal-600 transition-colors ${
                isDarkTheme
                  ? "text-gray-400 hover:text-teal-400"
                  : "text-gray-600"
              }`}
              aria-label={t("footer.socialLinkedin")}
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/Safina_AI_app"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-teal-600 transition-colors ${
                isDarkTheme
                  ? "text-gray-400 hover:text-teal-400"
                  : "text-gray-600"
              }`}
              aria-label={t("footer.socialTwitter")}
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
