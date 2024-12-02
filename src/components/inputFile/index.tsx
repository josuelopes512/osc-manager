"use client";
import { Button, cn } from "@nextui-org/react";
import { type InputHTMLAttributes, useState } from "react";
import { FaUpload } from "react-icons/fa";

interface InputFileProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	onChange: (file: File) => void;
	isRequired?: boolean;
	label?: string;
}

export function InputFile({
	onChange,
	isRequired,
	label,
	...props
}: InputFileProps) {
	const [file, setFile] = useState<File>();
	return (
		<label
			data-slot="input-wrapper"
			className={cn(
				"relative w-full inline-flex tap-highlight-transparent shadow-sm px-3",
				"border-medium border-default-200 data-[hover=true]:border-default-400",
				"group-data-[focus=true]:border-default-foreground min-h-10 rounded-medium",
				"flex-col items-start justify-center gap-0 !duration-150",
				"transition-colors motion-reduce:transition-none h-14 py-2",
			)}
		>
			<span
				data-slot="label"
				className={cn(
					"absolute z-10 pointer-events-none origin-top-left rtl:origin-top-right subpixel-antialiased",
					"block text-foreground-500 OSCr-text",
					isRequired && "after:content-['*'] after:text-danger after:ml-0.5",
					"will-change-auto !duration-200 !ease-out motion-reduce:transition-none",
					"transition-[transform,color,left,opacity] text-small pe-2 max-w-full",
					"text-ellipsis overflow-hidden",
					file && "text-default-600 pointer-events-auto scale-85",
					file &&
						"-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px_-_theme(borderWidth.medium))]",
				)}
			>
				{label}
			</span>
			{file && (
				<div className="flex translate-y-6 w-full justify-between">
					{file.name}
				</div>
			)}

			<div
				data-slot="inner-wrapper"
				className="inline-flex w-full items-center justify-end h-full box-border group-data-[has-label=true]:items-end"
			>
				<input
					data-slot="input"
					type="file"
					className="hidden"
					multiple
					{...props}
					onChange={(e) => {
						if (e.target.files) {
							setFile(e.target.files[0]);
							onChange(e.target.files[0]);
						}
					}}
					// value={value}
				/>
				<Button
					isIconOnly
					variant="light"
					radius="full"
					size="sm"
					className={cn("-mr-2", file && "mb-2")}
				>
					<FaUpload className="text-xl text-foreground-500" />
				</Button>
			</div>
		</label>
	);
}
