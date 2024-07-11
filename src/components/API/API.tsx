import { Person } from '../Header/header';

const makeDataPerson = (data: { results: Person[] }): Person[] => {
  return data.results.map((person: Person) => ({
    name: person.name,
    height: person.height,
    mass: person.mass,
    birth_year: person.birth_year,
  }));
};

export const fetchSearchResults = async (
  searchTerm: string
): Promise<Person[]> => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${searchTerm}`
    );
    if (response.ok) {
      const data = await response.json();
      return makeDataPerson(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return [];
};

export const fetchAllItems = async (): Promise<Person[]> => {
  try {
    const response = await fetch(`https://swapi.dev/api/people/`);
    if (response.ok) {
      const data = await response.json();
      return makeDataPerson(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return [];
};
