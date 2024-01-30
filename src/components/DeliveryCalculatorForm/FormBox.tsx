/** @format */

import {
	Box,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	Stack,
	Typography,
} from '@mui/material';

import useDeliveryFeeCalculator from '../../hooks/useDeliveryFeeCalculator';
import DateTimeSelect from '../Input/DateTimeSelect';
import InputEl from '../Input/InputFieldEl';
import { useEffect, useState } from 'react';

const FormBox = (): JSX.Element => {
	const {
		cartValue,
		setCartValue,
		deliveryDistance,
		setDeliveryDistance,
		numberOfItems,
		setNumberOfItems,
		orderTime,
		setOrderTime,
		getDeliveryFee,
	} = useDeliveryFeeCalculator();

	const [deliveryFee, setDeliveryFee] = useState(0);
	useEffect(() => {
		setDeliveryFee(getDeliveryFee);
	});
	return (
		<>
			<Card arial-label='Delivery fee calculator' sx={{}}>
				<CardHeader
					title={
						<Typography variant='h4' color='primary'>
							Delivery Fee Calculator
						</Typography>
					}
				/>

				<CardContent sx={{ px: 4, py: 4 }}>
					<FormControl fullWidth>
						<Stack direction='column' spacing={2}>
							<InputEl
								label='Cart Value'
								dataTestId='cartValue'
								type='number'
								adornment='€'
								adornmentPosition='start'
								value={cartValue}
								setValue={setCartValue}
								minNumber={0.0}
								allowDecimals={true}
							/>

							<InputEl
								label='Delivery Distance'
								type='number'
								dataTestId='deliveryDistance'
								adornment='m'
								adornmentPosition='end'
								value={deliveryDistance}
								setValue={setDeliveryDistance}
							/>

							<InputEl
								label='Number of Items'
								type='number'
								dataTestId='numberOfItems'
								value={numberOfItems}
								setValue={setNumberOfItems}
							/>

							<DateTimeSelect
								label='Order Time'
								setValue={setOrderTime}
								value={orderTime}
								onlyAllowFuture={true}
								dataTestId='orderTime'
							/>
						</Stack>
					</FormControl>
					<Box pt={3}>
						<>
							<Typography
								variant='h2'
								textAlign='center'
								color='primary'
								aria-label='Calculated Delivery fee'>
								€{deliveryFee}
							</Typography>
							<Typography variant='caption' textAlign='center'>
								Estimated Delivery Fee
							</Typography>
						</>
					</Box>
				</CardContent>
			</Card>
		</>
	);
};

export default FormBox;
