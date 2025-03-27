'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardData } from '@/app/types/game';

export default function GamePage() {
  const params = useParams();
  const [game, setGame] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/games/${params.id}`);
        setGame(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du jeu:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchGame();
    }
  }, [params.id]);

  if (loading) return <div>Chargement...</div>;
  if (!game) return <div>Jeu non trouvé</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{game.name}</h1>
      
      {game.image && (
        <img src={game.image} alt={game.name} className="w-full max-w-lg mb-4" />
      )}
      
      <p className="mb-4">{game.long_description}</p>

      {game.video_link && (
        <video src={game.video_link} controls className="w-full max-w-lg mb-4"></video>
      )}

      <p>Éditeurs: {game.editors?.map((editor) => editor.name).join(', ') || 'Non renseigné'}</p>
      <p>Illustrateurs: {game.illustrators?.map((illustrator) => illustrator.name).join(', ') || 'Non renseigné'}</p>
      <p>Thèmes: {game.themes?.map((theme) => theme.name).join(', ') || 'Non renseigné'}</p>
      <p>Mécaniques: {game.mechanics?.map((mechanic) => mechanic.name).join(', ') || 'Non renseigné'}</p>
      <p>Âge minimum: {game.min_age ? `${game.min_age} ans` : 'Non renseigné'}</p>
      <p>Joueurs: {game.min_player && game.max_player ? `${game.min_player} à ${game.max_player}` : 'Non renseigné'}</p>
      <p>Prix: {game.price ? `${game.price} €` : 'Non renseigné'}</p>
    </div>
  );
}
