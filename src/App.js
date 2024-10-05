import React, { useState } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header/index.jsx'
import Filter from './components/Filter/index.jsx'
import Pokedex from './components/Pokedex/index.jsx'

function App() {
  const [filters, setFilters] = useState({
    search: '',
    selectedTypes: [],
    selectedGenerations: []
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-header col-12'>
          <Header />
        </div>
      </div>
      <div className='row'>
        <div className='col-filter col-2'>
          <Filter onFilterChange={handleFilterChange}/>
        </div>
        <div className='col-pokedex col-10'>
          <Pokedex filters={filters}/>
        </div>
      </div>
    </div>
  );
}

export default App;
