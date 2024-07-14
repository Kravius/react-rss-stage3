import StylesHeader from './header.module.css';
import {
  useLoaderData,
  useNavigate,
  // Form,
  redirect,
  LoaderFunctionArgs,
} from 'react-router-dom';
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
import Pagination from '../Button/Pagination/Pagination';

export interface Planet {
  name: string;
  rotation_period?: string;
  orbital_period?: string;
  diameter?: string;
  climate?: string;
  gravity?: string;
  terrain?: string;
  surface_water?: string;
  population?: string;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('searchTerm') || '';
  const currentPage = Number(url.searchParams.get('page')) || 1;
  const { searchResults, isLoading } = await fetchData(searchTerm, currentPage);
  return { searchResults, currentPage, isLoading };
};

const fetchData = async (searchTerm: string, currentPage: number) => {
  console.log(currentPage);
  try {
    const isLoading = true;
    const searchResults = searchTerm
      ? await fetchSearchResults(searchTerm)
      : await fetchAllItems(currentPage);
    return { searchResults, isLoading };
  } catch (error) {
    console.error('Oops', error);
    const isLoading = false;
    const searchResults: Planet[] = [];
    return { searchResults, isLoading };
  }
};

export const action = async () => {
  return redirect('/');
};

const SearchPage: FC = () => {
  const { value: searchTerm, setValue: setSearchTerm } = useSearchQuery(
    'searchTerm',
    ''
  );
  console.log(useLoaderData());
  // const { currentPage } = useLoaderData();
  const [currentPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Planet[]>([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = searchTerm
        ? await fetchSearchResults(searchTerm)
        : await fetchAllItems(currentPage);
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

  const handlePageChange = (page: number) => {
    navigate(`/?searchTerm=${searchTerm}&page=${page}`);
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
          <Main searchResults={searchResults}>
            {
              <Pagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            }
          </Main>
        )) || (
          <h1 className={StylesHeader['title-main']}>
            Nothing found for your search
          </h1>
        )}
    </>
  );
};

export default SearchPage;
