"use client"; // Ajoutez cette directive en haut du fichier

import Navbar from "@/components/navbar/Navbar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface FormData {
  nom?: string;
  email?: string;
  Avatar?: string;
}
const api_url = process.env.NEXT_PUBLIC_SERVER_ENV_API;

export default function Page() {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center w-screen h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="h-fit p-4 border w-[28vw] rounded"
        >
          <h1 className="font-bold mb-4">
            Insertion dans la liste d'utilisateurs :
          </h1>

          <div className="mb-4">
            <input
              type="text"
              name="nom"
              className="border w-[25vw] p-2 rounded-lg"
              placeholder="nom d'utilisateur"
              onChange={handleChange}
              value={formData.nom || ""}
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="adresse email"
              className="mb-4 border w-[25vw] p-2 rounded-lg"
              onChange={handleChange}
              value={formData.email || ""}
            />
          </div>
          <div className="">
            <input
              type="telephone"
              name="telephone"
              placeholder="telephone"
              className="mb-4 border w-[25vw] p-2 rounded-lg"
              onChange={handleChange}
              value={formData.telephone || ""}
            />
          </div>

          <button
            type="submit"
            className="hover:bg-blue-600 hover:text-white transition cursor-pointer w-[25vw] rounded-lg text-blue-600 p-2 border border-blue-600 text-[12px]"
          >
            Inserer
          </button>
        </form>
      </div>
    </div>
  );
}
