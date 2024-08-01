import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useSearchContext } from "@/context/SearchContext"; // Importa el contexto de búsqueda

const Books = ({ books }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [loans, setLoans] = useState([]);
  const { searchQuery } = useSearchContext(); // Obtén la consulta de búsqueda del contexto

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/loans`);
      const data = await response.json();
      setLoans(data);
    };

    fetchLoans();
  }, []);

  const handleReserve = async (bookId) => {
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
        body: JSON.stringify({ bookId, userId: user.userId, loanDate }),
      });

      if (!response.ok) {
        throw new Error('Failed to reserve book');
      }

      const data = await response.json();
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

  const handleReturn = async (bookId) => {
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
        body: JSON.stringify({ bookId, userId: user.userId }),
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

  const isBookLoaned = (bookId) => {
    return loans.some(loan => loan.bookId === bookId && loan.userId === user?.userId);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[800px] mx-auto  ">
      <ul>
        {filteredBooks.map((book) => {
          return (
            <li key={book.id} className="flex flex-col items-center justify-center">
              <section
                className={cn(
                  "flex justify-center items-center bg-white border-b  w-full h-[75px] cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition"
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
                  ) :
                  <Button 
                      className="invisible" 
                      onClick={() => handleReturn(book.id)}
                      disabled
                    >
                      Retornar
                    </Button>
                 
               

                  }
               </div>
              </section>
            </li>
          );
        })}
      </ul>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Books;