import qs from "qs";

export const normalizeQuery = (object: any = {}) => {
	const normalize = (theObject: any): any => {
		let result = null;
		if (Array.isArray(theObject)) {
			for (let i = 0; i < theObject.length; i++) {
				result = normalize(theObject[i]);
				if (result) {
					break;
				}
			}
		} else {
			for (const prop in theObject) {
				if (
					theObject[prop] instanceof Object ||
					Array.isArray(theObject[prop])
				) {
					normalize(theObject[prop]);
				}
				try {
					theObject[prop] = JSON.parse(theObject[prop]);
				} catch (error) {}
			}
		}
		return result;
	};
	normalize(object);
	return object;
};

export const getQuery = (request: Request) => {
	const query = request.url.split("?")[1];
	return normalizeQuery(
		qs.parse(query, { allowDots: true, depth: Number.POSITIVE_INFINITY }),
	);
};
