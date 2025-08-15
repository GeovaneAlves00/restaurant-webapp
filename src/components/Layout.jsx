import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Home, UtensilsCrossed, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../lib/firebase";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isLoginPage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    navigate("/");
  };

  const navLinks = [
    { path: '/home', label: 'Início', icon: <Home className="w-5 h-5 mr-2" /> },
    { path: '/menu', label: 'Cardápio', icon: <UtensilsCrossed className="w-5 h-5 mr-2" /> },
    { path: '/orders', label: 'Meus Pedidos', icon: <ClipboardList className="w-5 h-5 mr-2" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && !isAdminPage && (
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/home" className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-primary">Sabor Express</h1>
              </motion.div>
            </Link>

            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center text-gray-700 hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary font-medium' : ''}`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              <Link to="/cart" className="relative">
                <Button variant="ghost" className="relative p-2">
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-red-500 hover:text-red-600">Sair</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="destructive" onClick={handleLogout}>Confirmar</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="md:hidden flex items-center">
              <Link to="/cart" className="relative mr-4">
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
              <Button variant="ghost" onClick={toggleMenu} className="p-1">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`flex items-center py-2 text-gray-700 hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary font-medium' : ''}`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="text-red-500 text-left">Sair</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end space-x-2">
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button variant="destructive" onClick={handleLogout}>Confirmar</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          )}
        </header>
      )}

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {!isAdminPage && (
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <span className="text-xl font-bold text-primary mb-4 block">Sabor Express</span>
                <p className="text-gray-300">
                  Entregando os melhores sabores diretamente na sua casa.
                </p>
              </div>
              <div>
                <span className="font-semibold text-lg mb-4 block">Horário de Funcionamento</span>
                <p className="text-gray-300">Segunda - Sexta: 11h às 22h</p>
                <p className="text-gray-300">Sábados e Domingos: 11h às 23h</p>
              </div>
              <div>
                <span className="font-semibold text-lg mb-4 block">Contato</span>
                <p className="text-gray-300">Telefone: (11) 99999-9999</p>
                <p className="text-gray-300">Email: contato@saborexpress.com</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
              <p>© {new Date().getFullYear()} Sabor Express. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
