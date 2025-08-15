import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categorias = ["Todos", "Entradas", "Prato principal", "Sobremesa", "Bebida"];

const MenuPageAdmin = () => {
  const [pratos, setPratos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPratos = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(FIRESTORE_DB, "pratos"));
      const dados = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPratos(dados);
    } catch (error) {
      console.error("Erro ao buscar pratos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPratos();
  }, []);

  const handleEditar = (id) => {
    navigate(`/admin/novo-prato?id=${id}`);
  };

  const handleExcluir = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este prato?");
    if (!confirmar) return;

    try {
      await deleteDoc(doc(FIRESTORE_DB, "pratos", id));
      setPratos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao excluir prato:", error);
      alert("Erro ao excluir prato.");
    }
  };

  const pratosFiltrados =
    categoriaSelecionada === "Todos"
      ? pratos
      : pratos.filter((prato) => prato.categoria === categoriaSelecionada);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Ementa</h1>

      {/* Filtro por categoria */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaSelecionada(categoria)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              categoriaSelecionada === categoria
                ? "bg-red-500 text-white border-red-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Lista de pratos */}
      {loading ? (
        <p>A carregar pratos...</p>
      ) : pratosFiltrados.length === 0 ? (
        <p>Nenhum prato cadastrado nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pratosFiltrados.map((prato) => (
            <motion.div
              key={prato.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              whileHover={{ scale: 1.02 }}
            >
              {prato.imagemUrl && (
                <img
                  src={prato.imagemUrl}
                  alt={prato.nome}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-1">{prato.nome}</h2>
                <p className="text-sm text-gray-600 mb-2">{prato.descricao}</p>
                <p className="font-semibold text-red-500 mb-4">
                  € {prato.preco.toFixed(2)}
                </p>

                {/* Botões de ação */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleEditar(prato.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(prato.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPageAdmin;
