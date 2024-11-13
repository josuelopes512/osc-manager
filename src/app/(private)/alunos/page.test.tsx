import { deleteData, getData } from "@/lib/functions.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import React from "react";
import { toast } from "react-toastify";
import StudentList from "./page";

// Mock dependencies
jest.mock("@/lib/functions.api");
jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));
jest.mock("react-toastify", () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
	},
}));

const queryClient = new QueryClient();

describe("StudentList", () => {
	beforeEach(() => {
		(getData as jest.Mock).mockResolvedValue([
			{ id: 1, name: "Student 1", course: { name: "Course 1" } },
		]);
		(useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the table with data", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<StudentList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Student 1")).toBeInTheDocument();
		});
	});

	it("opens the delete modal when delete button is clicked", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<StudentList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Student 1")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTitle("Deletar"));

		await waitFor(() => {
			expect(
				screen.getByText("Tem certeza que deseja deletar o aluno?"),
			).toBeInTheDocument();
		});
	});

	it("deletes the student when confirm button is clicked", async () => {
		(deleteData as jest.Mock).mockResolvedValue({});

		render(
			<QueryClientProvider client={queryClient}>
				<StudentList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Student 1")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTitle("Deletar"));

		await waitFor(() => {
			expect(
				screen.getByText("Tem certeza que deseja deletar o aluno?"),
			).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Sim"));

		await waitFor(() => {
			expect(deleteData).toHaveBeenCalledWith({ url: "/student", id: 1 });
			expect(toast.success).toHaveBeenCalledWith("Aluno deletado com sucesso");
		});
	});
});
