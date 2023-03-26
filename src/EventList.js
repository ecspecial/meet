import React, { Component } from "react";
import Event from "./Event";
import { WarningAlert } from "./Alert";

class EventList extends Component {
    render() {
        const { events, eventsNumber } = this.props;
        return (
            <div>
                <div>
                    { !navigator.online && <WarningAlert text="You're currently using the app offline. Events might not be up to date."></WarningAlert>}
                </div>

                <ul className="EventList">
                    { (eventsNumber ? events.slice(0, eventsNumber) : events).map(event =>
                        <li key={event.id}>
                            <Event event={event} />
                        </li>
                        )}
                </ul>
            </div>
        );
    }
}

export default EventList;