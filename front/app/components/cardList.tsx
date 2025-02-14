
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './card';

interface CardData {
  name: string;
  short_description: string;
  image: string;
  editors: [];
  illustrators : [];
  themes : [];
  mechanics : [];
  min_age : number;
  min_player : number;
  max_player : number ;
}

const CardList = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get<CardData[]>('http://localhost:3002/games/fr'); 
        setCards(response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des cartes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []); 

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    
    <div>
        <h1 className="text-xl font-bold text-gray-1500 dark:text-white">LES JEUX</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <Card
              key={index} 
              name={card.name}
              short_description={card.short_description}
              image={card.image}
              editors={card.editors}
              illustrators={card.illustrators}
              themes={card.themes}
              mechanics={card.mechanics}
              min_age={card.min_age}
              min_player={card.min_player}
              max_player={card.max_player}
            />
          ))}
      </div>
    </div>
  );
};

export default CardList;
