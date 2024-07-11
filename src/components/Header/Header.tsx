import StylesHeader from './header.module.css';

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  FC,
  useCallback,
} from 'react';
import { Main } from '../Main/Main-page';
import useSearchQuery from '../CustomHooks/useSearchQuery';
import { fetchAllItems, fetchSearchResults } from '../API/API';

export interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

const SearchPage: FC = () => {
  const { value: searchTerm, setValue: setSearchTerm } = useSearchQuery(
    'searchTerm',
    ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = searchTerm
        ? await fetchSearchResults(searchTerm)
        : await fetchAllItems();
      setSearchResults(result);
    } catch (error) {
      console.error('Oops');
    } finally {
      setIsLoading(false);
    }
  }, [buttonClicked]);

  useEffect(() => {
    fetchData();
  }, [buttonClicked, fetchData]);

  const handleSearchInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(ev.target.value);
  };

  const handleSearchButtonClick = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setButtonClicked(() => {
      return !buttonClicked;
    });
  };

  return (
    <>
      <header className={StylesHeader['header']}>
        <form onSubmit={handleSearchButtonClick}>
          <input
            className={StylesHeader['search-input']}
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Введите имя"
          />
          <button className={StylesHeader['search']} type="submit">
            Поиск
          </button>
        </form>
      </header>

      {(isLoading && <h3>Loading...</h3>) ||
        (searchResults.length >= 1 && (
          <Main searchResults={searchResults}></Main>
        )) || (
          <h1 className={StylesHeader['title-main']}>
            Nothing found for your search
          </h1>
        )}
    </>
  );
};

export default SearchPage;
