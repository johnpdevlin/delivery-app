/** @format */

import { Dispatch, SetStateAction } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type DateTimeSelectProps = {
	value: Date;
	setValue: Dispatch<SetStateAction<Date>>;
	onlyAllowFuture?: boolean;
	dataTestId?: string;
};

const DateTimeSelect = ({
	value,
	setValue,
	onlyAllowFuture = false,
	dataTestId,
}: DateTimeSelectProps) => {
	return (
		<div>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DateTimePicker
					disablePast={onlyAllowFuture}
					value={dayjs(value)}
					onChange={(newValue) => {
						if (newValue && newValue.isValid()) {
							setValue(newValue.toDate());
						}
					}}
					data-test-id={dataTestId}
				/>
			</LocalizationProvider>
		</div>
	);
};

export default DateTimeSelect;
