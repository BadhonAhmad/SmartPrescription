"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import { getDoctorProfile, saveDoctorProfile } from "@/lib/profileUtils";

export default function ProfileSettingsPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    doctorName: "",
    doctorNameBangla: "",
    doctorDegree: "",
    doctorDegreeBangla: "",
    specialization: "",
    specializationBangla: "",
    details: "",
    phoneNo: "",
    chamber: "",
    location: "",
    visitDate: "",
    visitTime: "",
    advice: "",
    leftGrid: "24",
    rightGrid: "27",
  });

  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    } else if (isAuthenticated) {
      // Load profile from localStorage for this specific user
      const savedProfile = getDoctorProfile();
      if (savedProfile) {
        setFormData(savedProfile);
        setIsProfileComplete(true);
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.doctorName || !formData.doctorDegree) {
      toast.error("Please fill in at least Doctor Name and Degree");
      return;
    }

    // Save to localStorage for this specific user
    const saved = saveDoctorProfile(formData);
    if (!saved) {
      toast.error("Failed to save profile. Please try again.");
      return;
    }

    setIsProfileComplete(true);
    toast.success("Profile updated successfully!");

    // Redirect to dashboard after saving
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          {isProfileComplete && (
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Doctor Information
            </h1>
            {!isProfileComplete && (
              <p className="text-sm text-red-600 mt-1">
                Please complete your profile before creating prescriptions
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Doctor Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Name:
              </label>
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ডাক্তারের নাম:
              </label>
              <input
                type="text"
                name="doctorNameBangla"
                value={formData.doctorNameBangla}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Doctor Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Degree:
              </label>
              <input
                type="text"
                name="doctorDegree"
                value={formData.doctorDegree}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ডাক্তারের ডিগ্রি:
              </label>
              <input
                type="text"
                name="doctorDegreeBangla"
                value={formData.doctorDegreeBangla}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization:
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বিশেষত্বজ্ঞতা:
              </label>
              <input
                type="text"
                name="specializationBangla"
                value={formData.specializationBangla}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Details */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Details:
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone No:
              </label>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Chamber */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chamber:
              </label>
              <input
                type="text"
                name="chamber"
                value={formData.chamber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location:
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Visit Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visit Date:
              </label>
              <input
                type="text"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visit Time
              </label>
              <input
                type="text"
                name="visitTime"
                value={formData.visitTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Advice */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advice :
              </label>
              <textarea
                name="advice"
                value={formData.advice}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Grid Settings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LeftGrid:
              </label>
              <input
                type="text"
                name="leftGrid"
                value={formData.leftGrid}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RightGrid:
              </label>
              <input
                type="text"
                name="rightGrid"
                value={formData.rightGrid}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg shadow-md transition-colors"
            >
              <Save size={20} />
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
