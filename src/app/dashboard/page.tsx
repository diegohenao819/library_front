"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-token`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true);
          } else {
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error("Invalid token", error);
          router.push("/login");
        });
    }
  }, [router]);

  return isAuthenticated ? (
    <div>
     
      
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Dashboard;
