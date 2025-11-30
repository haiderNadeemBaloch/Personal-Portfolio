'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would send this to your API
    console.log('Form submitted:', formData);
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl"
      >
        <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">
          Get In Touch
        </h1>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
          Have a project in mind or want to collaborate? I&apos;d love to hear
          from you!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary-400 dark:focus:ring-primary-400"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="focus-visible-ring w-full rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700 disabled:opacity-50 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            {status === 'sending'
              ? 'Sending...'
              : status === 'success'
                ? 'Message Sent!'
                : 'Send Message'}
          </button>

          {status === 'error' && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </form>

        <div className="mt-12 border-t border-gray-200 pt-12 dark:border-gray-800">
          <h2 className="mb-4 font-heading text-2xl font-semibold">
            Other Ways to Reach Me
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Email:{' '}
            <a
              href="mailto:haider.nadeem7870@gmail.com"
              className="focus-visible-ring rounded-md px-1 text-primary-600 hover:underline dark:text-primary-400"
            >
              haider.nadeem7870@gmail.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
