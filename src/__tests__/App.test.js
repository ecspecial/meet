import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
    
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    //Test whether list of events rendered
    test('renders list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    //Test for CitySearch to render
    test('renders CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    //Test whether list of events rendered
    test('renders search bar to specify number of events to be loaded', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });

});