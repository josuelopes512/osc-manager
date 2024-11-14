import { deleteData, getData } from "@/lib/functions.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import React from "react";
import { toast } from "react-toastify";
import CourseList from "./page";

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

describe("CourseList", () => {
	beforeEach(() => {
		(getData as jest.Mock).mockResolvedValue([{ id: 1, name: "Course 1" }]);
		(useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the table with data", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<CourseList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Course 1")).toBeInTheDocument();
		});
	});

	it("navigates to edit page when edit button is clicked", async () => {
		const push = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({ push });

		render(
			<QueryClientProvider client={queryClient}>
				<CourseList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Course 1")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTitle("Editar"));

		await waitFor(() => {
			expect(push).toHaveBeenCalledWith("cursos/1");
		});
	});

	it("opens the delete modal when delete button is clicked", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<CourseList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Course 1")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTitle("Deletar"));

		await waitFor(() => {
			expect(
				screen.getByText("Tem certeza que deseja deletar o curso?"),
			).toBeInTheDocument();
		});
	});

	it("deletes the course when confirm button is clicked", async () => {
		(deleteData as jest.Mock).mockResolvedValue({});

		render(
			<QueryClientProvider client={queryClient}>
				<CourseList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("Course 1")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTitle("Deletar"));

		await waitFor(() => {
			expect(
				screen.getByText("Tem certeza que deseja deletar o curso?"),
			).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Sim"));

		await waitFor(() => {
			expect(deleteData).toHaveBeenCalledWith({
				url: "/course",
				id: 1,
			});
			expect(toast.success).toHaveBeenCalledWith("Curso deletado com sucesso");
		});
	});
});
