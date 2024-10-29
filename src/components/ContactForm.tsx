import { useState } from 'react';

interface ContactFormProps {
  isDarkTheme: boolean;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactForm = ({ isDarkTheme }: ContactFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      console.log('Sending form data:', formData);

      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Detailed error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="space-y-6">
        {/* First Name */}
        <div>
          <label 
            htmlFor="firstName" 
            className={`block text-sm font-medium ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 ${
              isDarkTheme 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-teal-500 focus:border-teal-500`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label 
            htmlFor="lastName" 
            className={`block text-sm font-medium ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 ${
              isDarkTheme 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-teal-500 focus:border-teal-500`}
          />
        </div>

        {/* Email */}
        <div>
          <label 
            htmlFor="email" 
            className={`block text-sm font-medium ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 ${
              isDarkTheme 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-teal-500 focus:border-teal-500`}
          />
        </div>

        {/* Phone (Optional) */}
        <div>
          <label 
            htmlFor="phone" 
            className={`block text-sm font-medium ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 ${
              isDarkTheme 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-teal-500 focus:border-teal-500`}
          />
        </div>

        {/* Message */}
        <div>
          <label 
            htmlFor="message" 
            className={`block text-sm font-medium ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 ${
              isDarkTheme 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            } focus:ring-teal-500 focus:border-teal-500`}
          />
        </div>

        {/* Button - Updated styling */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`inline-flex px-6 py-3 rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
              status === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {status === 'success' && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Message sent successfully!
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Failed to send message. Please try again.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}; 