import { supabase } from './supabase';

interface EventData {
  user_id: string;
  title: string;
  description?: string;
  date: string;
  budget: number;
  location: string;
  type: string;
  guest_count: number;
}

export async function createEvent(eventData: EventData) {
  return await supabase.from('events').insert([eventData]);
}

export async function getUserEvents(userId: string) {
  return await supabase
    .from('events')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: true });
}