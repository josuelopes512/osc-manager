import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useParams } from "next/navigation";
import "@testing-library/jest-dom";
import { postData, putData } from "@/lib/functions.api";
import React from "react";
import { toast } from "react-toastify";
import { useOSCData } from "./hooks/useOSCData";
import { useSocialPlatforms } from "./hooks/useSocialPlatforms";
import OSCEdit from "./page";

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
jest.mock("./hooks/useOSCData");
jest.mock("./hooks/useSocialPlatforms");

const queryClient = new QueryClient();

describe("OSCEdit", () => {
	beforeEach(() => {
		(useOSCData as jest.Mock).mockReturnValue({
			dataGetOSC: {
				id: 1,
				name: "OSC 1",
				location: "Location 1",
				oscSocials: [
					{ id: 1, socialPlatformId: "1", url: "http://example.com" },
				],
			},
			loadingGet: false,
		});
		(useSocialPlatforms as jest.Mock).mockReturnValue({
			dataGetSocialPlatform: [{ id: 1, name: "Platform 1" }],
			loadingGetSocialPlatform: false,
		});
		(useParams as jest.Mock).mockReturnValue({ id: "new" });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the form with default values", async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<OSCEdit />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByLabelText("Nome")).toBeInTheDocument();
			expect(screen.getByLabelText("Endereço/Localização")).toBeInTheDocument();
		});
	});

	it("submits the form to create a new OSC", async () => {
		(postData as jest.Mock).mockResolvedValue({});

		render(
			<QueryClientProvider client={queryClient}>
				<OSCEdit />
			</QueryClientProvider>,
		);

		fireEvent.change(screen.getByLabelText("Nome"), {
			target: { value: "OSC 1" },
		});
		fireEvent.change(screen.getByLabelText("Endereço/Localização"), {
			target: { value: "Location 1" },
		});
		const socialPlatformInputs = screen.getAllByLabelText("Plataforma social");
		fireEvent.change(socialPlatformInputs[0], {
			target: { value: "1" },
		});
		const linkInputs = screen.getAllByLabelText("Link");
		fireEvent.change(linkInputs[0], {
			target: { value: "http://example.com" },
		});

		fireEvent.click(screen.getByText("Salvar"));

		await waitFor(() => {
			expect(postData).toHaveBeenCalledWith({
				url: "/osc",
				data: {
					name: "OSC 1",
					location: "Location 1",
					oscSocials: {
						create: [
							{
								socialPlatformId: 1,
								link: "http://example.com",
							},
						],
						delete: [1],
						update: [],
					},
				},
			});
			expect(toast.success).toHaveBeenCalledWith("OSC cadastrada com sucesso");
		});
	});

	it("submits the form to update an existing OSC", async () => {
		(putData as jest.Mock).mockResolvedValue({});
		(useParams as jest.Mock).mockReturnValue({ id: "1" });
		(useOSCData as jest.Mock).mockReturnValue({
			dataGetOSC: {
				id: 1,
				name: "OSC 1",
				location: "Location 1",
				oscSocials: [
					{ id: 1, socialPlatformId: "1", url: "http://example.com" },
				],
			},
			loadingGet: false,
		});

		render(
			<QueryClientProvider client={queryClient}>
				<OSCEdit />
			</QueryClientProvider>,
		);

		await waitFor(() => {
			expect(screen.getByLabelText("Nome")).toHaveValue("OSC 1");
			expect(screen.getByLabelText("Endereço/Localização")).toHaveValue(
				"Location 1",
			);
		});

		fireEvent.change(screen.getByLabelText("Nome"), {
			target: { value: "OSC 2" },
		});
		fireEvent.change(screen.getByLabelText("Endereço/Localização"), {
			target: { value: "Location 2" },
		});

		const socialPlatformInputs = screen.getAllByLabelText("Plataforma social");
		fireEvent.change(socialPlatformInputs[0], {
			target: { value: "1" },
		});
		const linkInputs = screen.getAllByLabelText("Link");
		fireEvent.change(linkInputs[0], {
			target: { value: "http://example.com" },
		});

		fireEvent.click(screen.getByText("Salvar"));

		await waitFor(() => {
			expect(putData).toHaveBeenCalledWith({
				url: "/osc",
				data: {
					name: "OSC 2",
					location: "Location 2",
					oscSocials: {
						update: [
							{ id: 1, socialPlatformId: 1, link: "http://example.com" },
						],
						delete: [],
						create: [],
					},
				},
				id: 1,
			});
			expect(toast.success).toHaveBeenCalledWith("OSC atualizada com sucesso");
		});
	});
});
