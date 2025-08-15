import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <EmptyState 
        title="O seu carrinho está vazio" 
        description="Adicione itens da ementa para começar o seu pedido."
        icon={<ShoppingCart className="h-12 w-12" />}
        actionText="Explorar ementa"
        actionLink="/menu"
      />
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">O Seu Carrinho</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no seu carrinho
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={clearCart}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Limpar Carrinho
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <OrderSummary />
          
          <Button asChild className="w-full text-base" size="lg">
            <Link to="/checkout" className="flex items-center justify-center">
              Finalizar Pedido
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <div className="text-center">
            <Button asChild variant="link">
              <Link to="/menu">Continuar a comprar</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;