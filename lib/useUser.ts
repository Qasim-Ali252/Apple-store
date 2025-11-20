// lib/useUser.ts
"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { saveUserProfile } from "@/lib/userProfiles";

export function useUser() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // Save user profile when they log in
      if (u) {
        saveUserProfile(u);
      }
    });
    return () => unsub();
  }, []);

  return user;
}
