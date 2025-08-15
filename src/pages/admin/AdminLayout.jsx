import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    navigate("/");
  };

  const links = [
    { path: "/admin/dashboard", label: "Painel" },
    { path: "/admin/novo-prato", label: "Novo Prato" },
    { path: "/admin/ver-ementa", label: "Ver Ementa" },
  ];

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar Desktop */}
      <motion.aside
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-64 bg-gray-900 text-white p-6 flex-col justify-between hidden sm:flex"
      >
        <div>
          <h2 className="text-xl font-bold mb-8">Sabor Express</h2>
          <nav className="space-y-4">
            {links.map((link) => (
              <motion.div key={link.path} whileHover={{ scale: 1.05 }}>
                <Link
                  to={link.path}
                  className={`block px-4 py-2 rounded transition-colors ${location.pathname === link.path
                      ? "bg-red-500"
                      : "hover:bg-gray-800"
                    }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-white hover:bg-red-600 mt-8"
            >
              Sair
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={handleLogout}>
                  Confirmar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.aside>

      {/* Botão Hamburguer/X Mobile */}
      <div className="absolute top-4 right-4 sm:hidden z-50">
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-gray-800 bg-white p-2 rounded shadow"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>


      {/* Overlay escuro */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Escurecimento do fundo */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Mobile */}
            <motion.aside
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 z-40 w-64 h-full bg-gray-900 text-white p-6 flex flex-col justify-between sm:hidden shadow-lg"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Sabor Express</h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 rounded hover:bg-gray-800"
                  >
                    <X size={28} />
                  </button>
                </div>

                <nav className="space-y-4">
                  {links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-4 py-2 rounded transition-colors ${location.pathname === link.path
                          ? "bg-red-500"
                          : "hover:bg-gray-800"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-red-600 mt-8 w-full"
                  >
                    Sair
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="destructive" onClick={handleLogout}>
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Conteúdo principal */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-4 sm:p-8 bg-gray-100 w-full"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AdminLayout;
