import { Component, ChangeEvent, FormEvent } from 'react';
import { Main } from './Main-page';

export interface Person {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
}

interface State {
  searchTerm: string;
  searchResults: Person[];
  isLoading: boolean;
  counterError: number;
}

class SearchPage extends Component<object, State> {
  state: State = {
    searchTerm: '',
    searchResults: [],
    isLoading: false,
    counterError: 0,
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState(
        { searchTerm: savedSearchTerm.trim() },
        this.fetchSearchResults
      );
    } else {
      this.fetchAItems();
    }
  }

  componentDidUpdate(prevState: State) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      localStorage.setItem('searchTerm', this.state.searchTerm.trim());
    }
  }

  fetchAItems = (searchTerm?: string): void => {
    this.setState({ isLoading: true });
    fetch(
      `https://swapi.dev/api/people/${searchTerm ? '?search=' + searchTerm : ''}`
    )
      .then((response) => response.json())
      .then((data) => {
        const results: Person[] = data.results.map((person: Person) => ({
          name: person.name,
          height: person.height,
          mass: person.mass,
          birth_year: person.birth_year,
        }));
        this.setState({ searchResults: results });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  fetchSearchResults = (): void => {
    const { searchTerm } = this.state;
    if (searchTerm === '') {
      this.fetchAItems();
    } else {
      this.fetchAItems(searchTerm);
    }
  };

  handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchButtonClick = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    this.fetchSearchResults();
  };

  render() {
    const { searchTerm, searchResults, isLoading } = this.state;
    return (
      <>
        <header className="header">
          <form onSubmit={this.handleSearchButtonClick}>
            <input
              className="search-input"
              type="text"
              value={searchTerm}
              onChange={this.handleSearchInputChange}
              placeholder="Введите имя"
            />
            <button className="searchBTN" type="submit">
              Поиск
            </button>
          </form>
        </header>

        {(isLoading && <h3>Loading...</h3>) ||
          (searchResults.length >= 1 && (
            <Main searchResults={searchResults}></Main>
          )) || <h1 className="title-main">Nothing found for your search</h1>}
      </>
    );
  }
}

export default SearchPage;
