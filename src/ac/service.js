export function fetchData(url, options) {
	return new Promise((resolve, reject) => {
		fetch(`${url}`, options)
			.then(async (res) => {
				if (res.status >= 400) throw new Error(res.statusText);
				const response = await res.json();
				return response;
			})
			.then(resolve)
			.catch(reject);
	})
}
