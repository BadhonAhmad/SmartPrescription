'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { BarChart3, ArrowLeft } from 'lucide-react';

interface DayWiseCount {
  day: string;
  count: number;
}

export default function ReportPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [reportData, setReportData] = useState<DayWiseCount[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      fetchReport();
    }
  }, [isAuthenticated, loading]);

  const fetchReport = async () => {
    try {
      const response = await api.get('/API/v1/prescription/report/daywise');
      const data = response.data.map((row: any[]) => ({
        day: row[0],
        count: row[1]
      }));
      setReportData(data);
    } catch (error) {
      console.error('Failed to fetch report:', error);
      toast.error('Failed to load report');
    } finally {
      setLoadingData(false);
    }
  };

  if (loading || loadingData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const maxCount = Math.max(...reportData.map(d => d.count), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/prescriptions" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Prescriptions
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BarChart3 size={32} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Day-wise Prescription Count
              </h1>
              <p className="text-sm text-gray-600 mt-1">Track your daily prescription trends</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {reportData.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                <BarChart3 size={48} className="opacity-50" />
              </div>
              <p className="text-lg font-medium">No prescription data available</p>
              <p className="text-sm mt-2">Start creating prescriptions to see analytics here</p>
            </div>
          ) : (
            <>
              {/* Table View */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Prescription Count
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Visual
                    </th>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.map((item, index) => (
                      <tr key={index} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Date(item.day).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {item.count}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-8">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md"
                              style={{ width: `${(item.count / maxCount) * 100}%`, minWidth: item.count > 0 ? '40px' : '0' }}
                            >
                              {item.count > 0 && item.count}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Total Days</span>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{reportData.length}</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Total Prescriptions</span>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {reportData.reduce((sum, item) => sum + item.count, 0)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Average per Day</span>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">
                      {(reportData.reduce((sum, item) => sum + item.count, 0) / reportData.length).toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
