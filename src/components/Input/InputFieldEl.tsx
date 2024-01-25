/** @format */
import { Dispatch, SetStateAction } from 'react';
import { TextField, InputAdornment } from '@mui/material';

type InputElementProps = {
	dataTestId: string;
	value: string | number;
	setValue: Dispatch<SetStateAction<string | number>>;
	adornment?: string;
	adornmentPosition?: 'start' | 'end';
	type?: 'number' | 'text';
	label: string;
	minNumber?: number;
	allowDecimals?: boolean; // New optional prop for decimal handling
};

function InputEl({
	dataTestId,
	label,
	value,
	setValue,
	adornmentPosition = 'end',
	adornment,
	type = 'text',
	minNumber = 0,
	allowDecimals = false,
}: InputElementProps) {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (type === 'text') setValue(e.target.value);
		else if (type === 'number') {
			if (allowDecimals) {
				// For decimal values, parse as float
				const parsedValue = parseFloat(e.target.value);
				if (!isNaN(parsedValue))
					setValue(parsedValue >= minNumber ? parsedValue : minNumber);
			} else {
				// For integer values, parse as int
				const parsedValue = parseInt(e.target.value, 10);
				setValue(
					!isNaN(parsedValue) && parsedValue >= minNumber
						? parsedValue
						: minNumber
				);
			}
		}
	};

	const handleBlur = () => {
		if (allowDecimals && typeof value === 'number')
			// Round to two decimal places on blur
			setValue(Math.round((value + Number.EPSILON) * 100) / 100);
	};

	return (
		<TextField
			label={label}
			variant='filled'
			fullWidth
			aria-label={`Input ${type} for ${label}`}
			type={type}
			data-test-id={dataTestId}
			InputProps={{
				startAdornment:
					adornmentPosition === 'start' ? (
						<InputAdornment position='start'>{adornment}</InputAdornment>
					) : undefined,
				endAdornment:
					adornmentPosition === 'end' ? (
						<InputAdornment position='end'>{adornment}</InputAdornment>
					) : undefined,
			}}
			value={value}
			onChange={handleInputChange}
			onBlur={handleBlur}
		/>
	);
}

export default InputEl;
