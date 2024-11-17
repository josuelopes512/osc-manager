import {
	Button,
	Chip,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Listbox,
	ListboxItem,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Pagination,
	Select,
	SelectItem,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

interface ComboboxProps<T extends object> {
	data: T[];
	value: string | string[];
	onChange: (value: string | string[]) => void;
	id: string;
	label: string;
	idKey?: keyof T;
	textValueKey: keyof T;
	filterKey: (keyof T)[];
	itemRenderer: (item: T) => React.ReactNode;
	labelChipRenderer?: (item: T) => React.ReactNode;
	isRequired?: boolean;
	isMultiple?: boolean;
	isInvalid?: boolean;
	errorMessage?: string;
}

export function Combobox<T extends object>({
	data,
	value,
	onChange,
	label,
	idKey = "id" as keyof T,
	textValueKey,
	filterKey,
	itemRenderer: ItemRenderer,
	labelChipRenderer: LabelChipRenderer,
	isRequired = false,
	isMultiple = false,
	isInvalid = false,
	errorMessage,
	id,
}: ComboboxProps<T>) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [search, setSearch] = useState("");
	const hasSearchFilter = Boolean(search);

	const sortedItems = useMemo(() => {
		if (!data) return [];
		const selectedSet = new Set(value);
		return data.sort((a, b) => {
			const aSelected = selectedSet.has(String(a[idKey]));
			const bSelected = selectedSet.has(String(b[idKey]));
			if (aSelected && !bSelected) return -1;
			if (!aSelected && bSelected) return 1;
			return 0;
		});
	}, [data, value, idKey]);

	const filteredData = useMemo(() => {
		if (!sortedItems?.length) return [];
		let filteredData = [...sortedItems];

		if (hasSearchFilter) {
			filteredData = filteredData.filter((item) =>
				filterKey.some((key) =>
					String(item[key]).toLowerCase().includes(search.toLowerCase()),
				),
			);
		}

		return filteredData;
	}, [sortedItems, filterKey, hasSearchFilter, search]);

	const [page, setPage] = useState(1);

	const [rowsPerPage, setRowsPerPage] = useState(20);
	const onRowsPerPageChange = useCallback((value: number) => {
		setRowsPerPage(value);
		setPage(1);
	}, []);

	const rowsPagination = useMemo(() => [10, 15, 20, 50, 100], []);

	const pages = Math.ceil(filteredData.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredData.slice(start, end);
	}, [page, filteredData, rowsPerPage]);

	useEffect(() => {
		console.log("selectedKeys items", value);
	}, [value]);

	const Items = () => (
		<Listbox
			items={items ?? []}
			aria-label={String(textValueKey)}
			onAction={
				!isMultiple
					? (key) => {
							onChange(String(key));
							onClose();
						}
					: undefined
			}
			emptyContent={`Nenhum ${label.toLowerCase()} encontrado`}
			selectionMode={isMultiple ? "multiple" : "none"}
			selectedKeys={value}
			onSelectionChange={(val) => {
				onChange(Array.from(val as any).map((a) => String(a)));
			}}
		>
			{(item) => (
				<ListboxItem
					key={String(item[idKey])}
					textValue={String(item[textValueKey])}
					classNames={{
						base: 'data-[selected="true"]:bg-default',
					}}
				>
					{ItemRenderer(item)}
				</ListboxItem>
			)}
		</Listbox>
	);

	const SingleComboBox = () => (
		<Input
			classNames={{
				label: "cursor-pointer w-full",
				input: "cursor-pointer",
			}}
			onClick={onOpen}
			onSelect={onOpen}
			variant="bordered"
			color="primary"
			value={
				value
					? String(
							data.find(
								(a) =>
									String(a[idKey]).toLowerCase() ===
									value?.toString().toLowerCase(),
							)?.[textValueKey],
						)
					: ""
			}
			id={id}
			name={id}
			label={label}
			isRequired={isRequired}
			isInvalid={isInvalid}
			errorMessage={errorMessage}
			isReadOnly
			onInput={() => onOpen()}
			onFocus={() => onOpen()}
			endContent={
				!value ? null : (
					<Button
						size="sm"
						variant="light"
						radius="full"
						onClick={() => {
							onChange("");
						}}
						isIconOnly
					>
						<FaTimes />
					</Button>
				)
			}
		/>
	);

	const MultipleComboBox = () => (
		<>
			<Select
				label={label}
				onSelectionChange={(value) => console.log(value)}
				selectedKeys={value}
				variant="bordered"
				color="primary"
				classNames={{
					value: "text-foreground",
					label: "overflow-visible",
				}}
				items={data}
				selectionMode="multiple"
				isMultiline={value?.length > 0}
				onOpenChange={() => onOpen()}
				id={id}
				name={id}
				isRequired={isRequired}
				isInvalid={isInvalid}
				errorMessage={errorMessage}
				renderValue={(items) => (
					<div className="flex flex-wrap gap-2">
						{items.map((item) => (
							<div key={item.key ?? ""}>
								<Chip
									isCloseable
									onClose={() => {
										// setSelectedKeys((prev) => {
										// 	if (!prev) return new Set();
										// 	prev.delete(item.key as string);
										// 	return new Set(prev);
										// });
										// console.log("item", selectedKeys);
										onChange(Array.from(value).filter((a) => a !== item.key));
									}}
								>
									{LabelChipRenderer
										? LabelChipRenderer(
												items.find((a) => a.key === (item.key ?? ""))
													?.data as T,
											)
										: String(
												items.find((a) => a.key === (item.key ?? ""))?.data?.[
													textValueKey
												],
											)}
								</Chip>
							</div>
						))}
					</div>
				)}
			>
				{(item) => (
					<SelectItem key={String(item[idKey])} className="capitalize">
						{label}
					</SelectItem>
				)}
			</Select>
		</>
	);

	const selectAllItems = () => {
		const allSelected = filteredData.length === Array.from(value)?.length;
		if (allSelected) {
			onChange([]);
		} else {
			onChange(filteredData.map((a) => String(a[idKey])));
		}
	};

	useEffect(() => {
		const getModal = async () => {
			const modalElement = document.querySelector(
				'div div[data-slot="wrapper"].z-50',
			);

			if (isOpen && modalElement) {
				if (modalElement instanceof HTMLElement) {
					const delay = (ms: number) => {
						return new Promise((resolve) => setTimeout(resolve, ms));
					};
					await delay(1200);
					modalElement.style.willChange = "auto";
				}
			}
		};
		getModal();
	}, [isOpen]);

	return (
		<>
			{!isMultiple ? <SingleComboBox /> : <MultipleComboBox />}
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				classNames={{
					wrapper: "h-[calc(100dvh - 2.5rem)] top-10 rounded-md scale-100",
				}}
				size="full"
				// biome-ignore lint/complexity/noUselessFragments: <explanation>
				closeButton={<></>}
			>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex items-center gap-4">
								<Input
									label="Pesquisa"
									type="text"
									min={0}
									onChange={(e) => {
										setSearch(e.target.value);
										setPage(1);
									}}
									value={search}
									variant="bordered"
									color="primary"
									autoFocus
								/>
								{isMultiple && (
									<Tooltip
										content="Selecionar todos"
										placement="bottom-end"
										color="primary"
									>
										<Button
											variant="flat"
											onClick={selectAllItems}
											className="rounded-full"
											isIconOnly
										>
											<FaListCheck />
										</Button>
									</Tooltip>
								)}
							</ModalHeader>
							<ModalBody className="max-h-[60dvh] flex-none overflow-auto">
								<Items />
							</ModalBody>
							<ModalFooter className="items-center justify-center p-0">
								<div className="flex flex-col gap-4">
									{isMultiple && (
										<Button
											variant="flat"
											onClick={onClose}
											className="mt-4 w-full"
										>
											Confirmar
										</Button>
									)}
									<Pagination
										showControls
										showShadow
										color="primary"
										size="sm"
										initialPage={page}
										page={page}
										total={pages === 0 ? 1 : pages}
										onChange={setPage}
										variant="light"
										classNames={{
											cursor: "font-bold",
											base: "flex justify-center",
										}}
									/>
									<div className="flex items-center justify-between">
										<span className="text-small dark:text-default-400">
											Total de {filteredData.length} registros
										</span>
										<Dropdown>
											<DropdownTrigger>
												<Button variant="light" size="sm">
													<span className="mr-2 text-small dark:text-default-400">
														Paginação de
													</span>
													{rowsPerPage}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												variant="light"
												aria-label="Paginação"
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={[rowsPerPage]}
											>
												{rowsPagination.map((value) => (
													<DropdownItem
														key={value}
														onClick={() => onRowsPerPageChange(value)}
													>
														{value}
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									</div>
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
