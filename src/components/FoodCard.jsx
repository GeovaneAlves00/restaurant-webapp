import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

const FoodCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={item.image || '/placeholder-food.png'}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-orange-500 text-white text-sm font-bold px-2 py-1 rounded">
          {Number(item.price).toFixed(2).replace('.', ',')} €
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-1">{item.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>

        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded mt-auto"
          onClick={() => addToCart(item)}
        >
          + Adicionar ao Carrinho
        </button>
      </div>
    </motion.div>
  );
};

export default FoodCard;
