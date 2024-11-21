import type { ArrayPath, Control, FieldValues } from "react-hook-form";

export type NestedFieldArrayProps<T extends FieldValues> = {
	control: Control<T>;
	name: ArrayPath<T>;
};
