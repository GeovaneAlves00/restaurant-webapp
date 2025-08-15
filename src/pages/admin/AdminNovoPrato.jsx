import React, { useState, useEffect } from "react";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FIRESTORE_DB, FIREBASE_STORAGE } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useSearchParams } from "react-router-dom";

const AdminNovoPrato = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("Entradas");
  const [imagem, setImagem] = useState(null);
  const [imagemAtualUrl, setImagemAtualUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const pratoId = searchParams.get("id");

  useEffect(() => {
    const carregarPrato = async () => {
      if (pratoId) {
        try {
          const docRef = doc(FIRESTORE_DB, "pratos", pratoId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setNome(data.nome);
            setDescricao(data.descricao);
            setPreco(data.preco);
            setCategoria(data.categoria);
            setImagemAtualUrl(data.imagemUrl || "");
          }
        } catch (error) {
          console.error("Erro ao carregar prato:", error);
        }
      }
    };

    carregarPrato();
  }, [pratoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagemUrl = imagemAtualUrl;

      if (imagem) {
        const storageRef = ref(FIREBASE_STORAGE, `pratos/${uuidv4()}-${imagem.name}`);
        await uploadBytes(storageRef, imagem);
        imagemUrl = await getDownloadURL(storageRef);
      }

      if (pratoId) {
        const pratoRef = doc(FIRESTORE_DB, "pratos", pratoId);
        await updateDoc(pratoRef, {
          nome,
          descricao,
          preco: parseFloat(preco),
          categoria,
          imagemUrl,
        });
        alert("Prato atualizado com sucesso!");
      } else {
        await addDoc(collection(FIRESTORE_DB, "pratos"), {
          nome,
          descricao,
          preco: parseFloat(preco),
          categoria,
          imagemUrl,
          criadoEm: new Date(),
        });
        alert("Prato cadastrado com sucesso!");
      }

      setNome("");
      setDescricao("");
      setPreco("");
      setCategoria("Entradas");
      setImagem(null);
      setImagemAtualUrl("");
    } catch (error) {
      console.error("Erro ao salvar prato:", error);
      alert("Erro ao salvar prato.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {pratoId ? "Editar Prato" : "Adicionar Novo Prato"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nome do Prato</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <select
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option>Entradas</option>
            <option>Prato principal</option>
            <option>Sobremesa</option>
            <option>Bebida</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço (€)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        {imagemAtualUrl && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Imagem atual:</p>
            <img
              src={imagemAtualUrl}
              alt="Imagem atual"
              className="w-32 h-20 object-cover mb-2 rounded"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Nova imagem (opcional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => setImagem(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          {loading ? "Salvando..." : pratoId ? "Atualizar Prato" : "Adicionar Prato"}
        </button>
      </form>
    </div>
  );
};

export default AdminNovoPrato;
