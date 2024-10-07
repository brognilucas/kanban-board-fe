import * as React from 'react';
import './App.css';
import { Project } from './components/Project';
import Client from './api/client.interface';

type Input = {
  client: Client
};

function App({ client }: Input) {

  return (
    <div className="App">
      <Project client={client} />
    </div>
  );
}

export default App;
