import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import OrderSummary from '@/components/OrderSummary';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/lib/firebase';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderRef = doc(collection(FIRESTORE_DB, 'orders')); // cria doc com ID único
      const orderId = orderRef.id;
      const orderDate = new Date().toISOString();
      const subtotal = getCartTotal();
      const deliveryFee = 2.5;
      const total = subtotal + deliveryFee;
      const clientEmail = localStorage.getItem('clientEmail') || '';

      const order = {
        id: orderId,
        createdAt: serverTimestamp(),
        date: orderDate,
        items: cartItems,
        subtotal,
        deliveryFee,
        total,
        status: 'pending',
        address: {
          street: formData.address,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
        },
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: clientEmail,
        },
        paymentMethod: formData.paymentMethod,
      };

      await setDoc(orderRef, order);

      clearCart();

      toast({
        title: "Pedido realizado com sucesso!",
        description: `O seu pedido #${orderId} foi recebido.`,
        duration: 5000,
      });

      navigate('/orders');
    } catch (error) {
      toast({
        title: "Erro ao finalizar o pedido.",
        description: "Tente novamente mais tarde.",
        variant: 'destructive',
      });
      console.error('Erro ao salvar pedido:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Finalizar Pedido</h1>
        <p className="text-gray-600">
          Preencha os dados abaixo para concluir o seu pedido.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Dados Pessoais */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  Dados Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Morada de Entrega */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  Morada de Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div className="space-y-2 md:col-span-4">
                    <Label htmlFor="address">Rua</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="number">Número</Label>
                    <Input
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      name="complement"
                      value={formData.complement}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="neighborhood">Freguesia/Bairro</Label>
                    <Input
                      id="neighborhood"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-6">
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  Forma de Pagamento
                </h2>
                <Tabs
                  defaultValue="card"
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
                >
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="card">Cartão de Crédito</TabsTrigger>
                    <TabsTrigger value="cash">Dinheiro</TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        required={formData.paymentMethod === 'card'}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required={formData.paymentMethod === 'card'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry">Validade</Label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          placeholder="MM/AA"
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv">CVV</Label>
                        <Input
                          id="cardCvv"
                          name="cardCvv"
                          value={formData.cardCvv}
                          onChange={handleChange}
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cash">
                    <p className="text-gray-600 mb-4">
                      Pagará em dinheiro no momento da entrega.
                    </p>
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        Lembre-se de ter o valor exato para facilitar o troco.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Estimativa de Entrega */}
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-4">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tempo de Entrega Estimado</h3>
                    <p className="text-gray-700">30-45 minutos após a confirmação do pedido</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* RESUMO E BOTÃO */}
        <div className="space-y-6">
          <OrderSummary />
          <Button
            onClick={handleSubmit}
            className="w-full text-base"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'A processar...' : 'Confirmar Pedido'}
          </Button>
          <div className="text-center text-sm text-gray-500">
            <p>Ao confirmar o seu pedido, concorda com os nossos termos de serviço e política de privacidade.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
