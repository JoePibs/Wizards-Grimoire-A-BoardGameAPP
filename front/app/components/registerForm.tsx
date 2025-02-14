'use client'
import { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const RegisterForm: React.FC<{ setIsModalOpen: (value: boolean) => void }> = ({ setIsModalOpen }) =>{
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpenState, setIsModalOpenState] = useState(true);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }
    console.log(email, firstName, lastName, pseudo, password)
    try {
      const response = await axios.post('http://localhost:3002/auth/register', {
        email : email,
        first_name: firstName,
        last_name: lastName,
        pseudo: pseudo,
        password: password
      });
      if(response.data.userId){
        const response = await axios.post('http://localhost:3002/auth/login', {
            email : email,
            password: password
          });
          if (response.data.token && response.data.userId) {
            login(response.data.token, response.data.userId);
            setMessage('Connexion réussie');
            setIsModalOpen(false); 
          }
      }

    } catch (error: any) {
      if (error.response) {
        setMessage('Erreur lors de l\'inscription : ' + error.response.data.message || 'Erreur serveur');
      } else if (error.request) {
        setMessage('Erreur lors de l\'inscription : Pas de réponse du serveur');
      } else {
        setMessage('Erreur lors de l\'inscription');
      }
    }
  };

  return (
    <>
      {/* Modal */}
      {isModalOpenState && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-black w-full max-w-md p-8 space-y-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-center text-black-700">S'inscrire</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black-600">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-black-600">
                  Prénom
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-black-600">
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label htmlFor="pseudo" className="block text-sm font-medium text-black-600">
                  Pseudo
                </label>
                <input
                  id="pseudo"
                  type="text"
                  placeholder="Pseudo"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black-600">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black "
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-black-600">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black "
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#efc066] text-black font-semibold rounded-lg shadow-md hover:bg-black hover:text-[#efc066] hover:border-2 hover:border-[#efc066] hover:shadow-[0_2px_5px_#efc066] focus:outline-none focus:ring-2 focus:ring-[#efc066] focus:ring-offset-2"

                  >
                  S'inscrire
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
        </div>
      )}
    </>
  );
};

export default RegisterForm;
