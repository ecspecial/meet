import React, { Component } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';
import './nprogress.css'
import './index.css'
import EventGenre from './EventGenre';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';
import { extractLocations, getEvents } from './api';
import WelcomeScreen from './WelcomeScreen';
import { checkToken, getAccessToken } from './api';

class App extends Component {
  
  state = {
    events: [],
    locations: [],
    eventsNumber: 32,
    showWelcomeScreen: undefined
  };

  updateLocations = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? 
      events :
      events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      })
    })
  }

  updateEventsNumber = (eventsNumber) => {
    this.setState({ eventsNumber });
  };

  getData = () => {
    const { events, locations } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;

    // Run only this code if running `npm run test`
    // getEvents().then((events) => {
    //   if (this.mounted) {
    //     this.setState({ events, locations: extractLocations(events) });
    //   }
    // });

    {/* Comment out when running test `npm run test` for localhost */}
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render () {

    {/* Comment out when running test `npm run test` for localhost */}
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <CitySearch locations = {this.state.locations} updateLocations={this.updateLocations}/>
        <NumberOfEvents updateEventsNumber={this.updateEventsNumber}/>
        <h4>Events by cities</h4>
        <div className='data-vis-wrapper'>
        <EventGenre events={this.state.events}/>
          <ResponsiveContainer height={300}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="City" tick={{ fill: '#FFFAFA' }} />
              <YAxis type="number" dataKey="number" name="Number of events" tick={{ fill: '#FFFAFA' }} />
              <Tooltip contentStyle={{ backgroundColor: '#7D8186' }} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#32CD32" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <EventList events = {this.state.events} eventsNumber={this.state.eventsNumber}/>
        {/* Comment out when running test for localhost */}
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />

      </div>
    );
  }
}

export default App;
