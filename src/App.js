import React from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';

function App() {
  return (
    <div className="App">
      <EventList events={mockData}/>
      <CitySearch />
      <NumberOfEvents />
    </div>
  );
}

export default App;
