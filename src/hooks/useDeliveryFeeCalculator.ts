/** @format */

import { useState } from 'react';
import { calculateDeliveryFee } from '../utils/calculateDeliveryFee';

const useDeliveryFeeCalculator = () => {
	// State for user inputs
	const [cartValue, setCartValue] = useState<number>(0);
	const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
	const [numberOfItems, setNumberOfItems] = useState<number>(0);
	const [orderTime, setOrderTime] = useState<Date>(new Date());

	// Function that calls the utility function
	const getDeliveryFee = () =>
		calculateDeliveryFee({
			cartValue,
			deliveryDistance,
			numberOfItems,
			orderTime,
		});

	return {
		cartValue,
		setCartValue,
		deliveryDistance,
		setDeliveryDistance,
		numberOfItems,
		setNumberOfItems,
		orderTime,
		setOrderTime,
		getDeliveryFee,
	};
};

export default useDeliveryFeeCalculator;
