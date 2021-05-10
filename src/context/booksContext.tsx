import React, { createContext, ReactElement, useState } from 'react';
import { BookDataProps, BooksContextProps, LayoutProps } from '../types';
import api from '../services/api';

export const BooksContext = createContext<BooksContextProps>({} as BooksContextProps);
//Provider criado para testar o uso de context
export const BooksProvider = ({ children }: LayoutProps): ReactElement => {
  const [booksData, setBooksData] = useState<BookDataProps[]>([]);

  const handleGetBooks = async (searchTerm: string, maxResults = 15) => {
    console.log('handleGetBooks-entrou',searchTerm)
    const { data } = await api.get(`${searchTerm}&maxResults=${maxResults}`);
    const books = data.items;

    const filteredBooks = books.filter(
      (book: BookDataProps) => book.volumeInfo.imageLinks,
    );

    setBooksData(filteredBooks);
  };

  return (
    <BooksContext.Provider
      value={{
        booksData,
        handleGetBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};
