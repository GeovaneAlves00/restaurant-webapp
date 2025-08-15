import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const imageDescriptions = {
    caldo_verde: "Miniatura de caldo verde numa tigela pequena",
    ameijoas_bulhao_pato: "Algumas amêijoas à Bulhão Pato num pratinho branco",
    pao_com_chourico: "Pequeno pão com chouriço cortado ao meio",
    bacalhau_a_bras: "Porção individual de bacalhau à Brás num prato pequeno",
    arroz_de_marisco: "Pequena porção de arroz de marisco numa taça",
    francesinha: "Miniatura de uma francesinha cortada, mostrando o recheio",
    cozido_a_portuguesa: "Pequena amostra de cozido à portuguesa com variedade de carnes e legumes",
    pasteis_de_bacalhau: "Um ou dois pastéis de bacalhau dourados",
    moelas_estufadas: "Pequena porção de moelas estufadas num prato de petisco",
    pica_pau: "Alguns pedaços de pica-pau com pickles num prato pequeno",
    pastel_de_nata: "Um pastel de nata individual",
    arroz_doce: "Pequena taça de arroz doce com canela",
    serradura: "Pequena taça de serradura em camadas",
    vinho_verde: "Um copo de vinho verde fresco",
    sumol: "Lata de Sumol de laranja",
    agua_das_pedras: "Um copo com Água das Pedras e gelo"
  };

  const defaultImageDescription = "Item do carrinho";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between p-4 border-b border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt={item.name}
            src={item.image}
          />
        </div>

        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="sm"
            className="px-2 h-8"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="w-8 text-center">{item.quantity}</span>

          <Button
            variant="ghost"
            size="sm"
            className="px-2 h-8"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default CartItem;