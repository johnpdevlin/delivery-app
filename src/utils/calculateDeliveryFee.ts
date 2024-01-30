/** @format */

// Constants related to fees and thresholds
const BASE_FEE = 2;
const MAX_FEE = 15;
const FREE_DELIVERY_CART_VALUE = 200;
const SMALL_ORDER_THRESHOLD = 10;
const BULK_ITEM_THRESHOLD = 12;
const ITEM_SURCHARGE = 0.5;
const BULK_SURCHARGE = 1.2;

// Constants related to delivery distance
const DISTANCE_THRESHOLD = 1000; // meters
const ADDITIONAL_DISTANCE_FEE = 1.0; // euros
const ADDITIONAL_DISTANCE_UNIT = 500; // meters

// Constants related to rush hour timing
const RUSH_HOUR_DAY = 5; // Friday
const RUSH_HOUR_START_HOUR = 15; // 3 PM
const RUSH_HOUR_END_HOUR = 19; // 7 PM
const RUSH_HOUR_MULTIPLIER = 1.2;

type CalculateDeliveryFeeParams = {
	cartValue: number;
	deliveryDistance: number;
	numberOfItems: number;
	orderTime: Date;
};

export const calculateDeliveryFee = ({
	cartValue,
	deliveryDistance,
	numberOfItems,
	orderTime,
}: CalculateDeliveryFeeParams): number => {
	if (cartValue >= FREE_DELIVERY_CART_VALUE) return 0;

	let deliveryFee =
		BASE_FEE +
		calculateSmallOrderSurcharge(cartValue) +
		calculateDistanceSurcharge(deliveryDistance) +
		calculateExtraItemsSurcharge(numberOfItems);

	if (isRushHour(orderTime)) {
		deliveryFee *= RUSH_HOUR_MULTIPLIER;
	}

	return roundToTwoDecimalPlaces(Math.min(deliveryFee, MAX_FEE));
};

export const calculateSmallOrderSurcharge = (cartValue: number): number =>
	cartValue < SMALL_ORDER_THRESHOLD ? SMALL_ORDER_THRESHOLD - cartValue : 0;

export const calculateDistanceSurcharge = (deliveryDistance: number): number =>
	deliveryDistance > DISTANCE_THRESHOLD
		? Math.ceil(
				(deliveryDistance - DISTANCE_THRESHOLD) / ADDITIONAL_DISTANCE_UNIT
		  ) * ADDITIONAL_DISTANCE_FEE
		: 0;

export const calculateExtraItemsSurcharge = (numberOfItems: number): number => {
	if (numberOfItems < 5) return 0;
	let surcharge = (numberOfItems - 4) * ITEM_SURCHARGE;
	if (numberOfItems > BULK_ITEM_THRESHOLD) surcharge += BULK_SURCHARGE;
	return surcharge;
};

export const isRushHour = (orderTime: Date, timeZone = 'UTC'): boolean => {
	const localTime = new Date(orderTime.toLocaleString('en-US', { timeZone }));
	return (
		localTime.getDay() === RUSH_HOUR_DAY &&
		localTime.getHours() >= RUSH_HOUR_START_HOUR &&
		localTime.getHours() < RUSH_HOUR_END_HOUR
	);
};

export const roundToTwoDecimalPlaces = (amount: number): number =>
	Math.round(amount * 100) / 100;
