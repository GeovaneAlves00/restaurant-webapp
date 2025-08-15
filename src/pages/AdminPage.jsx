import React, { useState } from "react";

const AdminPage = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Prato:", { nome, descricao, preco });
    alert("Prato cadastrado (simulação).");
    setNome("");
    setDescricao("");
    setPreco("");
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Painel Administrativo</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nome do Prato</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Bacalhau à Brás"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição do prato"
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
            placeholder="Ex: 12.50"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Adicionar Prato
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
