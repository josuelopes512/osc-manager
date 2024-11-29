"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function StudentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dataType, setDataType] = useState<string>();

  const handleExport = async () => {
    try {
      const response = await fetch(`/api/data-io?type=${dataType}`);

      if (!response.ok) {
        throw new Error(`Erro ao exportar ${dataType}.`);
      }

      const data = await response.json();

      // Baixar como arquivo JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${dataType}.json`;
      link.click();

      toast.success(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} exportado com sucesso!`);
    } catch (error) {
      console.error(error);
      toast.error(`Falha ao exportar ${dataType}.`);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.warn("Nenhum arquivo selecionado.");
      return;
    }

    try {
      const response = await fetch(`/api/data-io?type=${dataType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: await file.text(),
      });

      if (!response.ok) {
        throw new Error(`Erro ao importar ${dataType}.`);
      }

      toast.success(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} importado com sucesso!`);
    } catch (error) {
      console.error(error);
      toast.error(`Falha ao importar ${dataType}.`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Dados</h1>

      <div className="mb-4">
        <label htmlFor="dataType" className="text-lg font-medium mb-2 block">
          Selecione o tipo de dados:
        </label>
        <select
          id="dataType"
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="students">Alunos</option>
          <option value="courses">Cursos</option>
          <option value="oscs">OSC's</option>
          <option value="projects">Projetos</option>
          <option value="surveys">Questionários</option>
        </select>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Exportar Dados</h2>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleExport}
        >
          Exportar como JSON
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Importar Dados</h2>
        <input
          type="file"
          accept=".json"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-2 block"
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
          onClick={handleImport}
          disabled={!file}
        >
          Importar JSON
        </button>
      </div>
    </div>
  );
}
