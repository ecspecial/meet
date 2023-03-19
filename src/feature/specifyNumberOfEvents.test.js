import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";

const feature = loadFeature('src/feature/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    let AppWrapper;
    test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('a user hasn\'t specified a number of events to load', () => {

        });

        when('a user open the app or runs a search', () => {
            AppWrapper = mount(<App />);
        });

        then('a maximum of 32 events will appear', () => {
            AppWrapper.update();
            expect(AppWrapper.find(EventList).props().eventsNumber).toEqual(32);
            expect(AppWrapper.find('.EventList li').length).toBeLessThanOrEqual(32);
        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        
        let AppWrapper;
        given('a user has specified a number of events to load', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.find('.events-number-search').simulate('change', { target: { value: 1 } });   
        });

        when('a user open the app or runs a search', () => {
            AppWrapper.update();
        });

        then('the number of events the user selected will be the maximum number of events shown', () => {
            expect(AppWrapper.find(EventList).props().eventsNumber).toEqual(1);
            expect(AppWrapper.find('.EventList li').length).toBeLessThanOrEqual(1);
        });
    });
});