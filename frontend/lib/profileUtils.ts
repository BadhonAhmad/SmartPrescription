export interface DoctorProfile {
  doctorName: string;
  doctorNameBangla: string;
  doctorDegree: string;
  doctorDegreeBangla: string;
  specialization: string;
  specializationBangla: string;
  details: string;
  phoneNo: string;
  chamber: string;
  location: string;
  visitDate: string;
  visitTime: string;
  advice: string;
  leftGrid: string;
  rightGrid: string;
}

const getProfileKey = (): string | null => {
  if (typeof window === "undefined") return null;
  const username = localStorage.getItem("username");
  if (!username) return null;
  return `doctorProfile_${username}`;
};

export const getDoctorProfile = (): DoctorProfile | null => {
  const profileKey = getProfileKey();
  if (!profileKey) return null;
  
  const savedProfile = localStorage.getItem(profileKey);
  if (!savedProfile) return null;
  
  try {
    return JSON.parse(savedProfile);
  } catch {
    return null;
  }
};

export const saveDoctorProfile = (profile: DoctorProfile): boolean => {
  const profileKey = getProfileKey();
  if (!profileKey) return false;
  
  try {
    localStorage.setItem(profileKey, JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
};

export const isProfileComplete = (): boolean => {
  const profile = getDoctorProfile();
  if (!profile) return false;
  
  // Check if at least the essential fields are filled
  return !!(profile.doctorName && profile.doctorDegree);
};
