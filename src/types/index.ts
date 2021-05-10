import { ReactNode } from 'react';
import { Animated } from 'react-native';

export type LayoutProps = {
  children: ReactNode;
};

export type IParams = {
  List: {
    searchTerm: string;
  };
  Details: {
    bookId: string;
    children: string
  };
};

export type SubjectProps = {
  title: string;
  id: number;
};

export type BookProps = {
  imageUrl: string;
  bookId: string;
};

export type BookDataProps = {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    authors: string[];
    pageCount: number;
    averageRating: number;
    imageLinks: {
      thumbnail: string;
    };
  };
  saleInfo: {
    saleability: string;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
  };
};

export type IUseScrollAnimation = {
  translateX: Animated.AnimatedInterpolation;
  opacityAnimation: Animated.AnimatedInterpolation;
  scrollY: Animated.Value;
};

export type BooksContextProps = {
  booksData: BookDataProps[];
  handleGetBooks(searchTerm: string, maxResults?: number): Promise<void>;
};
