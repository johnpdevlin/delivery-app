/** @format */

import { renderHook, act } from '@testing-library/react';
import useDeliveryFeeCalculator from '../../src/hooks/useDeliveryFeeCalculator';
import * as calculateDeliveryFeeModule from '../../src/utils/calculateDeliveryFee';

jest.mock('../../src/utils/calculateDeliveryFee');

const mockedCalculateDeliveryFee =
	calculateDeliveryFeeModule.calculateDeliveryFee as jest.Mock;

describe('useDeliveryFeeCalculator', () => {
	afterEach(() => {
		mockedCalculateDeliveryFee.mockReset();
	});
	it('should initialize with default values', () => {
		const { result } = renderHook(() => useDeliveryFeeCalculator());

		expect(result.current.cartValue).toBe(0);
		expect(result.current.deliveryDistance).toBe(0);
		expect(result.current.numberOfItems).toBe(0);
		expect(result.current.orderTime).toBeInstanceOf(Date);
	});

	it('should update cart value', () => {
		const { result } = renderHook(() => useDeliveryFeeCalculator());

		act(() => {
			result.current.setCartValue(50);
		});

		expect(result.current.cartValue).toBe(50);
	});

	it('should update delivery distance', () => {
		const { result } = renderHook(() => useDeliveryFeeCalculator());

		act(() => {
			result.current.setDeliveryDistance(500);
		});

		expect(result.current.deliveryDistance).toBe(500);
	});

	it('should update order time', () => {
		const { result } = renderHook(() => useDeliveryFeeCalculator());
		const date = new Date();

		act(() => {
			result.current.setOrderTime(date);
		});

		expect(result.current.orderTime).toBe(date);
	});

	it('should number of items', () => {
		const { result } = renderHook(() => useDeliveryFeeCalculator());

		act(() => {
			result.current.setNumberOfItems(3);
		});

		expect(result.current.numberOfItems).toBe(3);
	});

	// Similar tests for deliveryDistance, numberOfItems, and orderTime
	it('should call calculateDeliveryFee with correct parameters', () => {
		const mockFee = 7.5;
		mockedCalculateDeliveryFee.mockImplementation(() => mockFee);

		const { result } = renderHook(() => useDeliveryFeeCalculator());

		act(() => {
			result.current.setCartValue(50);
			result.current.setDeliveryDistance(1000);
			result.current.setNumberOfItems(3);
			result.current.setOrderTime(new Date('2022-01-01T12:00:00Z'));
		});

		const fee = result.current.getDeliveryFee();

		expect(mockedCalculateDeliveryFee).toHaveBeenCalledWith({
			cartValue: 50,
			deliveryDistance: 1000,
			numberOfItems: 3,
			orderTime: expect.any(Date),
		});
		expect(fee).toBe(mockFee);
	});
});
