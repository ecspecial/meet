import React from "react";
import { shallow } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import Event from "../Event";
import { mockData } from "../mock-data";

const feature = loadFeature('src/feature/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    
    test('An event element is collapsed by default', ({ given, when, then }) => {
        
        let EventWrapper;
        given('an event\'s info has been loaded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });

        when('the user first sees an event', () => {

        });

        then('the event\'s details will not be visible', () => {
            expect(EventWrapper.find('.event .event-details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        
        let EventWrapper;
        given('an event\'s info has been loaded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });

        when('the user clicks a collapsed event panel', () => {
            EventWrapper.find('.details-btn').simulate('click');
        });

        then('the details will become visible', () => {
            expect(EventWrapper.find('.event .event-details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        
        let EventWrapper;
        given('an event\'s details are visible', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
            EventWrapper.find('.details-btn').simulate('click');
        });

        when('the user clicks "show details" button', () => {
            EventWrapper.find('.details-btn').simulate('click');
        });

        then('the event\'s details will become hidden', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });
    });
});