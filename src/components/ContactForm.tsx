import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  isDarkTheme: boolean;
}

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";       // ❌ Placeholder
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";     // ❌ Placeholder
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";       // ❌ Placeholder

export const ContactForm: React.FC<ContactFormProps> = ({ isDarkTheme }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const templateParams = {
        to_email: 'info@safina.ai',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setErrors({
        ...errors,
        submit: 'Failed to send message. Please try again later.'
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className={`max-w-2xl mx-auto text-center p-8 rounded-lg ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className={`text-2xl font-bold mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Thank you for your message!
        </h3>
        <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>
          We'll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className={`w-full p-3 rounded-lg border ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          {errors.firstName && <p className="mt-1 text-red-500 text-sm">{errors.firstName}</p>}
        </div>
        <div>
          <label className={`block mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className={`w-full p-3 rounded-lg border ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
          {errors.lastName && <p className="mt-1 text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label className={`block mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className={`w-full p-3 rounded-lg border ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        />
        {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mt-6">
        <label className={`block mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className={`w-full p-3 rounded-lg border ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        />
      </div>

      <div className="mt-6">
        <label className={`block mb-2 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
          Message *
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={5}
          className={`w-full p-3 rounded-lg border ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        />
        {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
      </div>

      <div className="mt-6">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.consent}
            onChange={(e) => setFormData({...formData, consent: e.target.checked})}
            className="mt-1"
          />
          <span className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            I agree to be contacted and have read the{' '}
            <Link to="/privacy-policy" className="text-teal-600 hover:text-teal-500">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.consent && <p className="mt-1 text-red-500 text-sm">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}; 