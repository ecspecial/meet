import React from "react";
import { shallow } from 'enzyme';
import { mockData } from "../mock-data";
import Event from "../Event";
const { ResizeObserver } = window;

  beforeEach(() => {
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

describe('<Event /> component', () => {
    
    let event;
    let EventWrapper;
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event}/>);
    });

    test('renders event component', () => {
       expect(EventWrapper).toBeDefined();
    });

    test('renders event div', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('renders event header', () => {
        const EventHeader = EventWrapper.find('.event-summary');
        expect(EventHeader).toHaveLength(1);
        expect(EventHeader.text()).toBe(event.summary);
    });
 
    test('renders start date of the event', () => {
        const StartDate = EventWrapper.find('.event-start');
        expect(StartDate).toHaveLength(1);
        expect(StartDate.text()).toBe(new Date(event.start.dateTime).toString());
    });

    test('renders event location', () => {
        const EventLocation = EventWrapper.find('.event-location')
        expect(EventLocation).toHaveLength(1);
        expect(EventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
    });

    test('renders show details button when details is false', () => {
        expect(EventWrapper.find('.details-btn')).toHaveLength(1);
        expect(EventWrapper.find('.details-btn').text()).toBe('show details');
    });

    test('renders no details by default', () => {
        expect(EventWrapper.state('details')).toBe(false);
        expect(EventWrapper.find('.details-btn')).toHaveLength(1);
        expect(EventWrapper.find('.details-btn').text()).toBe('show details');
        expect(EventWrapper.find('.event-details')).toHaveLength(0);
        expect(EventWrapper.find('.about-event-header')).toHaveLength(0);
        expect(EventWrapper.find('.event-link')).toHaveLength(0);
        expect(EventWrapper.find('.event-description')).toHaveLength(0);
    });

    test('renders details when "show details" button is clicked', () => {
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.state('details')).toBe(true);
        expect(EventWrapper.find('.event-details')).toHaveLength(1);
        expect(EventWrapper.find('.about-event-header')).toHaveLength(1);
        expect(EventWrapper.find('.event-link')).toHaveLength(1);
        expect(EventWrapper.find('.event-description')).toHaveLength(1);
        expect(EventWrapper.find('.about-event-header').text()).toBe('About event:');
        expect(EventWrapper.find('.event-link').text()).toBe('See details on Google Calendar');
        expect(EventWrapper.find('.event-link').prop('href')).toBe(`${event.htmlLink}`);
        expect(EventWrapper.find('.event-description').text()).toBe(`${event.description}`);
        expect(EventWrapper.find('.details-btn').text()).toBe('hide details');
    });

    test('collapses details when "hide details" button is clicked', () => {
        EventWrapper.find('.details-btn').simulate('click');
        expect(EventWrapper.state('details')).toBe(false);
        expect(EventWrapper.find('.details-btn')).toHaveLength(1);
        expect(EventWrapper.find('.details-btn').text()).toBe('show details');
        expect(EventWrapper.find('.event-details')).toHaveLength(0);
        expect(EventWrapper.find('.about-event-header')).toHaveLength(0);
        expect(EventWrapper.find('.event-link')).toHaveLength(0);
        expect(EventWrapper.find('.event-description')).toHaveLength(0);
    });

});