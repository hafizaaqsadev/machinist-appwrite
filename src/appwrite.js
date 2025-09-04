// src/appwrite.js
import { Client, Account, Databases, ID } from "appwrite";
import { useState, useEffect } from "react";

// ✅ Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// ✅ Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// ✅ Export ID for unique document IDs
export { ID };

// ✅ Auth Hook
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await account.get();
        setUser(res);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return { user, setUser, loading };
}

// ✅ Save Booking Function
export async function saveBooking(collectionId, bookingData) {
  try {
    const res = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
      collectionId,
      ID.unique(),
      bookingData
    );
    return res;
  } catch (err) {
    console.error("Error saving booking:", err);
    throw err;
  }
}
