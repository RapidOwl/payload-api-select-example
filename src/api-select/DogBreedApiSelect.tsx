import React from 'react';
import ApiSelect from "./ApiSelect";
import GetDogBreeds from '../data/GetDogBreeds';

const DogBreedApiSelect: typeof ApiSelect = (props) => {
	return <ApiSelect {...props} loader={GetDogBreeds} />;
}

export default DogBreedApiSelect;