import React, { useState, useEffect } from 'react';
import './index.css';

export default function Filter({ onFilterChange }) {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGenerations, setSelectedGenerations] = useState([]);

  const types = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
  const generations = ['1', '2', '3', '4', '5', '6', '7', '8'];

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
        {types.map((type) => (
          <div key={type}>
            <input 
              type='checkbox'
              id={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleTypeChange(type)}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>
      <div className='gen'>
        <h4>Gerações</h4>
        {generations.map((generation) => (
          <div key={generation}>
            <input 
              type='checkbox'
              id={generation}
              checked={selectedGenerations.includes(generation)}
              onChange={() => handleGenerationChange(generation)}
            />
            <label htmlFor={generation}>Geração {generation}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
