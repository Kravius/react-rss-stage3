import {
  Outlet,
  // Link,
  // useLoaderData,
  // Form,
  // redirect,
  NavLink,
  // useNavigation,
  // useSubmit,
} from 'react-router-dom';

import StylesMain from './main.module.css';

import React from 'react';
import { Person } from '../Header/Header';

interface Props {
  searchResults: Person[];
  children?: React.ReactNode;
}

export const Main: React.FC<Props> = ({ searchResults }) => {
  const renderResults = (searchResults: Person[]) => {
    {
      return searchResults.map((person: Person) => (
        <li key={person.name}>
          <NavLink to={`people/${person.name}`}>{person.name}</NavLink>
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
