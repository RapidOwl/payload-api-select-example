import { CollectionConfig } from 'payload/types';
import GetDogBreeds from '../data/GetDogBreeds';
import ApiSelect from '../api-select/ApiSelect';

const Dogs: CollectionConfig = {
	slug: 'dog-metadata',
	admin: {
		useAsTitle: 'dogName',
		defaultColumns: ['dogName', 'breed'],
		group: 'Dogs',
	},
	fields: [
		{
			name: 'dogName',
			label: 'Name',
			type: 'text',
			index: true,
			required: true,
		},
		{
			name: 'breed',
			label: 'Breed',
			type: 'text',
			required: true,
			custom: {
				loader: GetDogBreeds
			},
			admin: {
				components: {
					Field: ApiSelect,
				},
			},
		},
		{
			name: 'SomeLovelyCompliments',
			label: 'Some Lovely Compliments',
			type: 'textarea',
			required: true,
			maxLength: 500,
		}
	],
};

export default Dogs;
