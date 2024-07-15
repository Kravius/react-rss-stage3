import { Planet } from '../Header/Header';

const makeDataPerson = (data: { results: Planet[] }): Planet[] => {
  return data.results.map((planets: Planet) => ({
    name: planets.name,
    rotation_period: planets.rotation_period,
    orbital_period: planets.orbital_period,
    climate: planets.climate,
    gravity: planets.gravity,
    population: planets.population,
  }));
};

export const fetchSearchResults = async (
  searchTerm: string
): Promise<Planet[]> => {
  try {
    const response = await fetch(
      `https://swapi.dev/api/planets/?search=${searchTerm}`
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

export const fetchAllItems = async (page: number): Promise<Planet[]> => {
  try {
    const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    if (response.ok) {
      const data = await response.json();
      return makeDataPerson(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return [];
};
