import { getData, putData } from "@/lib/functions.api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { toast } from "react-toastify";
import UserApprovalList from "./page";

// Mock dependencies
jest.mock("@/lib/functions.api");
jest.mock("react-toastify", () => ({
	toast: {
		success: jest.fn(),
		error: jest.fn(),
	},
}));

const queryClient = new QueryClient();

describe("UserApprovalList", () => {
	beforeEach(() => {
		(getData as jest.Mock).mockResolvedValue([
			{ id: 1, name: "User 1", approved: false },
		]);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the table with data", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<UserApprovalList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("User 1")).toBeInTheDocument();
		});
	});

	it("opens the approve modal when approve button is clicked", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<UserApprovalList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("User 1")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTitle("Aprovar"));

		await waitFor(() => {
			expect(
				screen.getByText("Tem certeza que deseja aprovar o usuário?"),
			).toBeInTheDocument();
		});
	});

	it("approves the user when confirm button is clicked", async () => {
		(putData as jest.Mock).mockResolvedValue({});

		render(
			<QueryClientProvider client={queryClient}>
				<UserApprovalList />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByText("User 1")).toBeInTheDocument();
		});

		fireEvent.click(screen.getByTitle("Aprovar"));

		await waitFor(() => {
			expect(
				screen.getByText("Tem certeza que deseja aprovar o usuário?"),
			).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText("Sim"));

		await waitFor(() => {
			expect(putData).toHaveBeenCalledWith({
				url: "/user/approval",
				id: 1,
				data: { approved: true },
			});
			expect(toast.success).toHaveBeenCalledWith(
				"Usuário aprovado com sucesso",
			);
		});
	});
});
