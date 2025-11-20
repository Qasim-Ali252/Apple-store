// lib/userProfiles.ts
"use client";

interface UserProfile {
  email: string;
  uid: string;
  displayName?: string;
  photoURL?: string;
  lastLogin: number;
}

const PROFILES_KEY = "saved_user_profiles";
const MAX_PROFILES = 5; // Maximum number of profiles to store

export const saveUserProfile = (user: any) => {
  if (typeof window === "undefined") return;

  try {
    const profiles = getSavedProfiles();
    
    const newProfile: UserProfile = {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName || undefined,
      photoURL: user.photoURL || undefined,
      lastLogin: Date.now(),
    };

    // Remove existing profile with same email
    const filteredProfiles = profiles.filter(p => p.email !== user.email);
    
    // Add new profile at the beginning
    const updatedProfiles = [newProfile, ...filteredProfiles].slice(0, MAX_PROFILES);
    
    localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles));
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

export const getSavedProfiles = (): UserProfile[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(PROFILES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting saved profiles:", error);
    return [];
  }
};

export const removeUserProfile = (email: string) => {
  if (typeof window === "undefined") return;

  try {
    const profiles = getSavedProfiles();
    const updatedProfiles = profiles.filter(p => p.email !== email);
    localStorage.setItem(PROFILES_KEY, JSON.stringify(updatedProfiles));
  } catch (error) {
    console.error("Error removing user profile:", error);
  }
};

export const clearAllProfiles = () => {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(PROFILES_KEY);
  } catch (error) {
    console.error("Error clearing profiles:", error);
  }
};
