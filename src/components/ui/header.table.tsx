"use client";

import type { ColumnProps } from "@/app/components/table/types";
import { useTableSearch } from "@/hooks/use-table-search";
import { Button, Input, Tooltip } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft, FaFileExcel, FaPlus, FaSearch } from "react-icons/fa";

interface HeaderTableProps<TData extends Record<string, any>> {
	path: string;
	defaultText?: string;
	newText?: string;
	filterColumns?: ColumnProps<TData>[];
	newItem?: boolean;
	pathNew?: string;
}

const HeaderTable = <TData extends Record<string, any>>({
	newText,
	path,
	defaultText,
	filterColumns = [],
	newItem = true,
}: HeaderTableProps<TData>) => {
	const pathname = usePathname();
	const listagem = pathname === `/${path}`;
	const pathNew = pathname.includes("/new");
	const hadDigit = pathname.split("/").slice(-1)[0].match(/\d+/);
	const router = useRouter();
	const { setSearch, data } = useTableSearch();

	const searchPlaceholder = `Procurar por ${
		filterColumns.length > 1
			? `${filterColumns
					.slice(0, -1)
					.map((a) => a.label.toLowerCase())
					.join(", ")} ou `
			: ""
	}${filterColumns.slice(-1)[0].label.toLowerCase()}`;

	return (
		<div className="flex justify-between gap-5">
			<div className="flex w-full justify-end gap-5">
				{listagem && (
					<>
						<Input
							className="max-w-xl"
							size="sm"
							classNames={{
								inputWrapper: "rounded-full h-10",
								input: "px-4",
							}}
							placeholder={searchPlaceholder}
							title={searchPlaceholder}
							aria-label={searchPlaceholder}
							onChange={(e) => {
								setSearch(e.target.value);
							}}
							startContent={
								<FaSearch className="mr-2 hidden md:flex" size={20} />
							}
						/>
						{newItem && (
							<Tooltip
								content={`${newText || `Novo ${defaultText}`}`}
								placement="bottom-end"
								color="primary"
							>
								<Button
									isIconOnly
									color="default"
									className="rounded-full"
									onClick={() => router.push(`/${path}/new`)}
								>
									<FaPlus size={20} />
								</Button>
							</Tooltip>
						)}
					</>
				)}
				{!listagem && (
					<Tooltip content="Voltar" placement="bottom-end" color="primary">
						<Button
							color="primary"
							isIconOnly
							onClick={() => router.push(`/${path}`)}
							className="rounded-full"
						>
							<FaArrowLeft size={20} />
						</Button>
					</Tooltip>
				)}
			</div>
		</div>
	);
};

export default HeaderTable;
