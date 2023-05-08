import { CollectionConfig } from 'payload/types';
import DogBreedApiSelect from '../api-select/DogBreedApiSelect';

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
			admin: {
				components: {
					Field: DogBreedApiSelect,
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
