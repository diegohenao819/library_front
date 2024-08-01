

// Tipo para Libros
export interface Book {
    id: number;
    title: string;
    author: string;
    image: string;
  }
  
  // Tipo para Préstamos
  export interface Loan {
    id: number;
    userId: number;
    bookId: number;
    loanDate: string;
    returnDate: string | null;
  }
  
  // Tipo para Usuarios
  export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  // Tipo para el Contexto de Búsqueda
  export interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }
  
  // Tipo para el Contexto de Autenticación
  export interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
  }
  