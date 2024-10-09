import React, { useState, useEffect } from 'react';
import './index.css';

export default function Pokedex({ filters }) {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setShowModal(true);
  };

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

  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  

  return (
    <div className='pokedex-container'>
      <div className='pokedex'>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map(pokemon => (
            <div key={pokemon.id} className='pokemon-card' onClick={() => handleCardClick(pokemon)}>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3>{pokemon.name}</h3>
              <p>ID: {pokemon.id}</p>
              <div className='pokemon-types'>
                {pokemon.types.map(t => (
                  <span
                    key={t.type.name}
                    className='pokemon-type'
                    style={{ backgroundColor: typeColors[t.type.name] }}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Carregando Pokémons...</p>
        )}
      </div>

      {showModal && selectedPokemon && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setShowModal(false)}>&times;</span>
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <p>ID: {selectedPokemon.id}</p>
          <p>Altura: {selectedPokemon.height}</p>
          <p>Peso: {selectedPokemon.weight}</p>
          <p>Habilidades: {selectedPokemon.abilities.map(a => a.ability.name).join(', ')}</p>
          <p>Estatísticas: {selectedPokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</p>
        </div>
      </div>
      )}
    </div>
  );
}
