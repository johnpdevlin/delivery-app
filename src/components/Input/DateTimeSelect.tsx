/** @format */

import { Dispatch, SetStateAction } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type DateTimeSelectProps = {
	value: Date;
	label: string;
	setValue: Dispatch<SetStateAction<Date>>;
	onlyAllowFuture?: boolean;
	dataTestId?: string;
};

const DateTimeSelect = ({
	value,
	label,
	setValue,
	onlyAllowFuture = false,
	dataTestId,
}: DateTimeSelectProps) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DateTimePicker
				format='DD/MM/YYYY hh:mm'
				label={label}
				openTo='hours'
				disablePast={onlyAllowFuture}
				value={dayjs(value)}
				aria-label={`Input Date and Time for ${label}`}
				onChange={(newValue) => {
					if (newValue && newValue.isValid()) {
						setValue(newValue.toDate());
					}
				}}
				data-test-id={dataTestId}
				sx={styleProps}
			/>
		</LocalizationProvider>
	);
};

export default DateTimeSelect;

const styleProps = {
	color: 'rgba(0, 0, 0, 0.60)',
	backgroundColor: 'rgba(0, 0, 0, 0.06)',
	borderTopLeftRadius: '4px',
	borderTopRightRadius: '4px',
	// Override error class here as component mistakenly throws errors and changes colour
	'& .MuiInputLabel-root.Mui-error': {
		color: 'rgba(0, 0, 0, 0.60)',
	},

	'& .MuiOutlinedInput-root': {
		position: 'relative',
		'& fieldset': {
			border: 'none',
		},
		'&::before': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
		},
		'&:after': {
			borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
			transform: 'scaleX(0)',
			transformOrigin: 'center',
			transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1)',
		},
		'&:hover::before, &:hover::after': {
			borderBottom: '1px solid rgba(0, 0, 0, 0.87)',
			color: 'rgba(0, 0, 0, 0.87)',
		},

		'&.Mui-focused::before': {
			transform: 'scaleX(1)',
			transformOrigin: 'center',
			transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1)',
			borderBottom: '2px solid',
			borderColor: 'primary.main',
		},
		' &.Mui-focused::after': {
			transform: 'scaleX(0)',
			transformOrigin: 'center',
			transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1)',
			borderBottom: '2px solid',
			borderColor: 'primary.main',
		},
	},
	'& .MuiInputLabel-root': {
		color: 'rgba(0, 0, 0, 0.60)',
		'&.Mui-focused': {
			color: 'primary.main',
		},

		'& .MuiInputBase-root': {
			paddingRight: '20px',
			transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1)',
			'&:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.04)',
			},
		},
	},
};
