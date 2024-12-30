import React from 'react';
import { Calendar, Users, DollarSign, Clock } from 'lucide-react';
import { AuthForm } from './AuthForm';

export function LandingPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Plan Your Perfect Event
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Streamline your event planning process with our smart tools and features
        </p>
        <div className="max-w-md mx-auto">
          <AuthForm />
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Event Management</h3>
          <p className="text-gray-600">
            Create and manage multiple events with ease
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Vendor Directory</h3>
          <p className="text-gray-600">
            Find and connect with trusted vendors
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <DollarSign className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Budget Tracking</h3>
          <p className="text-gray-600">
            Keep your expenses organized and under control
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Clock className="w-12 h-12 text-red-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Timeline Planning</h3>
          <p className="text-gray-600">
            Stay on schedule with timeline management
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              "This platform made planning my wedding so much easier. Highly recommended!"
            </p>
            <p className="font-semibold">- Sarah Johnson</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              "Great for corporate event planning. Saves us hours of work."
            </p>
            <p className="font-semibold">- Michael Chen</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              "The vendor management feature is a game-changer!"
            </p>
            <p className="font-semibold">- Emma Davis</p>
          </div>
        </div>
      </div>
    </div>
  );
}