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
        <div key={person.name}>
          <h3>{person.name}</h3>
          <p>
            Height: {person.height}, Mass: {person.mass}, Birth Year:{' '}
            {person.birth_year}
          </p>
        </div>
      ));
    }
  };

  return (
    <main className={StylesMain['main']}>
      <h2 className={StylesMain['title-main']}>Результаты поиска:</h2>
      {renderResults(searchResults)}
    </main>
  );
};
