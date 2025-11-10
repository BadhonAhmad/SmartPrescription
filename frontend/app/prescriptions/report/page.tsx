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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/prescriptions" className="text-blue-600 hover:text-blue-700 text-sm mb-1 block">
            ← Back to Prescriptions
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 size={28} />
            Day-wise Prescription Count
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {reportData.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
              <p>No prescription data available</p>
            </div>
          ) : (
            <>
              {/* Table View */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prescription Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visual
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {new Date(item.day).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {item.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div
                            className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-medium"
                            style={{ width: `${(item.count / maxCount) * 100}%`, minWidth: item.count > 0 ? '30px' : '0' }}
                          >
                            {item.count > 0 && item.count}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Days:</span>
                  <span className="text-sm font-semibold text-gray-900">{reportData.length}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-700">Total Prescriptions:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {reportData.reduce((sum, item) => sum + item.count, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-medium text-gray-700">Average per Day:</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {(reportData.reduce((sum, item) => sum + item.count, 0) / reportData.length).toFixed(1)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
