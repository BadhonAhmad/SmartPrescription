'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Interaction {
  interactingDrug: string;
  severity: string;
  description: string;
  source: string;
}

interface DrugInteraction {
  drugName: string;
  rxcui: string;
  interactions: Interaction[];
  disclaimer: string;
}

export default function RxNavPage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [drugInteraction, setDrugInteraction] = useState<DrugInteraction | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Please enter a drug name or RXCUI');
      return;
    }

    setLoading(true);
    setError('');
    setDrugInteraction(null);

    try {
      // The API now accepts both RXCUI and drug names
      const response = await api.get(`/API/v1/rxnav/interactions/${encodeURIComponent(searchValue.trim())}`);
      setDrugInteraction(response.data);

    } catch (err: any) {
      console.error('Error fetching drug interactions:', err);
      if (err.response?.status === 404) {
        setError('Drug not found. Please check the name or RXCUI and try again.');
      } else {
        setError('Failed to fetch drug interactions. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const severityLower = severity.toLowerCase();
    if (severityLower.includes('high') || severityLower.includes('major')) {
      return 'bg-red-100 text-red-800 border-red-300';
    } else if (severityLower.includes('moderate')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    } else if (severityLower.includes('low') || severityLower.includes('minor')) {
      return 'bg-green-100 text-green-800 border-green-300';
    }
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Drug Interaction Checker
            </h1>
            <p className="text-gray-600">
              Powered by FDA Drug Database
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all shadow-md"
          >
            ← Back
          </button>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSearch}>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter drug name (e.g., warfarin, aspirin, ibuprofen) or RXCUI"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md font-medium"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {drugInteraction && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Drug Info */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {drugInteraction.drugName}
              </h2>
              <p className="text-gray-600">RXCUI: {drugInteraction.rxcui}</p>
              <p className="text-sm text-gray-500 mt-2">
                Found {drugInteraction.interactions.length} interaction(s)
              </p>
            </div>

            {/* Interactions Table */}
            {drugInteraction.interactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Interacting Drug
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Severity
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {drugInteraction.interactions.map((interaction, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-gray-800 font-medium">
                          {interaction.interactingDrug}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                              interaction.severity
                            )}`}
                          >
                            {interaction.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {interaction.description}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {interaction.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  No Known Interactions
                </p>
                <p className="text-gray-600">
                  No drug interactions found for {drugInteraction.drugName}
                </p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> {drugInteraction.disclaimer}
              </p>
            </div>
          </div>
        )}

        {/* Info Box */}
        {!drugInteraction && !loading && (
          <div className="bg-blue-50 rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              How to Use:
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Choose search type: Drug Name or RXCUI</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Enter the drug name (e.g., "aspirin") or RXCUI number</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Click "Search" to view potential drug interactions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Review the severity and description of each interaction</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-blue-700">
              <strong>Note:</strong> RXCUI (RxNorm Concept Unique Identifier) is a standardized
              identifier for medications. If you don't know the RXCUI, simply search by drug name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
