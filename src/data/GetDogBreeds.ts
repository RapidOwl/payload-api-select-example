export default async function (): Promise<{ label: string; value: string }[]> {
	var data = await fetch(`https://dog.ceo/api/breeds/list/all`)
		.then((res) => res.json())
		.then((data) => {
			const breeds = Object.keys(data.message);

			return breeds.map((breed: string) => {
				return {
					label: breed,
					value: breed
				};
			});
		});

	return data;
}

type DogBreeds = {
	message: {
		[breed: string]: string[] | string
	}
	status: string
}