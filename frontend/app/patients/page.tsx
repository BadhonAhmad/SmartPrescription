'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Search, Edit, Trash2, Phone, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface Patient {
  id: number;
  name: string;
  age: string;
  phone: string;
  address: string;
  blood: string;
  lastVisit: string;
}

export default function PatientsPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patients', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        setPatients(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to load patients');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    try {
      const response = await fetch(`http://localhost:8080/api/patients/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        toast.success('Patient deleted successfully');
        fetchPatients();
      } else {
        toast.error('Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      toast.error('Failed to delete patient');
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm)
  );

  if (loading || !isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-blue-600">Manage Patients</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Add */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search patients by name or phone..."
              className="input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/patients/new" className="btn-primary flex items-center gap-2 justify-center">
            <Plus size={20} />
            Add Patient
          </Link>
        </div>

        {/* Patients List */}
        {isLoading ? (
          <div className="text-center py-12">Loading patients...</div>
        ) : filteredPatients.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No patients found</p>
            {searchTerm === '' && (
              <Link href="/patients/new" className="btn-primary inline-flex items-center gap-2 mt-4">
                <Plus size={20} />
                Add Your First Patient
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">Age: {patient.age || 'N/A'}</p>
                    {patient.blood && (
                      <p className="text-sm text-gray-600">Blood: {patient.blood}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/patients/${patient.id}`}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(patient.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {patient.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Phone size={16} />
                    {patient.phone}
                  </div>
                )}

                {patient.lastVisit && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                )}

                {patient.address && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{patient.address}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
