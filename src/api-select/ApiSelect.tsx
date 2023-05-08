import React, { useCallback, useEffect, useState } from 'react';
import { withCondition } from 'payload/components/forms';
import {
	useField,
	SelectInput,
} from "payload/components/forms";
import { select } from 'payload/dist/fields/validations';
import { Props } from 'payload/dist/admin/components/forms/field-types/Select/types';

const ApiSelect: React.FC<Props> = (props) => {
	const {
		path: pathFromProps,
		name,
		validate = select,
		label,
		hasMany,
		required,
		custom,
		admin: {
			readOnly = false,
			style = {},
			className = '',
			width = '100%',
			description = '',
			isClearable = true,
			condition = null,
			isSortable = false,
		} = {},
	} = props;

	const path = pathFromProps || name;

	const [options, setOptions] = useState([{ label: "Loading...", value: "" }]);

	// Always default read only to true because the data is loaded as an effect
	const [isReadOnly, setIsReadOnly] = useState(true);

	useEffect(() => {
		async function getData() {
			setOptions(await custom.loader());
			setIsReadOnly(readOnly);
		}

		// Have to wrap the async function in this way because useEffect can't be async
		getData();
	}, []);

	const memoizedValidate = useCallback((value, validationOptions) => {
		return validate(value, { ...validationOptions, options, hasMany, required });
	}, [validate, required, hasMany, options]);

	const {
		value,
		showError,
		setValue,
		errorMessage,
	} = useField({
		path,
		validate: memoizedValidate,
		condition,
	});

	const onChange = useCallback((selectedOption) => {
		if (!readOnly) {
			let newValue;
			if (!selectedOption) {
				newValue = null;
			} else if (hasMany) {
				if (Array.isArray(selectedOption)) {
					newValue = selectedOption.map((option) => option.value);
				} else {
					newValue = [];
				}
			} else {
				newValue = selectedOption.value;
			}

			setValue(newValue);
		}
	}, [
		readOnly,
		hasMany,
		setValue,
	]);

	return (
		<SelectInput
			path={path}
			onChange={onChange}
			value={value as string | string[]}
			name={name}
			options={options}
			label={label}
			showError={showError}
			errorMessage={errorMessage}
			required={required}
			readOnly={isReadOnly}
			description={description}
			style={style}
			className={className}
			width={width}
			hasMany={hasMany}
			isSortable={isSortable}
			isClearable={isClearable}
		/>
	);
};

export default withCondition(ApiSelect);