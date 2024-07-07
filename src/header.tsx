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
}

class SearchPage extends Component<object, State> {
  state: State = {
    searchTerm: '',
    searchResults: [],
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState(
        { searchTerm: savedSearchTerm.trim() },
        this.fetchSearchResults
      );
    } else {
      this.fetchAllItems();
    }
  }

  componentDidUpdate(prevState: State) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      localStorage.setItem('searchTerm', this.state.searchTerm.trim());
    }
  }

  fetchAllItems = () => {
    fetch('https://swapi.dev/api/people/')
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
      });
  };

  fetchSearchResults = () => {
    const { searchTerm } = this.state;
    if (searchTerm === '') {
      this.fetchAllItems();
    } else {
      fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
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
        });
    }
  };

  handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchButtonClick = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.fetchSearchResults();
  };

  render() {
    const { searchTerm, searchResults } = this.state;
    return (
      <>
        <header className="header">
          <form onSubmit={this.handleSearchButtonClick}>
            <input
              className="search-input"
              type="text"
              value={searchTerm}
              onChange={this.handleSearchInputChange}
              placeholder="Введите поисковый запрос"
            />
            <button className="searchBTN" type="submit">
              Поиск
            </button>
          </form>
        </header>
        {(searchResults.length >= 1 && (
          <Main searchResults={searchResults}></Main>
        )) || <h1 className="title-main">Nothing found for your search</h1>}
      </>
    );
  }
}

export default SearchPage;
