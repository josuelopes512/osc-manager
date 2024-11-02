import { getData } from "@/lib/functions.api";
import type { OSC, OSCSocial } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export type DataGetOSC = OSC & { oscSocials: OSCSocial[] };

const useOSCData = (id: string | "new") => {
	const { data: dataGetOSC, isLoading: loadingGet } = useQuery({
		queryFn: ({ signal }) =>
			getData<DataGetOSC>({
				url: "osc",
				id: Number.parseInt(id, 10),
				signal,
				query: "include.oscSocials=true",
			}),
		queryKey: ["osc-get-by-id", id],
		enabled: id !== "new",
	});
	return { dataGetOSC, loadingGet };
};

export { useOSCData };
