import React, { useEffect, useState } from 'react';
import { Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { getUserEvents } from '../lib/events';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: string;
  budget: number;
  guest_count: number;
  type: string;
}

export function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchEvents() {
      if (!user) return;
      const { data } = await getUserEvents(user.id);
      setEvents(data || []);
      setLoading(false);
    }
    fetchEvents();
  }, [user]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-blue-900">Upcoming Events</h3>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {events.filter(e => new Date(e.date) > new Date()).length}
          </p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-green-900">Total Budget</h3>
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${events.reduce((acc, event) => acc + event.budget, 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-purple-900">Total Guests</h3>
            <Users className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {events.reduce((acc, event) => acc + event.guest_count, 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {events
            .filter(event => new Date(event.date) > new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map(event => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {format(new Date(event.date), 'PPP')}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {event.guest_count} guests
                      </span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />
                        ${event.budget.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" 
                    style={{
                      backgroundColor: event.type === 'wedding' ? 'rgb(254, 242, 242)' : 
                                    event.type === 'corporate' ? 'rgb(240, 253, 244)' : 
                                    event.type === 'birthday' ? 'rgb(239, 246, 255)' : 
                                    'rgb(250, 245, 255)',
                      color: event.type === 'wedding' ? 'rgb(185, 28, 28)' :
                             event.type === 'corporate' ? 'rgb(22, 163, 74)' :
                             event.type === 'birthday' ? 'rgb(29, 78, 216)' :
                             'rgb(124, 58, 237)'
                    }}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}