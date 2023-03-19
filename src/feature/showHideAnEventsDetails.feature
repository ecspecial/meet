Feature: Show and hide an event's details

Scenario: An event element is collapsed by default
Given an event's info has been loaded
When the user first sees an event
Then the event's details will not be visible

Scenario: User can expand an event to see its details
Given an event's info has been loaded
When the user clicks a collapsed event panel
Then the details will become visible

Scenario: User can collapse an event to hide its details
Given an event's details are visible
When the user clicks "show details" button
Then the event's details will become hidden