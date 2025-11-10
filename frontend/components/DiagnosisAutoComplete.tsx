"use client";

import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import api from "@/lib/api";

interface Diagnosis {
  content: string;
  occurrence: number;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function DiagnosisAutoComplete({ value, onChange, label = "Diagnosis" }: Props) {
  const [suggestions, setSuggestions] = useState<Diagnosis[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSuggestions();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/templates/diagnosis?limit=20");
      if (response.data.success) {
        setSuggestions(response.data.data || []);
      }
    } catch (error) {
      console.error("Failed to load diagnosis suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (content: string) => {
    const currentValue = value.trim();
    const newValue = currentValue ? `${currentValue}\n• ${content}` : `• ${content}`;
    onChange(newValue);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter((s) =>
    s.content.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center justify-between mb-1">
        <label className="label">{label}</label>
        <button
          type="button"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
        >
          <Plus size={16} />
          Add Template
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Type diagnosis or select from templates..."
        rows={5}
        className="input w-full"
      />

      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-center text-gray-500">Loading...</div>
          ) : filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectSuggestion(suggestion.content)}
                className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
              >
                <div className="text-sm text-gray-900">{suggestion.content}</div>
                <div className="text-xs text-gray-500">Used {suggestion.occurrence} times</div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  );
}
