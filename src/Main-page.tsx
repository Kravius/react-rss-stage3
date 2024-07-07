import { Component } from 'react';
import { Person } from './header';

interface Props {
  searchResults: Person[];
}

export class Main extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { searchResults } = this.props;
    return (
      <main className="main">
        <h2 className="title-main">Результаты поиска:</h2>
        {searchResults.map((person: Person) => (
          <div key={person.name}>
            <h3>{person.name}</h3>
            <p>
              Height: {person.height}, Mass: {person.mass}, Birth Year:{' '}
              {person.birth_year}
            </p>
          </div>
        ))}
      </main>
    );
  }
}
