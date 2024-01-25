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
				format='DD/MM/YYYY'
				label={label}
				disablePast={onlyAllowFuture}
				openTo='hours'
				value={dayjs(value)}
				aria-label={`Input Date and Time for ${label}`}
				onChange={(newValue) => {
					if (newValue && newValue.isValid()) {
						setValue(newValue.toDate());
					}
				}}
				data-test-id={dataTestId}
				sx={{
					'& label.Mui-focused': {
						color: 'primary.main',
					},
					'& .MuiInputLabel-root': {
						color: 'ButtonShadow',
					},

					'& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'primary.main',

							'&:hover': {
								backgroundColor: 'grey',
							},
						},
				}}
			/>
		</LocalizationProvider>
	);
};

export default DateTimeSelect;
