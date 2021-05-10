import React, { ReactElement } from 'react';
import { LayoutProps } from '../types';

import { BooksProvider } from './booksContext';
import { FavoriteProvider } from './favoriteBooksContext';

const AppProvider = ({ children }: LayoutProps): ReactElement => (
  <BooksProvider>
    <FavoriteProvider>{children}</FavoriteProvider>
  </BooksProvider>
);

export default AppProvider;
