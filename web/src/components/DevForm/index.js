import React, { useState, useEffect } from 'react';

import './styles.css';

// alternative:  function DevForm( { onSubmit } ) {
function DevForm( props ) {
    const { onSubmit } = props;

    const [ github_username, setGithubUsername ] = useState( '' );
    const [ techs, setTechs ] = useState( '' );
    const [ latitude, setLatitude ] = useState( '' );
    const [ longitude, setLongitude ] = useState( '' );

    useEffect( () => {
      navigator.geolocation.getCurrentPosition(
        ( position ) => {
          console.log( 'position', position );
          const { latitude, longitude } = position.coords;
          setLatitude( latitude );
          setLongitude( longitude );
        }
        , ( error ) => {
          console.log( 'error', error );
        }
        , { timeout: 30000 }
      );
    }, [] );

    async function handleSubmit( e ) {
        e.preventDefault();
        const data = {
            github_username
            , techs
            , latitude
            , longitude
          }

        const statusText = await onSubmit( data );
        if( statusText === "OK" ) {
            setGithubUsername( '' );
            setTechs( '' );
        }
    }

    return (
        <form onSubmit={handleSubmit} >
          <div className="input-block" >
            <label htmlFor="github_username" >Usuário do Github</label>
            <input name="github_username" id="github_username" 
                  required 
                  value={github_username} 
                  onChange={ e => setGithubUsername( e.target.value ) } />
          </div>

          <div className="input-block" >
            <label htmlFor="techs" >Tecnologias</label>
            <input name="techs" id="techs" required 
                  value={techs} 
                  onChange={ e => setTechs( e.target.value ) } />
          </div>

          <div className="input-group" >
            <div className="input-block" >
              <label htmlFor="latitude" >Latitude</label>
              <input name="latitude" id="latitude" 
                    required 
                    value={latitude} 
                    type="Number" 
                    onChange={ e => setLatitude( e.target.value ) } />
            </div>
            <div className="input-block" >
              <label htmlFor="longitude" >Longitude</label>
              <input name="longitude" id="longitude" 
                    required 
                    value={longitude}
                    type="Number"
                    onChange={ e => setLongitude( e.target.value ) } />
            </div>
          </div>

          <button type="submit">Salvar</button>

        </form>    );
}

export default DevForm;