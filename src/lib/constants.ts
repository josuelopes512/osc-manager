import type { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig = {
	defaultOptions: {
		queries: {
			// suspense: true,
			retry: 1,
			staleTime: 5 * 1000,
			networkMode: "offlineFirst",
			// throwOnError: true,
		},
		mutations: {
			// suspense: true,
			// throwOnError: true,
			networkMode: "offlineFirst",
		},
	},
} as QueryClientConfig;

export const cookiesSettings = {
	// expires in 1 week
	expires: 7,
	// secure: true,
};
