import React, { useState } from 'react';
import { CalendarDays, Users } from 'lucide-react';
import { EventForm } from './components/EventForm';
import { VendorList } from './components/VendorList';
import { AuthForm } from './components/AuthForm';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState<'events' | 'vendors'>('events');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Smart Event Planner</h1>
            <nav className="space-x-4">
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'events'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CalendarDays className="w-5 h-5 inline-block mr-2" />
                Events
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'vendors'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-5 h-5 inline-block mr-2" />
                Vendors
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Sign In or Sign Up</h2>
            <AuthForm />
          </div>
        ) : (
          activeTab === 'events' ? (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create New Event</h2>
              <EventForm />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Vendors</h2>
              <VendorList />
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;