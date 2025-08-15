import React from 'react';
import { motion } from 'framer-motion';
import FoodCard from '@/components/FoodCard';

const CategorySection = ({ category, items }) => {
  return (
    <section className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
        <p className="text-gray-600 mb-6">{category.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CategorySection;
