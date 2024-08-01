"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Book, Loan } from "@/lib/types";
import { useSearchContext } from "@/context/SearchContext";

interface BooksProps {
  books: Book[];
}

const Books = ({ books }: BooksProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [loans, setLoans] = useState<Loan[]>([]);
  const { searchQuery } = useSearchContext()!;

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/loans`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error('Error fetching loans:', error);
        setError(null);
      }
    };

    fetchLoans();
  }, []);

  const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleReserve = async (bookId: number) => {
    if (!user) {
      setError('Debes estar autenticado para reservar un libro.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const loanDate = new Date().toISOString();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/loans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId, userId: user.userId, loanDate }), // Asegúrate de usar user.userId
      });

      if (!response.ok) {
        throw new Error('Failed to reserve book');
      }

      const data: Loan = await response.json();
      console.log('Reserva exitosa:', data);
      toast.success('Reserva exitosa');
      setLoans([...loans, data]);
    } catch (error) {
      console.error('Error reservando el libro:', error);
      setError('Failed to reserve book');
      toast.error('Error reservando el libro');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (bookId: number) => {
    if (!user) {
      setError('Debes estar autenticado para retornar un libro.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/loans`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookId, userId: user.userId }), // Asegúrate de usar user.userId
      });

      if (!response.ok) {
        throw new Error('Failed to return book');
      }

      const data = await response.json();
      console.log('Retorno exitoso:', data);
      toast.success('Retorno exitoso');
      setLoans(loans.filter(loan => loan.bookId !== bookId || loan.userId !== user.userId));
    } catch (error) {
      console.error('Error retornando el libro:', error);
      setError('Failed to return book');
      toast.error('Error retornando el libro');
    } finally {
      setLoading(false);
    }
  };

  const isBookLoaned = (bookId: number) => {
    return loans.some(loan => loan.bookId === bookId && loan.userId === user?.userId); // Asegúrate de usar user.userId
  };

  return (
    <div className="max-w-[800px] mx-auto">
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id} className="flex flex-col items-center justify-center">
            <section
              className={cn(
                "flex justify-center items-center bg-white border-b w-full h-[75px] cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition"
              )}
            >
              <Image src={book.image} alt={book.title} width={50} height={50} className="object-fill" />
              <div className="w-[50%] flex flex-col items-center">
                <h2 className="font-bold">{book.title}</h2>
                <p className="text-sm">{book.author}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  className="bg-green-800"
                  onClick={() => handleReserve(book.id)}
                  disabled={loading || isBookLoaned(book.id)}
                >
                  {loading ? 'Reservando...' : 'Reservar'}
                </Button>
                {isBookLoaned(book.id) ? (
                  <Button 
                    className="" 
                    onClick={() => handleReturn(book.id)}
                    disabled={loading}
                  >
                    {loading ? 'Retornando...' : 'Retornar'}
                  </Button>
                ) : (
                  <Button 
                    className="invisible" 
                    onClick={() => handleReturn(book.id)}
                    disabled
                  >
                    Retornar
                  </Button>
                )}
              </div>
            </section>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Books;
