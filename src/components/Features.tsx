import React from 'react';
import { Shield, Brain, MessageSquare, Mail } from 'lucide-react';
import { Feature } from './Feature';

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Automated call management',
    description:
      'Safina AI ensures you never miss important information by managing missed or rejected calls and gathering essential details from callers on your behalf.',
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: 'Summaries of missed calls',
    description:
      'Receive summaries of every interaction Safina has with callers. She will tell you the intent and importance of each call.',
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: 'Uninterrupted Productivity',
    description:
      'Safina intercepts and filters out spam, acquisition, and phishing calls, allowing you to maintain your workflow without distractions.',
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Friendly and Professional Assistant',
    description:
      'Safina, your professional AI secretary, handles your calls with a friendly touch, enhancing your interactions while you focus on your priorities.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Take back control of your phone
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Organise your everyday life without unwanted interruptions
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
