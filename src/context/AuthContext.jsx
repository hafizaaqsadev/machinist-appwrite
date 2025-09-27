// import { createContext, useContext, useState, useEffect } from "react";
// import { account } from "../appwrite";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Check current user on mount
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const res = await account.get();
//         setUser(res);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getUser();
//   }, []);

//   // ✅ Logout function
//   const logout = async () => {
//     try {
//       await account.deleteSession("current");
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // ✅ Hook for easy usage
// export const useAuth = () => useContext(AuthContext);

// // import { createContext, useContext, useState, useEffect } from "react";
// // import { account, databases, Query } from "../appwrite";

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [role, setRole] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const getUser = async () => {
// //       try {
// //         const res = await account.get(); // ✅ logged in user
// //         setUser(res);

// //         // ✅ ab role lao Users collection se
// //         const result = await databases.listDocuments(
// //           "YOUR_DATABASE_ID", // apna DB ID
// //           "YOUR_USERS_COLLECTION_ID", // apna collection ID
// //           [Query.equal("userId", res.$id)] // userId match karo
// //         );

// //         if (result.documents.length > 0) {
// //           setRole(result.documents[0].role); // "user" ya "admin"
// //         }
// //       } catch {
// //         setUser(null);
// //         setRole(null);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     getUser();
// //   }, []);

// //   const logout = async () => {
// //     try {
// //       await account.deleteSession("current");
// //       setUser(null);
// //       setRole(null);
// //     } catch (error) {
// //       console.error("Logout failed:", error);
// //     }
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, setUser, role, logout, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import { account, databases, Query } from "../appwrite";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        // Get currently logged-in user
        const res = await account.get();
        setUser(res);

        // Fetch role from Users collection
        const result = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_BOOKING_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERLOGINS_COLLECTION_ID,
          [Query.equal("userId", res.$id)]
        );

        if (result.documents.length > 0) {
          setRole(result.documents[0].role); // "user" or "admin"
        } else {
          setRole("user"); // Default to user if no role found
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setRole(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        role,
        setRole,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
