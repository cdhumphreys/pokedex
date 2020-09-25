import React from 'react'
import Link from 'next/link';

const PokeCard = ({ pokemon }) => {
  const { image, name, url, pokedexId } = pokemon;
  return (
    <div className="p-4 border-blue-300 my-2 border-2 bg-gray-200 rounded-md">
      <Link href={`/pokemon?id=${pokedexId}`}>
        <a className="flex items-center text-lg">
          <img className="w-50 h-20" src={image} alt={name} />
          <h3 className="mx-2 text-gray-600">#{pokedexId}</h3>
          <h2 className="capitalize">{name}</h2>
        </a>
      </Link>
      <h4 className="mt-4">
        <a className="flex items-center text-blue-600" href={url}>Link to pokedex <svg class="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
</svg></a>
      </h4>
    </div>
  )
}

export default PokeCard;
