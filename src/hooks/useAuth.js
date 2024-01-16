"use client";
import React from 'react';
import Cookies from 'universal-cookie';
import { verifyJwtToken } from '@/libs/auth';

const STORAGE_KEY = 'authData';


export function useAuth() {
  // Try to get auth state from local storage on initial render
  // const storedAuth = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const [auth, setAuth] = React.useState( null);

  const getVerifiedToken = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token') ?? null;
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);

    // Save the updated auth state to local storage
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedToken));
  };

  // Fetch the authentication state on the initial render and on client-side
  React.useEffect(() => {
    getVerifiedToken();
  }, []);

  // Listen for changes in localStorage (notifications from other tabs)
  const handleStorageChange = () => {
    getVerifiedToken();
  };

  // Set up event listener for storage changes
  React.useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return auth;
}
