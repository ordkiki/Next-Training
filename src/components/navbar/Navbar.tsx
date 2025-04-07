'use client';

import { usePathname } from 'next/navigation'; // Utilisez usePathname au lieu de useRouter
import Link from 'next/link';

type NavItem = {
  nom: string;
  path: string;
};

export default function Navbar() {
  const pathname = usePathname(); // Utilisez usePathname pour vérifier le chemin actuel

  const navItems: NavItem[] = [
    { nom: "Créer", path: "/create" },
    { nom: "Lister", path: "/liste" },
  ];

  return (
    <div className="flex justify-between items-center w-screen h-fit p-4 border">
      <h1 className="text-blue-600 font-semibold">CRUD</h1>
      <ul className="flex justify-between items-center">
        {navItems.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`mx-4 px-2 py-1 rounded ${
                pathname === link.path
                  ? "  font-bold"
                  : " hover:scale-[1] transition"
              }`}
            >
              {link.nom}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}