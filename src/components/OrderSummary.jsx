import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

const OrderSummary = ({ showItems = true }) => {
  const { cartItems, getCartTotal } = useCart();

  const subtotal = getCartTotal(); // Total dos produtos
  const deliveryFee = 2.50;
  const total = subtotal + deliveryFee;

  const baseTributavel = subtotal / 1.23;
  const iva = subtotal - baseTributavel;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 p-6 rounded-lg shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-1">Resumo do Pedido</h3>
      <p className="text-sm text-gray-500 mb-4">
        {totalItems} {totalItems === 1 ? 'item' : 'itens'} no pedido
      </p>

      {showItems && cartItems.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Itens:</h4>
          <ul className="space-y-2 mb-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
        </div>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Base tributável (sem IVA)</span>
          <span>{formatCurrency(baseTributavel)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">IVA (23%)</span>
          <span>{formatCurrency(iva)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Taxa de entrega</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between font-semibold text-base">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
