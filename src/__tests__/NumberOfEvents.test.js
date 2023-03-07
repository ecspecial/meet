import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents component />', () => {

    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    })

    test('renders NumberOfEvents component', () => {
        expect(NumberOfEventsWrapper).toBeDefined();
    });

    test('renders events number div', () => {
        expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
    });

    test('renders correct default search bar and label', () => {
        expect(NumberOfEventsWrapper.find('.events-number-label')).toHaveLength(1);
        expect(NumberOfEventsWrapper.find('.events-number-label').text()).toBe('Number of Events');
        expect(NumberOfEventsWrapper.find('.events-number-search')).toHaveLength(1);
    });

    test('renders default events number state value', () => {
        expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(32);
        expect(NumberOfEventsWrapper.find('.events-number-search').prop('value')).toBe(NumberOfEventsWrapper.state('eventsNumber'));
    });

    test('renders state on change correctly', () => {
        NumberOfEventsWrapper.setState({ eventsNumber: 32 });
        const eventObj = { target: { value: 20 } };
        NumberOfEventsWrapper.find('.events-number-search').simulate('change', eventObj);
        expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(20);
        expect(NumberOfEventsWrapper.find('.events-number-search').prop('value')).toBe(20);
    });

    test('renders error if number is 257', () => {
        NumberOfEventsWrapper.setState({ eventsNumber: 32 });
        const eventObj = { target: { value: 257 } };
        NumberOfEventsWrapper.find('.events-number-search').simulate('change', eventObj);
        expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(32);
        expect(NumberOfEventsWrapper.find('.events-number-search').prop('value')).toBe(32);
        expect(NumberOfEventsWrapper.state('errorText')).toBe('Specify a number between 1 and 256');
    });
})