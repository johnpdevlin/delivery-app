/** @format */

import React from 'react';
import { render, screen } from '@testing-library/react';
import DateTimeSelect from '../../src/components/Input/DateTimeSelect';
import '@testing-library/jest-dom';
import dayjs from 'dayjs';

console.log(React.version);

describe('DateTimeSelect Component', () => {
	// Mock Date for consistent testing
	const mockDate = new Date(2024, 5, 5, 12, 0);
	const mockSetValue = jest.fn();

	test('renders correctly', () => {
		render(
			<DateTimeSelect
				value={mockDate}
				label='Test Date Picker'
				setValue={mockSetValue}
				dataTestId='test-date-picker'
			/>
		);
		const inputElement = screen.getByLabelText('Test Date Picker');
		expect(inputElement).toBeInTheDocument();
	});

	test('Check contains html', () => {
		render(
			<DateTimeSelect
				value={mockDate}
				label='Test Date Picker'
				setValue={mockSetValue}
				dataTestId='test-date-picker'
			/>
		);
		expect(DateTimeSelect).toContainHTML;
	});

	test('displays the correct date value', () => {
		render(
			<DateTimeSelect
				value={mockDate}
				label='Test Date Picker'
				setValue={mockSetValue}
				dataTestId='test-date-picker'
			/>
		);
		const inputElement = screen.getByLabelText(
			'Test Date Picker'
		) as HTMLInputElement; // Type assertion

		// Format the mockDate to match the expected format in the input element
		const expectedDate = dayjs(mockDate).format('DD/MM/YYYY HH:mm');
		expect(inputElement.value).toBe(expectedDate);
	});
});
