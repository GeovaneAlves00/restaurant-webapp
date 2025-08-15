import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import CategorySection from '@/components/CategorySection';
import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '@/lib/firebase';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

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

        // Extrair categorias únicas e formatar
        const uniqueCategories = Array.from(new Set(pratos.map(p => p.categoryName)));

        const categoryObjects = uniqueCategories.map((name, index) => ({
          id: name.toLowerCase().replace(/\s+/g, '-'),
          name,
          description: `Veja os pratos disponíveis na categoria "${name}".`
        }));

        setCategories(categoryObjects);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };

    fetchData();
  }, []);

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
    <div>
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
              <CategorySection 
                key={category.id} 
                category={category} 
                items={category.items} 
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum item encontrado para "{searchTerm}"</p>
            </div>
          )}
        </TabsContent>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id}>
            {filteredItems.filter(item => item.categoryName.toLowerCase().replace(/\s+/g, '-') === category.id).length > 0 ? (
              <CategorySection 
                category={category} 
                items={filteredItems.filter(item =>
                  item.categoryName.toLowerCase().replace(/\s+/g, '-') === category.id
                )} 
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum item encontrado em {category.name} para "{searchTerm}"</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuPage;
