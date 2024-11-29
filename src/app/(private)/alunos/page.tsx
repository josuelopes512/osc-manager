"use client";

import { useState } from "react";
import Table from "@/components/table";
import type { ColumnProps } from "@/components/table/types";
import { getData, deleteData, toastErrorsApi } from "@/lib/functions.api";
import type { DeleteData } from "@/types/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import type { Course, Student } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { columnsStudents } from "./constants";
import StudentsPage from "./students";

export default function StudentList() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["student-get"],
    queryFn: ({ signal }) =>
      getData<(Student & { course: Course })[]>({
        url: "/student",
        signal,
        query: "include.course=true",
      }),
  });

  const { mutateAsync: mutateDelete, isPending: loadingDelete } = useMutation({
    mutationFn: async (val: DeleteData) => deleteData(val),
    mutationKey: ["student-delete"],
  });

  const router = useRouter();

  const [itemDelete, setItemDelete] = useState<number>();
  const [file, setFile] = useState<File | null>(null);
  //const [studentsExported, setStudentsExported] = useState<any[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const deleteItem = (id: number) => {
    mutateDelete({
      url: "/student",
      id: id,
    })
      .then(() => {
        toast.success("Aluno deletado com sucesso");
        void refetch();
      })
      .catch((err) => {
        toastErrorsApi(err);
      });
  };

//   const handleExport = async () => {
//     try {
//       const response = await fetch("/api/data-io");

//       if (!response.ok) {
//         throw new Error("Erro ao exportar alunos.");
//       }

//       const data = await response.json();
//       setStudentsExported(data);

//       // Baixar como arquivo JSON
//       const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "students.json";
//       link.click();

//       toast.success("Alunos exportados com sucesso!");
//     } catch (error) {
//       console.error(error);
//       toast.error("Falha ao exportar alunos.");
//     }
//   };

//   const handleImport = async () => {
//     if (!file) {
//       toast.warn("Nenhum arquivo selecionado.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await fetch("/api/data-io/import-students", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: await file.text(),
//       });

//       if (!response.ok) {
//         throw new Error("Erro ao importar alunos.");
//       }

//       toast.success("Alunos importados com sucesso!");
//       refetch(); // Recarregar a lista de alunos após a importação
//     } catch (error) {
//       console.error(error);
//       toast.error("Falha ao importar alunos.");
//     }
//   };

  const finalColumns: ColumnProps<Student & { course: Course }>[] = [
    ...columnsStudents,
    {
      uid: "actions",
      label: "Ações",
      renderCell: (item) => (
        <div className="relative flex cursor-pointer items-center justify-end gap-5">
          <Tooltip content="Editar" placement="bottom-end" color="secondary">
            <Button
              isIconOnly
              color="primary"
              className="rounded-full"
              onPress={() => router.push(`alunos/${item.id}`)}
              title="Editar"
            >
              <FaPencilAlt size={20} />
            </Button>
          </Tooltip>
          <Tooltip content="Deletar" placement="bottom-end" color="danger">
            <Button
              isIconOnly
              title="Deletar"
              color="danger"
              className="rounded-full"
              onPress={() => {
                setItemDelete(item.id);
                onOpen();
              }}
            >
              <FaTrash size={20} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const loading = isLoading || loadingDelete;

  return (
    <>
      {/* <div className="p-4">
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

        <div>
          <h2 className="text-xl font-semibold">Alunos Exportados</h2>
          {studentsExported.length > 0 ? (
            <pre className="bg-gray-100 p-4 mt-2 rounded">
              {JSON.stringify(studentsExported, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500 mt-2">Nenhum dado exportado ainda.</p>
          )}
        </div>
      </div> */}

	  <StudentsPage />

      <Table data={data} columns={finalColumns} loading={loading} />
	  <Modal
        isOpen={isOpen}
        backdrop="opaque"
        classNames={{
          backdrop: "blur-md",
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="mt-4 flex flex-col gap-1">
                Tem certeza que deseja deletar o aluno?
              </ModalHeader>
              <ModalBody>
                <div className={"flex flex-col gap-2 text-default-600"}>
                  Você está prestes a deletar o aluno, deseja continuar?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Não
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (!itemDelete) return;
                    deleteItem(itemDelete);
                    onClose();
                  }}
                >
                  Sim
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
