// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // Расширение для expect
// import ErrorPage from './404';
// import { vi, test } from 'vitest';

// // Мокаем хук useRouteError
// vi.mock('react-router-dom', () => ({
//   useRouteError: () => ({
//     statusText: 'Not Found',
//     message: 'This page could not be found.',
//   }),
// }));

// test('ErrorPage displays the correct 404 message', () => {
//   render(<ErrorPage />);

//   expect(screen.getByText('404')).toBeInTheDocument();
//   expect(
//     screen.getByText('Sorry, an unexpected error has occurred.')
//   ).toBeInTheDocument();
//   expect(screen.getByText('Not Found')).toBeInTheDocument();
//   expect(screen.getByText('This page could not be found.')).toBeInTheDocument();
// });
