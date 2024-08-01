"use client";

import React, { useEffect, useState } from "react";
import Books from "@/components/Books";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const router = useRouter();

  console.log(user);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://my-express-app-chi.vercel.app/api/books"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);




  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const handleLogout = () => {
    logout();
    router.push("/");

  }
  return (
    <>
      <nav className="flex w-full justify-end  flex-1 shrink">
        <ul className="mt-5 mr-5 gap-8">
           <Button variant="destructive" onClick={handleLogout} >
             <li>Log out</li>
           </Button>
        </ul>
      </nav>
      <div className="max-w-[500px] flex m-auto mb-8">
        <SearchBar />
      </div>
      <Books books={books} />
      {children}
    </>
  );
};

export default Layout;
