"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Navbar from "@/components/navbar/Navbar";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface user {
  id?: number;
  nom?: string;
  email?: string;
  telephone?: string;
}

export default function Page() {
  const [userData, setUserData] = useState<user[]>([]);
  useEffect(() => {
    const FetchUser = async () => {
      try {
        const res = await axios.post("http://localhost:5000/user");
        setUserData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchUser();
  }, [userData]);

  return (
    <div>
      <Navbar></Navbar>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nom d'utilisateurs</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Adresse Email</TableHead>
            <TableHead className="text-right">Telephone</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* {userData.map((index, data) => (
            <TableRow key={data.id_user}>
              <TableCell className="font-medium">
                {data.nom}
              </TableCell>
              <TableCell>{data.id_user}</TableCell>
              <TableCell>{data.email}</TableCell>
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
          ))} */}

          <TableRow>
            <TableCell className="font-medium">data.nom</TableCell>
            <TableCell>id_user</TableCell>
            <TableCell>email</TableCell>
            <TableCell className="text-right">telephone</TableCell>
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
        </TableBody>
      </Table>
    </div>
  );
}
