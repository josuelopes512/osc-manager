"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function StudentsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [studentsExported, setStudentsExported] = useState<any[]>([]);

  const handleExport = async () => {
    try {
      const response = await fetch("/api/data-io");

      if (!response.ok) {
        throw new Error("Erro ao exportar alunos.");
      }

      const data = await response.json();
      
      setStudentsExported(data);

      // Baixar como arquivo JSON
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "students.json";
      link.click();

      toast.success("Alunos exportados com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao exportar alunos.");
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.warn("Nenhum arquivo selecionado.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/data-io", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: await file.text(),
      });

      if (!response.ok) {
        throw new Error("Erro ao importar alunos.");
      }

      toast.success("Alunos importados com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Falha ao importar alunos.");
    }
  };

  return (
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Gerenciar Alunos</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Exportar Alunos</h2>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleExport}
          >
            Exportar como JSON
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Importar Alunos</h2>
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

        {/* <div>
          <h2 className="text-xl font-semibold">Alunos Exportados</h2>
          {studentsExported.length > 0 ? (
            <pre className="bg-gray-100 p-4 mt-2 rounded">
              {JSON.stringify(studentsExported, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500 mt-2">Nenhum dado exportado ainda.</p>
          )}
        </div> */}
      </div>
  );
}
