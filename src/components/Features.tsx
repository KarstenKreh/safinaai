import { Shield, Clock, FileText, Settings, Cog, Target } from 'lucide-react';
import { Feature } from './Feature';

const features = [
  {
    icon: <Cog className={`w-6 h-6`} />,
    title: 'AI powered conversations',
    description:
      'Natural language processing enables human-like interactions with callers.',
  },
  {
    icon: <Target className={`w-6 h-6`} />,
    title: 'Uninterrupted Productivity',
    description:
      'Maintain your workflow without distractions. Safina intercepts any unwanted call.',
  },
  {
    icon: <Shield className={`w-6 h-6`} />,
    title: 'Spam Protection',
    description:
      'Stay safe! Safina identifies and warns you about spam and phishing attempts.',
  },
  {
    icon: <Clock className={`w-6 h-6`} />,
    title: '24/7 Availability',
    description:
      'Safina is always on duty, ensuring you never miss important calls, even when you\'re unavailable.',
  },
  {
    icon: <FileText className={`w-6 h-6`} />,
    title: 'Summaries of Missed Calls',
    description:
      'Safina provides actionable insights, helping you prioritize follow-ups efficiently.',
  },
  {
    icon: <Settings className={`w-6 h-6`} />,
    title: 'Custom voice profiles',
    description:
      'Get a personalized, professional AI secretary that perfectly matches your preferences.',
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
