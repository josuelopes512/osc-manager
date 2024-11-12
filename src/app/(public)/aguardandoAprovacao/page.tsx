"use client";

import CheckStatus from "./checkStatus";

export default function AwaitingApproval() {
	return (
		<div className="flex w-full h-screen items-center justify-center bg-content1">
			<div className="flex flex-col justify-center items-center gap-4 p-8 rounded-lg shadow-lg">
				<CheckStatus />
			</div>
		</div>
	);
}
