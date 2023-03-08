import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { extractLocations, getEvents } from '../api';
import { mockData } from '../mock-data';

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

describe('<App /> integration', () => {

    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city suggested by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex]; 
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity )
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('App passes "eventsNumber" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />);
        const AppEventsNumberState = AppWrapper.state('eventsNumber');
        expect(AppEventsNumberState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().eventsNumber).toEqual(AppEventsNumberState);
        AppWrapper.unmount();
    });

    test('App passes "updateEventsNumber" function as a prop to NumberOfEvents', () => {
        const AppWrapper = mount(<App />);
        expect(AppWrapper.find(NumberOfEvents).props().updateEventsNumber).toBeDefined();
        AppWrapper.unmount();
    });

    test('App number of events is equal to NumberOfEvents eventsNumber state', () => {
        const AppWrapper = mount(<App />);
        const AppEventsNumberState = AppWrapper.state('eventsNumber');
        expect(AppWrapper.find(NumberOfEvents).state('eventsNumber')).toEqual(AppEventsNumberState);
        AppWrapper.unmount();
    });

    test('EventList data is equal to mockData', async () => {
        const AppWrapper = mount(<App />);
        const EventListWrapper = mount(<EventList events={mockData} />)
        await getEvents();
        for (let i = 0; i < mockData.length; i++) {
            expect(EventListWrapper.find('.EventList li .event-summary').at(i).text()).toEqual(mockData[i].summary);
        }
        expect(AppWrapper.state('events')).toEqual(mockData);
        EventListWrapper.unmount();
        AppWrapper.unmount();
    });
});