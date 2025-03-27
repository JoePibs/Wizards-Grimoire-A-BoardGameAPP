import React from 'react';

interface ProfileFormProps {
  formData: {
    pseudo: string;
    country: string;
    bio: string;
  };
  onChange: (field: string, value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ formData, onChange, onCancel, onSubmit }) => {
  return (
    <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
      <h2 className="text-lg font-semibold">Modifier mon profil</h2>

      <div>
        <label className="block bg-black text-sm font-medium">Pseudo</label>
        <input
          type="text"
          value={formData.pseudo}
          onChange={(e) => onChange('pseudo', e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Pays</label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => onChange('country', e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Annuler
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
