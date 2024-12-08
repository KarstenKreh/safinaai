import { Shield, Clock, FileText, Settings, Cog, Target } from "lucide-react";
import { Feature } from "./Feature";
import { useTranslation } from "react-i18next";

interface FeaturesProps {
  isDarkTheme: boolean;
}

export const Features: React.FC<FeaturesProps> = ({ isDarkTheme }) => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Cog className={`w-6 h-6`} />,
      title: t("features.list.aiConversations.title"),
      description: t("features.list.aiConversations.description"),
    },
    {
      icon: <Target className={`w-6 h-6`} />,
      title: t("features.list.productivity.title"),
      description: t("features.list.productivity.description"),
    },
    {
      icon: <Shield className={`w-6 h-6`} />,
      title: t("features.list.spamProtection.title"),
      description: t("features.list.spamProtection.description"),
    },
    {
      icon: <Clock className={`w-6 h-6`} />,
      title: t("features.list.availability.title"),
      description: t("features.list.availability.description"),
    },
    {
      icon: <FileText className={`w-6 h-6`} />,
      title: t("features.list.summaries.title"),
      description: t("features.list.summaries.description"),
    },
    {
      icon: <Settings className={`w-6 h-6`} />,
      title: t("features.list.customization.title"),
      description: t("features.list.customization.description"),
    },
  ];

  return (
    <section
      id="features"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        isDarkTheme ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold ${
              isDarkTheme ? "text-white" : "text-gray-900"
            }`}
          >
            {t("features.title")}
          </h2>
          <p
            className={`mt-4 text-xl ${
              isDarkTheme ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("features.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} isDarkTheme={isDarkTheme} />
          ))}
        </div>
      </div>
    </section>
  );
};
