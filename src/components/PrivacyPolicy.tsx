import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">This Privacy Policy explains how [Your Company Name] collects, uses, and protects your personal information. We are committed to ensuring that your privacy is protected.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
        <p className="mb-4">We may collect the following information:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Name and contact information</li>
          <li>Demographic information</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Improve our products and services</li>
          <li>Send promotional emails about new products or other information</li>
          <li>Contact you for market research purposes</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Security</h2>
        <p className="mb-4">We are committed to ensuring that your information is secure. We have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;



