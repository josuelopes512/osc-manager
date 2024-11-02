import { getData } from "@/lib/functions.api";
import type { SocialPlatform } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useSocialPlatforms = () => {
	const { data: dataGetSocialPlatform, isLoading: loadingGetSocialPlatform } =
		useQuery({
			queryFn: ({ signal }) =>
				getData<SocialPlatform[]>({
					url: "socialPlatform",
					signal,
				}),
			queryKey: ["socials-platforms-get"],
			refetchOnMount: false,
			refetchOnReconnect: false,
		});
	return { dataGetSocialPlatform, loadingGetSocialPlatform };
};

export { useSocialPlatforms };
