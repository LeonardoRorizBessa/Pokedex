import React, { useState, useEffect } from 'react';
import './index.css';

export default function Filter({ onFilterChange }) {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenerations, setSelectedGenerations] = useState([]);

  const types = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Bug', 'Psychic', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
  const generations = ['1', '2', '3', '4', '5', '6', '7', '8'];

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

  useEffect(() => {
    handleFilterChange();
  }, [search, selectedTypes, selectedGenerations]);

  const handleFilterChange = () => {
    onFilterChange({
      search,
      selectedTypes,
      selectedGenerations,
    });
  };

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleGenerationChange = (generation) => {
    if (selectedGenerations.includes(generation)) {
      setSelectedGenerations(selectedGenerations.filter(g => g !== generation));
    } else {
      setSelectedGenerations([...selectedGenerations, generation]);
    }
  };

  return (
    <div className='filter'>
      <div className='tittle-filter'>
        <h3>Filtro</h3>
      </div>
      <div className='search'>
        <input 
          type='text'
          placeholder='Buscar por Nome ou ID'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='type'>
        <h4>Tipos</h4>
        <div className='type-buttons'>
          {types.map((type) => (
            <button
              key={type}
              className={`type-button ${selectedTypes.includes(type) ? 'selected' : ''}`}
              onClick={() => handleTypeChange(type)}
              style={{ backgroundColor: typeColors[type.toLowerCase()], color: 'white' }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div className='gen'>
        <h4>Gerações</h4>
        <div className='gen-buttons'>
          {generations.map((generation) => (
            <button
              key={generation}
              className={`gen-button ${selectedGenerations.includes(generation) ? 'selected' : ''}`}
              onClick={() => handleGenerationChange(generation)}
              style={{ backgroundColor: '#888888', color: 'white' }}
            >
              Gen {generation}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
