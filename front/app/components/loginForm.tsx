'use client'
import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const LoginForm: React.FC<{ setIsModalOpen: (value: boolean) => void }> = ({ setIsModalOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/auth/login', {
        email,
        password
      });

      if (response.data.token && response.data.userId) {
        login(response.data.token, response.data.userId);
        setMessage('Connexion réussie');
        setIsModalOpen(false); // Ferme la modal après connexion réussie
      } else {
        setMessage('Identifiants incorrects');
      }
    } catch (error: any) {
      if (error.response) {
        setMessage('Erreur lors de la connexion : ' + error.response.data.message || 'Erreur serveur');
      } else if (error.request) {
        setMessage('Erreur lors de la connexion : Pas de réponse du serveur');
      } else {
        setMessage('Erreur lors de la connexion');
      }
    }
  };

  const closeModal = () => {
    setEmail('');
    setPassword('');
    setMessage('');
    setIsModalOpen(false); // Ferme la modal
  };

  return (
    <>
      <div className="bg-[#0a0a1a] w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg relative border-[6px] border-[#0a0a1a]">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-center text-white">Se connecter</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#efc066] text-black font-semibold rounded-lg shadow-md hover:bg-black hover:text-[#efc066] hover:border-2 hover:border-[#efc066] hover:shadow-[0_2px_5px_#efc066] focus:outline-none focus:ring-2 focus:ring-[#efc066] focus:ring-offset-2"

            >
              Se connecter
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes('réussie') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default LoginForm;
