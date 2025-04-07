"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";
import { Input } from "@/components/ui/input";
import Edit from "../../components/edit_user/edit_user";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface user {
  Id?: number;
  Nom?: string;
  Email?: string;
  Telephone?: string;
}
const api_url = process.env.NEXT_PUBLIC_SERVER_ENV_API;

export default function Page() {
  const [editingUser, setEditingUser] = useState<user | null>(null);
  const HandleFilterUser = async (ID: number) => {
    try {
      const res = await axios.put(`http://localhost:5000/user/update/${ID}`);
      if (res.status === 200)
        setUserData((prevUsers) => prevUsers.filter((user) => user.id !== ID));
      console.log("Edition reussi");
    } catch (error) {
      console.log(error);
    }
  };
  const HandleUpdate = () => async (ID: number) => {
    try {
      const res = await axios.put<user>(
        `http://localhost:5000/user/update/${ID}`
      );
      if (res.status === 200)
        setUserData((prevUsers) => prevUsers.filter((user) => user.id !== ID));
      console.log("Edition reussi");
    } catch (error) {
      console.log(error);
    }
  };
  const HandleDelete = async (ID: number) => {
    if (confirm("Voulez-vous vraiment supprimer ?")) {
      try {
        await axios.delete(`http://localhost:5000/user/delete/${ID}`);
        setUserData((prevUsers) => prevUsers.filter((user) => user.id !== ID));
      } catch (error) {
        console.log(error);
      }
      console.log("suppression Réussi");
    }
  };
  const [userData, setUserData] = useState<user[]>([]);
  useEffect(() => {
    const FetchUser = async () => {
      try {
        const res = await axios.get<user[]>(
          `${api_url}/api/utilisateurs/listes`
        );
        setUserData(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchUser();
  }, []);

  return (
    <div className="">
      <div className="p-8 ">
        <div className="mb-4 flex justify-between">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">ID</SelectItem>
              <SelectItem value="nom">Nom</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex">
            <Input
              type="text"
              placeholder="rechercher l'utilisateur"
              name="search"
              className="w-[25vw] border rounded-none outline-none"
            />
            <button className="p-1 border hover:bg-blue-600 text-blue-600 hover:border-blue-600 hover:text-white transition border-blue-600 ">
              rechercher
            </button>
          </div>
        </div>
        <Table>
          <TableCaption>Ajoutez plus d'utilisateurs</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nom d'utilisateurs</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Adresse Email</TableHead>
              <TableHead className="text-right">Telephone</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          {userData.map((data, index) => (
            <TableRow key={data.Id ?? index}>
              <TableCell className="font-medium">{data.Nom}</TableCell>
              <TableCell>{data.Id}</TableCell>
              <TableCell>{data.Email}</TableCell>
              <TableCell className="text-right">{data.telephone}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    aria-label="Modifier"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Supprimer"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>

      {editingUser && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.2)]">
          <Edit></Edit>
        </div>
      )}
    </div>
  );
}
