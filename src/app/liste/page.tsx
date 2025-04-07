"use client";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Input } from "@/components/ui/input";
import EditUserModal from "../../components/edit_user/edit_user";
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

interface User {
  Id: number;
  Nom: string;
  Email: string;
  Avatar?: string;
}

const api_url = process.env.NEXT_PUBLIC_SERVER_ENV_API;

export default function Liste() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${api_url}/api/utilisateurs/listes`);
      setUsers(res.data.data);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
    
    try {
      await axios.delete(`${api_url}/api/utilisateurs/delete/${id}`);
      setUsers(prev => prev.filter(user => user.Id !== id));
    } catch (err) {
      setError("Failed to delete user");
      console.error(err);
    }
  };
  const handleUpdateSuccess = (updatedUser: User) => {
    setUsers(prevUsers => 
      prevUsers.map(user => user.Id === updatedUser.Id ? updatedUser : user)
    );
    setEditingUser(null); // Ferme le modal après la mise à jour
  };



  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-4 flex justify-between">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Id">ID</SelectItem>
            <SelectItem value="Nom">Nom</SelectItem>
            <SelectItem value="Email">Email</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex">
          <Input
            type="text"
            placeholder="Rechercher l'utilisateur"
            className="w-[25vw] border rounded-none outline-none"
          />
          <button className="p-1 border hover:bg-blue-600 text-blue-600 hover:border-blue-600 hover:text-white transition border-blue-600">
            Rechercher
          </button>
        </div>
      </div>

      <Table>
        <TableCaption>Liste des utilisateurs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Avatar</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.Id}>
              <TableCell>{user.Nom}</TableCell>
              <TableCell>{user.Id}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell className="text-right">
                {user.Avatar ? "Yes" : "No"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    aria-label="Modifier"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.Id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Supprimer"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingUser && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] bg-opacity-50 flex justify-center items-center">
          <EditUserModal
            user={editingUser}
            onClose={() => setEditingUser(null)}
            onSuccess={handleUpdateSuccess}
            apiUrl={api_url}
          />
        </div>
      )}
    </div>
  );
}