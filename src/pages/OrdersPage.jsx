import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';
import { formatCurrency, formatDate } from '@/lib/utils';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/lib/firebase';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const clientEmail = localStorage.getItem('clientEmail');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(FIRESTORE_DB, 'orders'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const ordersData = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(order => order.customer?.email === clientEmail); // filtra pelos pedidos do cliente

        setOrders(ordersData);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientEmail]);

  if (loading) {
    return <p className="text-gray-500">A carregar pedidos...</p>;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="Nenhum pedido encontrado"
        description="Ainda não fez nenhum pedido. Explore a nossa ementa e faça o seu primeiro pedido!"
        icon={<ClipboardList className="h-12 w-12" />}
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
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Meus Pedidos</h1>
        <p className="text-gray-600">Acompanhe o estado dos seus pedidos recentes.</p>
      </motion.div>

      <div className="space-y-6">
        {orders.map(order => (
          <Card key={order.id} className="border shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pedido #{order.id}</p>
                  <p className="text-sm text-gray-400">{formatDate(order.date)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                  <p className="text-xs text-gray-500 capitalize">{order.status}</p>
                </div>
              </div>
              <Separator />
              <ul className="text-sm space-y-1">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{formatCurrency(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
