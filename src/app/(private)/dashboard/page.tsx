import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex items-center justify-center w-full">
			<iframe
				title="Google Sheets"
				className="w-[1435px] overflow-x-hidden h-screen border-0 bg-black"
				allowFullScreen
				width={640}
				height={1705}
				src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTYeey6PnXWMDA_VPlarT6dJ6t_BYKA6cbd7RxY6lXaJgkET_2Y7vaiN1EOAOoB-p8XJppZ2_aWoRAZ/pubhtml?gid=179606886&amp;single=true&amp;widget=true&amp;headers=false"
			/>
		</div>
	);
}
