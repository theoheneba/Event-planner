import React, { useState } from 'react';
import { Calendar, Users, MapPin, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../lib/auth';
import toast from 'react-hot-toast';
import { createEvent } from '../lib/events';

export function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    budget: '',
    location: '',
    type: '',
    guest_count: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.error('Please sign in to create an event');
        return;
      }

      const { error } = await createEvent({
        ...formData,
        user_id: user.id,
        budget: parseFloat(formData.budget),
        guest_count: parseInt(formData.guest_count),
      });

      if (error) throw error;
      
      toast.success('Event created successfully!');
      setFormData({
        title: '',
        description: '',
        date: '',
        budget: '',
        location: '',
        type: '',
        guest_count: '',
      });
    } catch (error: any) {
      toast.error(error.message || 'Error creating event');
      console.error('Error creating event:', error);
    }
  };

  // Rest of the component remains the same
}