/** @format */

import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Dispatch, SetStateAction } from 'react';

type InputElementProps = {
	dataTestId: string;
	value: string | number;
	setValue: Dispatch<SetStateAction<string | number>>;
	adornment?: string;
	adornmentPosition?: 'start' | 'end';
	type?: 'number' | 'text';
	ariaLabel?: string;
	minNumber?: number;
	allowDecimals?: boolean; // New optional prop for decimal handling
};

export default function InputEl({
	dataTestId,
	value,
	setValue,
	adornmentPosition = 'end',
	adornment,
	ariaLabel,
	type = 'text',
	minNumber = 0,
	allowDecimals = false,
}: InputElementProps) {
	const adornmentEl = adornment ? (
		<InputAdornment position={adornmentPosition}>{adornment}</InputAdornment>
	) : null;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (type === 'text') {
			setValue(e.target.value);
		} else if (type === 'number') {
			if (allowDecimals) {
				// For decimal values, parse as float
				const parsedValue = parseFloat(e.target.value);
				if (!isNaN(parsedValue)) {
					setValue(parsedValue >= minNumber ? parsedValue : minNumber);
				}
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
		if (allowDecimals && typeof value === 'number') {
			// Round to two decimal places on blur
			setValue(Math.round((value + Number.EPSILON) * 100) / 100);
		}
	};

	return (
		<OutlinedInput
			fullWidth
			type={type}
			data-test-id={dataTestId}
			startAdornment={adornmentPosition === 'start' ? adornmentEl : undefined}
			endAdornment={adornmentPosition === 'end' ? adornmentEl : undefined}
			aria-label={ariaLabel}
			value={value}
			onChange={handleInputChange}
			onBlur={handleBlur}
		/>
	);
}
