import React, { ReactElement } from 'react';
import { LayoutProps } from '../types';

import { BooksProvider } from './booksContext';

const AppProvider = ({ children }: LayoutProps): ReactElement => (
  <BooksProvider>
  </BooksProvider>
);

export default AppProvider;
