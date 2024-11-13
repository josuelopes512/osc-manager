import { getData, postData, putData } from "@/lib/functions.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useParams } from "next/navigation";
import "@testing-library/jest-dom";
import React from "react";
import { toast } from "react-toastify";
import StudentEdit from "./page";

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

describe("StudentEdit", () => {
	beforeEach(() => {
		(getData as jest.Mock).mockResolvedValue([{ id: 1, name: "Course 1" }]);
		(useParams as jest.Mock).mockReturnValue({ id: "new" });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the form with default values", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<StudentEdit />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByLabelText("Nome")).toBeInTheDocument();
			expect(
				screen.getByLabelText("Curso", { selector: "select" }),
			).toBeInTheDocument();
			expect(screen.getByLabelText("Matrícula")).toBeInTheDocument();
			expect(screen.getByLabelText("Whatsapp")).toBeInTheDocument();
			expect(screen.getByLabelText("Email")).toBeInTheDocument();
		});
	});

	it("submits the form to create a new student", async () => {
		(postData as jest.Mock).mockResolvedValue({});

		render(
			<QueryClientProvider client={queryClient}>
				<StudentEdit />
			</QueryClientProvider>,
		);

		fireEvent.change(screen.getByLabelText("Nome"), {
			target: { value: "Student 1" },
		});
		fireEvent.change(screen.getByLabelText("Curso", { selector: "select" }), {
			target: { value: "1" },
		});
		fireEvent.change(screen.getByLabelText("Matrícula"), {
			target: { value: "1234567" },
		});
		fireEvent.change(screen.getByLabelText("Whatsapp"), {
			target: { value: "(99) 99999-9999" },
		});
		fireEvent.change(screen.getByLabelText("Email"), {
			target: { value: "student1@example.com" },
		});

		fireEvent.click(screen.getByText("Salvar"));

		await waitFor(() => {
			expect(postData).toHaveBeenCalledWith({
				url: "/student",
				data: {
					name: "Student 1",
					courseId: 1,
					matriculation: "1234567",
					whatsapp: "(99) 99999-9999",
					email: "student1@example.com",
				},
			});
			expect(toast.success).toHaveBeenCalledWith(
				"Aluno cadastrado com sucesso",
			);
		});
	});

	it("submits the form to update an existing student", async () => {
		(putData as jest.Mock).mockResolvedValue({});
		(useParams as jest.Mock).mockReturnValue({ id: "1" });
		(getData as jest.Mock).mockResolvedValue({
			id: 1,
			name: "Student 1",
			courseId: 1,
			matriculation: "1234567",
			whatsapp: "(99) 99999-9999",
			email: "student1@example.com",
		});

		render(
			<QueryClientProvider client={queryClient}>
				<StudentEdit />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByLabelText("Nome")).toHaveValue("Student 1");
			expect(
				screen.getByLabelText("Curso", { selector: "select" }),
			).toHaveValue("1");
			expect(screen.getByLabelText("Matrícula")).toHaveValue("1234567");
			expect(screen.getByLabelText("Whatsapp")).toHaveValue("(99) 99999-9999");
			expect(screen.getByLabelText("Email")).toHaveValue(
				"student1@example.com",
			);
		});

		fireEvent.change(screen.getByLabelText("Nome"), {
			target: { value: "Student 2" },
		});

		fireEvent.click(screen.getByText("Salvar"));

		await waitFor(() => {
			expect(putData).toHaveBeenCalledWith({
				url: "/student",
				data: {
					name: "Student 2",
					courseId: 1,
					matriculation: "1234567",
					whatsapp: "(99) 99999-9999",
					email: "student1@example.com",
				},
				id: 1,
			});
			expect(toast.success).toHaveBeenCalledWith(
				"Aluno atualizado com sucesso",
			);
		});
	});
});
