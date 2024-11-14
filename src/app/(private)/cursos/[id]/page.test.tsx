import { getData, postData, putData } from "@/lib/functions.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useParams } from "next/navigation";
import "@testing-library/jest-dom";
import React from "react";
import { toast } from "react-toastify";
import CourseEdit from "./page";

// Mock dependencies
jest.mock("@/lib/functions.api");
jest.mock("next/navigation", () => ({
	useParams: jest.fn(),
}));
jest.mock("react-toastify", () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
	},
}));

const queryClient = new QueryClient();

describe("CourseEdit", () => {
	beforeEach(() => {
		(getData as jest.Mock).mockResolvedValue({ id: 1, name: "Course 1" });
		(useParams as jest.Mock).mockReturnValue({ id: "new" });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the form with default values", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<CourseEdit />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByLabelText("Nome")).toBeInTheDocument();
		});
	});

	it("submits the form to create a new course", async () => {
		(postData as jest.Mock).mockResolvedValue({});

		render(
			<QueryClientProvider client={queryClient}>
				<CourseEdit />
			</QueryClientProvider>,
		);

		fireEvent.change(screen.getByLabelText("Nome"), {
			target: { value: "Course 1" },
		});

		fireEvent.click(screen.getByText("Salvar"));

		await waitFor(() => {
			expect(postData).toHaveBeenCalledWith({
				url: "/course",
				data: {
					name: "Course 1",
				},
			});
			expect(toast.success).toHaveBeenCalledWith(
				"Curso cadastrado com sucesso",
			);
		});
	});

	it("submits the form to update an existing course", async () => {
		(putData as jest.Mock).mockResolvedValue({});
		(useParams as jest.Mock).mockReturnValue({ id: "1" });
		(getData as jest.Mock).mockResolvedValue({
			id: 1,
			name: "Course 1",
		});

		render(
			<QueryClientProvider client={queryClient}>
				<CourseEdit />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByLabelText("Nome")).toHaveValue("Course 1");
		});

		fireEvent.change(screen.getByLabelText("Nome"), {
			target: { value: "Course 2" },
		});

		fireEvent.click(screen.getByText("Salvar"));

		await waitFor(() => {
			expect(putData).toHaveBeenCalledWith({
				url: "/course",
				data: {
					name: "Course 2",
				},
				id: 1,
			});
			expect(toast.success).toHaveBeenCalledWith(
				"Curso atualizado com sucesso",
			);
		});
	});
});
