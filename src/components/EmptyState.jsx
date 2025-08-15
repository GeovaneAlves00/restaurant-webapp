
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  title = "Nenhum item encontrado", 
  description = "Parece que não há nada aqui ainda.", 
  icon = <ShoppingBag className="h-12 w-12" />,
  actionText = "Explorar cardápio",
  actionLink = "/menu"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="bg-gray-100 p-6 rounded-full mb-6 text-gray-500">
        {icon}
      </div>
      
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      
      <Button asChild>
        <Link to={actionLink}>{actionText}</Link>
      </Button>
    </motion.div>
  );
};

export default EmptyState;
