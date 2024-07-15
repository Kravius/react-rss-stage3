import {
  Outlet,
  Link,
  // useLoaderData,
  // Form,
  // redirect,
  // NavLink,
  // useNavigation,
  // useSubmit,
} from 'react-router-dom';
import { Planet } from '../Header/Header';
import StylesMain from './main.module.css';

import React from 'react';

interface Props {
  searchResults: Planet[];
  children?: React.ReactNode;
}

export const Main: React.FC<Props> = ({ children, searchResults }) => {
  const renderResults = (searchResults: Planet[]) => {
    {
      return searchResults.map((planets: Planet) => (
        <li key={planets.name}>
          <Link to={`${planets.name}`}>{planets.name}</Link>
        </li>
      ));
    }
  };

  return (
    <>
      <main>
        <div className={StylesMain['main']}>
          <h2 className={StylesMain['title-main']}>Результаты поиска:</h2>
          <ul>{renderResults(searchResults)}</ul>
          {children}
        </div>
        <div
          id="detail"
          className={`${StylesMain['detail']}`}
          // className={navigation.state === 'loading' ? 'loading' : ''}
        >
          <Outlet />
        </div>
      </main>
    </>
  );
};
