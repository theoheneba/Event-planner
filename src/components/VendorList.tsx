import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Vendor {
  id: string;
  name: string;
  category: string;
  description: string;
  price_range: string;
  location: string;
  contact_info: string;
}

export function VendorList() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('name');

      if (error) throw error;
      setVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading vendors...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vendors.map((vendor) => (
        <div
          key={vendor.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {vendor.name}
            </h3>
            <span className="inline-block px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
              {vendor.category}
            </span>
            <p className="text-gray-600 mb-4">{vendor.description}</p>
            
            <div className="space-y-2">
              <p className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {vendor.location}
              </p>
              <p className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                {vendor.price_range}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {vendor.contact_info}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}