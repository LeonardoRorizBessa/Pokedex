import React from 'react'
import './index.css'
import pokeballLogo from '../../assets/pokeball.png'
import pokemonLogo from '../../assets/pokemon.png'
import profileImage from '../../assets/profile.png'

export default function Header() {
  return (
    <div className='header'>
      <a href='#header'>
        <img className='img-pokeball' src={pokeballLogo} alt='Pokeball' />
      </a>
      <a href='#header'>
        <img className='img-pokemon' src={pokemonLogo} alt='Pokemon' />
      </a>
      <a href='#login'>
        <img className='img-profile' src={profileImage} alt='Profile' />
      </a>
    </div>
  )
}
