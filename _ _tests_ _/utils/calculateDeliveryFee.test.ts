/** @format */

import {
	calculateDeliveryFee,
	calculateDistanceSurcharge,
	calculateSmallOrderSurcharge,
	calculateExtraItemsSurcharge,
	isRushHour,
} from '../../src/utils/calculateDeliveryFee';

describe('Delivery Fee Calculator', () => {
	// Test for small order surcharge
	describe('calculateSmallOrderSurcharge', () => {
		it('should calculate surcharge for orders below the small order threshold', () => {
			expect(calculateSmallOrderSurcharge(8)).toBe(2);
			expect(calculateSmallOrderSurcharge(5)).toBe(5);
			expect(calculateSmallOrderSurcharge(9.99)).toBeCloseTo(0.01);
			expect(calculateSmallOrderSurcharge(10)).toBe(0);
		});
	});

	describe('calculateDistanceSurcharge', () => {
		it('should calculate additional fees for distances over 1000 meters', () => {
			expect(calculateDistanceSurcharge(1000)).toBe(0);
			expect(calculateDistanceSurcharge(2000)).toBe(2);
		});

		it('should add surcharge just before the next increment', () => {
			expect(calculateDistanceSurcharge(1499)).toBe(1);
		});

		it('should add surcharge right at the increment point', () => {
			expect(calculateDistanceSurcharge(1500)).toBe(1);
		});

		it('should add surcharge just after the increment point', () => {
			expect(calculateDistanceSurcharge(1501)).toBe(2);
		});
	});

	describe('calculateExtraItemsSurcharge', () => {
		it('should calculate surcharge for more than 4 items', () => {
			expect(calculateExtraItemsSurcharge(4)).toBe(0);
			expect(calculateExtraItemsSurcharge(5)).toBe(0.5);
			expect(calculateExtraItemsSurcharge(13)).toBe(5.7); // (9 * 0.5) + 1.2
		});
	});

	// Test for rush hour check
	describe('isRushHour', () => {
		it('should return true during rush hour on Fridays', () => {
			const fridayRushHour = new Date('2021-10-22T16:00:00Z'); // Friday, 4 PM
			expect(isRushHour(fridayRushHour)).toBe(true);
		});

		it('should return false outside of rush hour', () => {
			const fridayMorning = new Date('2021-10-22T10:00:00Z'); // Friday, 10 AM
			const saturdayEvening = new Date('2021-10-23T18:00:00Z'); // Saturday, 6 PM
			expect(isRushHour(fridayMorning)).toBe(false);
			expect(isRushHour(saturdayEvening)).toBe(false);
		});
		it('should return true at the start of rush hour', () => {
			const startRushHour = new Date('2021-10-22T15:00:00Z');
			expect(isRushHour(startRushHour)).toBe(true);
		});

		it('should return false at the end of rush hour', () => {
			const endRushHour = new Date('2021-10-22T19:00:00Z');
			expect(isRushHour(endRushHour)).toBe(false);
		});

		it('should return false just before rush hour', () => {
			const beforeRushHour = new Date('2021-10-22T14:59:00Z');
			expect(isRushHour(beforeRushHour)).toBe(false);
		});

		it('should return false just after rush hour', () => {
			const afterRushHour = new Date('2021-10-22T19:01:00Z');
			expect(isRushHour(afterRushHour)).toBe(false);
		});
	});

	// Test for overall delivery fee calculation
	describe('calculateDeliveryFee', () => {
		it('should calculate the correct delivery fee based on various parameters', () => {
			const normalOrder = {
				cartValue: 20,
				deliveryDistance: 1200,
				numberOfItems: 3,
				orderTime: new Date('2021-10-22T10:00:00Z'), // Non-rush hour
			};
			expect(calculateDeliveryFee(normalOrder)).toBe(3); // Base fee + 1€ for distance

			const rushHourOrder = {
				...normalOrder,
				orderTime: new Date('2021-10-22T16:00:00Z'), // Rush hour
			};
			expect(calculateDeliveryFee(rushHourOrder)).toBeCloseTo(3.6); // Rush hour multiplier applied

			const freeDeliveryOrder = {
				...normalOrder,
				cartValue: 200, // Free delivery threshold
			};
			expect(calculateDeliveryFee(freeDeliveryOrder)).toBe(0);
		});
	});

	describe('calculateDeliveryFee', () => {
		it('should not exceed the maximum delivery fee', () => {
			const largeOrder = {
				cartValue: 100,
				deliveryDistance: 5000, // A large distance to incur high surcharges
				numberOfItems: 20, // A large number of items for bulk surcharge
				orderTime: new Date('2021-10-22T18:00:00Z'), // During rush hour
			};
			const fee = calculateDeliveryFee(largeOrder);
			expect(fee).toBeLessThanOrEqual(15); // Assuming MAX_FEE is the maximum allowed fee
		});
	});
});
