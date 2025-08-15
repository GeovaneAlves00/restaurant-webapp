import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Clock, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import bannerImage from '@/assets/images/banner.jpg';


const HomePage = () => {
  const features = [
    {
      icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
      title: "Ementa Variada",
      description: "Diversas opções para todos os gostos, desde entradas até sobremesas."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Entrega Rápida",
      description: "O seu pedido entregue em até 45 minutos ou a entrega é gratuita."
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Acompanhamento em Tempo Real",
      description: "Acompanhe o estado do seu pedido em tempo real até à entrega."
    },
    {
      icon: <Star className="h-8 w-8 text-primary" />,
      title: "Qualidade Garantida",
      description: "Ingredientes frescos e pratos preparados por chefs experientes."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 rounded-2xl"></div>
        <div className="relative h-[500px] rounded-2xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="Mesa posta com vários pratos tradicionais portugueses, como bacalhau, marisco e vinho verde"
            src={bannerImage}
          />

          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Sabores que chegam até si
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Experimente o melhor da culinária portuguesa sem sair de casa. Faça o seu pedido agora e receba em minutos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/menu">Ver Ementa</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 text-base">
                  <Link to="/orders">Meus Pedidos</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Porquê escolher o Sabor Express?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Oferecemos uma experiência gastronómica completa com a conveniência da entrega ao domicílio.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 rounded-2xl p-8 sm:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0 md:mr-8"
          >
            <h2 className="text-3xl font-bold mb-4">Pronto para experimentar?</h2>
            <p className="text-gray-700 max-w-md mb-6">
              Faça o seu pedido agora e receba em até 45 minutos ou a entrega é por nossa conta!
            </p>
            <Button asChild size="lg" className="text-base">
              <Link to="/menu">Fazer Pedido</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 relative"
          >
            <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-xl">
              <img
                className="w-full h-full object-cover"
                alt="Chef português sorridente a empratar um prato tradicional"
                src="https://images.unsplash.com/photo-1665323536266-67bc28a79440" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-4 shadow-lg">
              <div className="bg-primary rounded-full p-3 text-white">
                <Truck className="h-8 w-8" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;