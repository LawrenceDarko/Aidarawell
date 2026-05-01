'use client';

import { useState } from 'react';
import { LeadButton } from '../elements/LeadButton';

interface FormData {
  name: string;
  phone: string;
  email: string;
  careNeeds: string;
  preferredContact: 'phone' | 'email';
}

export function AssessmentForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    careNeeds: 'aging_parent',
    preferredContact: 'phone',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        careNeeds: 'aging_parent',
        preferredContact: 'phone',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Thank You!
        </h3>
        <p className="text-green-700">
          Your assessment request has been received. We'll call you within 24 hours to discuss your care needs.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="(701) 555-1234"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Care Needs */}
      <div>
        <label htmlFor="careNeeds" className="block text-sm font-medium text-gray-700 mb-1">
          What care do you need? *
        </label>
        <select
          id="careNeeds"
          name="careNeeds"
          value={formData.careNeeds}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
        >
          <option value="aging_parent">Care for aging parent</option>
          <option value="personal_care">Personal care (bathing, grooming)</option>
          <option value="companionship">Companionship and social activities</option>
          <option value="transportation">Transportation to appointments</option>
          <option value="homemaking">Homemaking and household help</option>
          <option value="multiple">Multiple services</option>
          <option value="unsure">Not sure yet</option>
        </select>
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How should we contact you? *
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={handleChange}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm text-gray-700">By Phone</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={handleChange}
              className="mr-2 w-4 h-4"
            />
            <span className="text-sm text-gray-700">By Email</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <LeadButton
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Schedule Free Assessment'}
        </LeadButton>
      </div>

      <p className="text-xs text-gray-500 text-center">
        We respect your privacy. Your information will only be used to schedule your assessment.
      </p>
    </form>
  );
}
