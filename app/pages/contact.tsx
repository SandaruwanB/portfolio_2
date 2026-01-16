"use client";

import React from 'react';
import WindowContainer from '../components/WindowContainer';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ isOpen, onClose }) => {
  return (
    <WindowContainer 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Contact - Portfolio"
      loadingText="Loading contact form..."
    >
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">
          Get In Touch
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          Feel free to reach out to me for any inquiries or collaborations
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Send Message
        </button>
      </form>
    </WindowContainer>
  );
};

export default Contact;