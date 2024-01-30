/** @format */
import React from 'react';
import {
	render,
	screen,
	// fireEvent
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import InputFieldEl from '../../../src/components/Input/InputFieldEl';
import '@testing-library/jest-dom';

console.log(React.version);

describe('InputEl Component', () => {
	test('renders correctly', () => {
		render(
			<InputFieldEl
				label='Test Input'
				value='test'
				setValue={() => {}}
				dataTestId='test-input'
			/>
		);
		const inputElement = screen.getByLabelText('Input text for Test Input');
		expect(inputElement).toBeInTheDocument();
	});
	test('Check contains html', () => {
		render(
			<InputFieldEl
				label='Test Input'
				value={'test'}
				setValue={() => {}}
				dataTestId='test-input'
			/>
		);
		expect(InputFieldEl).toContainHTML;
	});

	test('displays the correct value', () => {
		render(
			<InputFieldEl
				label='Test Input'
				value={'test'}
				setValue={() => {}}
				dataTestId='test-input'
			/>
		);
		const inputElement = screen.getByLabelText(
			'Test Input'
		) as HTMLInputElement; // Type assertion
		expect(inputElement.value).toBe('test');
	});

	test('displays start adornment when provided', () => {
		render(
			<InputFieldEl
				label='Amount'
				type='number'
				adornment='€'
				adornmentPosition='start'
				value=''
				setValue={() => {}}
				dataTestId='test-input'
			/>
		);
		const adornmentElement = screen.getByText('€');
		expect(adornmentElement).toBeInTheDocument();
	});
});
