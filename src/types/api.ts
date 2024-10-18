export interface ContextApiProps {
	params?: { id?: string };
}
export interface GetData {
	url: string;
	query?: string;
	id?: number;
	signal?: AbortSignal;
}

export interface PostData<TForm> {
	url: string;
	data: TForm;
	signal?: AbortSignal;
}
export interface PutData<TForm> {
	url: string;
	data: TForm;
	id: number;
	signal?: AbortSignal;
}
export interface DeleteData {
	id: number;
	url: string;
	signal?: AbortSignal;
}

export interface DefaultAPIRequest {
	googleId?: string;
}

export interface DefaultAPI {
	id: number;
	createdAt: string;
	updateAt: string;
}
export interface PUTDefaultDTO {
	id: number;
}
export interface DeleteDefaultDTO {
	id: number;
}
