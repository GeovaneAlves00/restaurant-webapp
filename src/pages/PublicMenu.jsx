import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';

const PublicMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const [logoType, setLogoType] = useState('text');
  const [logoTitle, setLogoTitle] = useState('');
  const [logoUrl, setLogoUrl] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'pratos'));
        const pratos = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.nome,
            description: data.descricao,
            image: data.imagemUrl,
            price: data.preco,
            categoryName: data.categoria
          };
        });

        setMenuItems(pratos);

        const uniqueCategories = Array.from(new Set(pratos.map(p => p.categoryName)));

        const categoryObjects = uniqueCategories.map((name) => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
        }));

        setCategories(categoryObjects);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const snap = await getDoc(doc(FIRESTORE_DB, 'config', 'ui'));
        if (snap.exists()) {
          setLogoTitle(snap.data().logoTitle || '');
        }
      } catch (e) {
        console.error('Erro ao carregar logoTitle:', e);
      }
    };
    loadLogo();
  }, []);

  useEffect(() => {
    const loadUiConfig = async () => {
      try {
        const snap = await getDoc(doc(FIRESTORE_DB, 'config', 'ui'));
        if (snap.exists()) {
          const d = snap.data();
          setLogoType(d.logoType || 'text');
          setLogoTitle(d.logoTitle || '');
          setLogoUrl(d.logoUrl || '');
        }
      } catch (e) {
        console.error('Erro ao carregar config/ui:', e);
      }
    };
    loadUiConfig();
  }, []);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const snap = await getDoc(doc(FIRESTORE_DB, 'config', 'ui'));
        if (snap.exists()) {
          const d = snap.data();
          setRestaurantName(d.restaurantName || '');
          setRestaurantAddress(d.restaurantAddress || '');
          setRestaurantPhone(d.restaurantPhone || '');
          setRestaurantWhatsapp(d.restaurantWhatsapp || '');
          setRestaurantMapsUrl(d.restaurantMapsUrl || '');
          setRestaurantHours(Array.isArray(d.restaurantHours) ? d.restaurantHours : []);
        }
      } catch (e) {
        console.error('Erro ao carregar footer:', e);
      }
    };
    loadFooter();
  }, []);


  // Footer dinâmico
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [restaurantPhone, setRestaurantPhone] = useState('');
  const [restaurantWhatsapp, setRestaurantWhatsapp] = useState('');
  const [restaurantMapsUrl, setRestaurantMapsUrl] = useState('');
  const [restaurantHours, setRestaurantHours] = useState([]); // array de {day, time}

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setActiveCategory('all');
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || item.categoryName.toLowerCase().replace(/\s+/g, '-') === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const itemsByCategory = categories.map(category => ({
    ...category,
    items: filteredItems.filter(
      item => item.categoryName.toLowerCase().replace(/\s+/g, '-') === category.id
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 sm:p-6">
        {/* LOGO (texto ou imagem) */}
        <div className="flex justify-center mb-6">
          {logoType === 'image' && logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              className="max-h-20 object-contain" // altura máx 80px, mantém proporção
            />
          ) : (
            <span className="text-4xl font-bold tracking-wide">
              {logoTitle || 'SEU LOGO'}
            </span>
          )}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">A Nossa Ementa</h1>
          <p className="text-gray-600">
            Explore a nossa ementa completa e encontre as melhores opções para o seu pedido.
          </p>
        </motion.div>

        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Procurar pratos, ingredientes..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <ScrollArea className="w-full">
            <TabsList className="w-full justify-start mb-4 overflow-x-auto">
              <TabsTrigger value="all" className="min-w-max">Todos</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="min-w-max">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          <TabsContent value="all">
            {itemsByCategory.length > 0 ? (
              itemsByCategory.map(category => (
                <div key={category.id} className="mb-10">
                  <h2 className="text-xl font-bold mb-4">{category.name}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.items.map(item => (
                      <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-3">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <p className="text-red-500 font-bold mt-2">€ {item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum item encontrado para "{searchTerm}"</p>
              </div>
            )}
          </TabsContent>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              {filteredItems.filter(item =>
                item.categoryName.toLowerCase().replace(/\s+/g, '-') === category.id).length > 0 ? (
                <div className="mb-10">
                  <h2 className="text-xl font-bold mb-4">{category.name}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredItems
                      .filter(item =>
                        item.categoryName.toLowerCase().replace(/\s+/g, '-') === category.id
                      ).map(item => (
                        <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover"
                            />
                          )}
                          <div className="p-3">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-red-500 font-bold mt-2">€ {item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Nenhum item encontrado em {category.name} para "{searchTerm}"</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        <footer className="border-t mt-8 py-6 text-sm text-gray-700">
          <div className="max-w-4xl mx-auto px-4 grid gap-3 sm:grid-cols-3">
            <div>
              <div className="font-semibold">{restaurantName || 'Nome do Restaurante'}</div>
              {restaurantMapsUrl ? (
                <a
                  href={restaurantMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-600 hover:underline"
                >
                  {restaurantAddress || 'Endereço'}
                </a>
              ) : (
                <div className="text-gray-600">{restaurantAddress || 'Endereço'}</div>
              )}
            </div>

            <div>
              <div>Contacto</div>
              {restaurantPhone && (
                <div>
                  <a
                    href={`tel:${(restaurantPhone || '').replace(/\s+/g, '')}`}
                    className="hover:underline"
                  >
                    {restaurantPhone}
                  </a>
                </div>
              )}
            </div>

            <div>
              <div>Horário de Funcionamento</div>
              {restaurantHours?.length ? (
                <ul className="mt-1 space-y-1">
                  {restaurantHours.map((h, i) => (
                    <li key={i} className="text-gray-600">
                      {h.day}: {h.time}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-600 mt-1">—</div>
              )}
            </div>
          </div>

          {/* Botão para Login */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-gray-800 text-white text-xs px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Ir para Login
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default PublicMenu;
