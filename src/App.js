import React from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';

function App() {
  return (
    <div className="App">
      <EventList />
      <CitySearch />
      <NumberOfEvents />
    </div>
  );
}

export default App;
