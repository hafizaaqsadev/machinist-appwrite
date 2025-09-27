import { Client, Account, Databases, ID, Query, Permission } from "appwrite"; // ✅ Permission bhi add kiya
import { useState, useEffect } from "react";

// -------------------- Initialize Appwrite client --------------------
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Export ID, Query, Permission
export { ID, Query, Permission };

// -------------------- Auth Hook --------------------
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

// -------------------- Save Booking with full permissions --------------------
export async function saveBooking(collectionId, bookingData, userId) {
  try {
    // Add userId if missing
    const data = { ...bookingData, userId };

    const res = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
      collectionId,
      ID.unique(),
      data,
      [
        Permission.read(`user:${userId}`),
        Permission.update(`user:${userId}`),
        Permission.delete(`user:${userId}`),
      ]
    );

    console.log("✅ Booking saved with full permissions", res);
    return res;
  } catch (err) {
    console.error("❌ Error saving booking:", err);
    throw err;
  }
}

// -------------------- Log user login --------------------
export async function logUserLogin(user) {
  try {
    const res = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USERLOGINS_COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        email: user.email,
        loginTime: new Date().toISOString(),
      }
    );
    console.log("✅ User login recorded in Appwrite");
    return res;
  } catch (err) {
    console.error("❌ Failed to record user login:", err);
    throw err;
  }
}
