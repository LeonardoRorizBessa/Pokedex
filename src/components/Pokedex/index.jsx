import React, { useState, useEffect } from 'react';
import './index.css';

export default function Pokedex({ filters }) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898');
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );

      setPokemons(pokemonDetails);
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    let result = pokemons;

    if (filters.search) {
      result = result.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        pokemon.id.toString() === filters.search
      );
    }

    if (filters.selectedTypes && filters.selectedTypes.length > 0) {
      result = result.filter(pokemon =>
        filters.selectedTypes.some(type =>
          pokemon.types.map(t => t.type.name).includes(type.toLowerCase())
        )
      );
    }

    if (filters.selectedGenerations && filters.selectedGenerations.length > 0) {
      result = result.filter(pokemon => {
        const generation = getGenerationById(pokemon.id);
        return filters.selectedGenerations.includes(generation.toString());
      });
    }

    setFilteredPokemons(result);
  }, [filters, pokemons]);

  const getGenerationById = (id) => {
    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    return 8;
  };

  return (
    <div className='pokedex-container'>
      <div className='pokedex'>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map(pokemon => (
            <div key={pokemon.id} className='pokemon-card'>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <p>ID: {pokemon.id}</p>
              <p>{pokemon.types.map(t => t.type.name).join(', ')}</p>
            </div>
          ))
        ) : (
          <p>Carregando Pokémons...</p>
        )}
      </div>
    </div>
  );
}
