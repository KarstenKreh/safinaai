import { Shield, Clock, FileText, Settings, Cog, Target } from 'lucide-react';
import { Feature } from './Feature';

const features = [
  {
    icon: <Cog className={`w-6 h-6`} />,
    title: 'Automated Call Management',
    description:
      'Never miss important information. Safina manages missed or rejected calls, gathering essential details from callers on your behalf.',
  },
  {
    icon: <Target className={`w-6 h-6`} />,
    title: 'Uninterrupted Productivity',
    description:
      'Maintain your workflow without distractions. Safina intercepts and filters out spam, acquisition, and phishing calls.',
  },
  {
    icon: <Shield className={`w-6 h-6`} />,
    title: 'Advanced Spam Protection',
    description:
      'Stay secure with proactive call screening. Safina identifies and blocks potential spam and phishing attempts.',
  },
  {
    icon: <Clock className={`w-6 h-6`} />,
    title: 'Round-the-Clock Availability',
    description:
      'Enjoy 24/7 call coverage. Safina is always on duty, ensuring you never miss important calls, even when you\'re unavailable.',
  },
  {
    icon: <FileText className={`w-6 h-6`} />,
    title: 'Summaries of Missed Calls',
    description:
      'Stay informed with detailed call summaries. Safina provides actionable insights, helping you prioritize follow-ups efficiently.',
  },
  {
    icon: <Settings className={`w-6 h-6`} />,
    title: 'Customizable Professional Assistant',
    description:
      'Tailor Safina to your needs. Enjoy a personalized, professional AI secretary that enhances your call experience.',
  },
];

interface FeaturesProps {
  isDarkTheme: boolean;
}

export const Features: React.FC<FeaturesProps> = ({ isDarkTheme }) => {
  return (
    <section id="features" className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkTheme ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Take back control of your phone
          </h2>
          <p className={`mt-4 text-xl ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            Organize your everyday life without unwanted interruptions
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
