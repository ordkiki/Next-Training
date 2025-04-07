"use client";
import React, { useState } from 'react';
import axios from 'axios';

interface User {
  Id: number;
  Nom: string;
  Email: string;
  Telephone?: string;
  Avatar?: string;
}

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSuccess: (updatedUser: User) => void;
  apiUrl?: string;
}

function EditUserModal({ user, onClose, onSuccess, apiUrl }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    nom: user.Nom || "",
    email: user.Email || "",
    Avatar: user.Avatar || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/utilisateurs/update/${user.Id}`, {
        Nom: formData.nom,
        Email: formData.email,
        Avatar: formData.Avatar
      });
      
      onSuccess(response.data); // Appelle la fonction de succès du parent
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Échec de la mise à jour");
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='w-[50vw] h-[70vh] bg-white flex justify-center items-center shadow rounded-2xl'>
        <form onSubmit={handleSubmit} className="h-fit p-4 border w-[28vw] rounded">
          <h1 className="font-bold mb-4">Mise à jour de l'utilisateur</h1>

          <div className="mb-4">
            <input
              type="text"
              name="nom"
              className="border w-full p-2 rounded-lg"
              placeholder="Nom d'utilisateur"
              onChange={handleChange}
              value={formData.nom}
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Adresse email"
              className="border w-full p-2 rounded-lg"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="Avatar"
              placeholder="Avatar"
              className="border w-full p-2 rounded-lg"
              onChange={handleChange}
              value={formData.Avatar}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 hover:bg-gray-200 transition cursor-pointer rounded-lg text-gray-600 p-2 border border-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 hover:bg-blue-600 hover:text-white transition cursor-pointer rounded-lg text-blue-600 p-2 border border-blue-600"
            >
              Mettre à jour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;