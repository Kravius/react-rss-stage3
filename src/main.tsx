import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/404/404.tsx';
import SearchPage, {
  loader as searchLoader,
  action as searchAction,
} from './components/Header/Header.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    loader: searchLoader,
    action: searchAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'planets/',
            element: <SearchPage />,
            loader: searchLoader,
            action: searchAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
