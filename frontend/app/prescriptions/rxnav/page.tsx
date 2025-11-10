'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react';

interface DrugInteraction {
  description: string;
  severity: string;
}

interface InteractionPair {
  interactionConcept: Array<{
    minConceptItem: {
      name: string;
      rxcui: string;
    };
    sourceConceptItem: {
      name: string;
      rxcui: string;
    };
  }>;
  interactionType: Array<{
    comment: string;
    minConcept: {
      name: string;
      rxcui: string;
    };
    sourceConcept: {
      name: string;
      rxcui: string;
    };
  }>;
  severity: string;
  description: string;
}

export default function RxNavPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [interactions, setInteractions] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      fetchInteractions();
    }
  }, [isAuthenticated, loading]);

  const fetchInteractions = async () => {
    try {
      const response = await fetch(
        'https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=341248'
      );
      const data = await response.json();
      
      if (data.interactionTypeGroup) {
        const allInteractions = data.interactionTypeGroup.flatMap(
          (group: any) => group.interactionType || []
        );
        setInteractions(allInteractions);
      } else {
        setInteractions([]);
      }
    } catch (error) {
      console.error('Failed to fetch drug interactions:', error);
      setError('Failed to load drug interactions from RXNAV API');
      toast.error('Failed to load drug interactions');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/prescriptions" className="text-blue-600 hover:text-blue-700 text-sm mb-1 block">
            ← Back to Prescriptions
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <AlertTriangle size={28} className="text-orange-500" />
                Drug Interactions (RXNAV)
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Data for RXCUI: 341248 from{' '}
                <a
                  href="https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=341248"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline inline-flex items-center gap-1"
                >
                  RXNAV API
                  <ExternalLink size={14} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertTriangle size={48} className="mx-auto mb-2 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        ) : interactions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <AlertTriangle size={48} className="mx-auto mb-2 opacity-50 text-gray-400" />
            <p className="text-gray-500">No drug interactions found for this RXCUI</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <p className="text-sm font-medium text-gray-700">
                Found {interactions.length} interaction{interactions.length !== 1 ? 's' : ''}
              </p>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source Drug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interacts With
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {interactions.map((interaction, index) => {
                  const minConcept = interaction.minConcept?.[0];
                  const interactionPair = interaction.interactionPair?.[0];
                  const severity = interaction.severity || 'N/A';
                  const description = interaction.description || interactionPair?.description || 'No description available';

                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {minConcept?.name || 'N/A'}
                        {minConcept?.rxcui && (
                          <div className="text-xs text-gray-500">RXCUI: {minConcept.rxcui}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {interactionPair?.interactionConcept?.[0]?.minConceptItem?.name || 
                         interactionPair?.interactionConcept?.[0]?.sourceConceptItem?.name || 
                         'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            severity.toLowerCase() === 'high'
                              ? 'bg-red-100 text-red-800'
                              : severity.toLowerCase() === 'moderate'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md">
                        {description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
