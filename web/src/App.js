import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
//import logo from './logo.svg';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

// 3 elements of React:  
// component - block of JS HTML CSS
// property - attributes of a component
// state - data kept by the component

function App() {
  const [ devs, setDevs ] = useState( [] );

  useEffect( () => {
    async function loadDevs() {
      const response = await api.get( '/devs' );
      console.log( 'response', response );
      if( response.statusText === "OK" ) {
        setDevs( response.data.devs );
      }
    }
    loadDevs();
  }, [] );

  async function handleAddDev( data ) {
    const response = await api.post( '/devs'
                    , data );
    console.log( 'response', response );
    if( response.statusText === "OK" ) {

      setDevs( [...devs, response.data.dev ] );
    }

    return response.statusText;
  }

  return (
    <div id="app" >
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map( dev => (
            <DevItem key={dev._id} dev={dev} />
          ) ) }
        </ul>
      </main>
    </div>
  );
}

export default App;

/*

    <div id="app" className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/
