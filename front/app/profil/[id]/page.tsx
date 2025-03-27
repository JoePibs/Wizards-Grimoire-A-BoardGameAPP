"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useRouter } from 'next/navigation';
import ProfileForm from '@/app/components/profileForm';

interface UserProfile {
  id: number;
  email: string;
  pseudo: string;
  country: string;
  bio: string;
  is_game_master: boolean;
}

const ProfilePage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isHydrated, logout } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    pseudo: '',
    country: '',
    bio: ''
  });

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      if (!user?.token) {
        setError('Utilisateur non connecté');
        return;
      }

      try {
        const response = await axios.post('http://localhost:3002/users/profile', {}, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setProfile(response.data);
        setFormData({
          pseudo: response.data.pseudo || '',
          country: response.data.country || '',
          bio: response.data.bio || ''
        });
      } catch (err) {
        console.error(err);
        setError('Erreur lors du chargement du profil');
      }
    };

    fetchProfile();
  }, [isHydrated, isAuthenticated, user, router]);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3002/users/${profile?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setProfile(prev => prev ? { ...prev, ...formData } : null);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  if (!isHydrated) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Chargement du profil...</div>;

  return (
    <div className="p-6 max-w-md mx-auto bg-black rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold">Mon Profil</h1>
      <p><strong>ID :</strong> {profile.id}</p>
      <p><strong>Email :</strong> {profile.email}</p>
      <p><strong>Nom d'utilisateur :</strong> {profile.pseudo}</p>
      <p><strong>Pays :</strong> {profile.country}</p>
      <p><strong>Bio :</strong> {profile.bio}</p>

      <div className="flex gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Modifier
        </button>
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Déconnexion
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ProfileForm
            formData={formData}
            onChange={(field, value) => setFormData({ ...formData, [field]: value })}
            onCancel={() => setShowModal(false)}
            onSubmit={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

