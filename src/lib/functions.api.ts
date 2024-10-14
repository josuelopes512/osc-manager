import api from "@/lib/api";
import type { DeleteData, GetData, PostData, PutData } from "@/types/api";
import { toast } from "react-toastify";

export const getData = async <TReturn>(val: GetData) => {
	const { url, query, id, signal } = val;
	const params = query ? `?${query}` : "";
	const idParam = id ? `/${id}` : "";
	const { data } = await api.get<TReturn>(`${url}${idParam}${params}`, {
		signal,
	});
	return data;
};

export const postData = async <TReturn, TForm>(val: PostData<TForm>) => {
	const { url, data: dataForm, signal } = val;

	const { data } = await api.post<TReturn>(url, dataForm, { signal });
	return data;
};

export const putData = async <TReturn, TForm>(val: PutData<TForm>) => {
	const { url, data: dataForm, id, signal } = val;
	const { data } = await api.put<TReturn>(`${url}/${id}`, dataForm, { signal });
	return data;
};

export const deleteData = async <TReturn>(val: DeleteData) => {
	const { url, id, signal } = val;
	const { data } = await api.delete<TReturn>(`${url}/${id}`, { signal });
	return data;
};

export const toastErrorsApi = (error: any, message?: string) => {
	if (error?.response) {
		if (error.response?.data.type) return toast.error(message);
		toast.error(error.response?.data.msg);
	} else toast.error("Error while trying to connect to the server");
};
