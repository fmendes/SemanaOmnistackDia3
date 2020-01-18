
const axios = require( 'axios' );
const Dev = require( '../models/Dev' );
const parseStringAsArray = require( '../utils/parseStringAsArray' );
const { findConnection, sendMessage } = require( '../websocket' );

module.exports = { 
    async update( request, response ) {
        //const devs = await Dev.find();

        return response.json( { devs: [] } );
    }
    , async destroy( request, response ) {
        //const devs = await Dev.find();

        return response.json( { devs : [] } );
    }
    , async index( request, response ) {
        const devs = await Dev.find();

        return response.json( { devs } );
    }
    , async store( request, response ) {
        console.log( 'request.body', request.body );

        // get data from GitHub
        const { github_username, techs, latitude, longitude } = request.body;
        console.log( 'github_username', github_username );

        // check if dev exists in db
        let dev = await Dev.findOne( { github_username } );
        console.log( 'dev', dev );

        if( ! dev ) {

            const techsArray = parseStringAsArray( techs );

            let gitHubResponse, errorMsg;
            try {
                gitHubResponse = await axios.get( 
                    `https://api.github.com/users/${github_username}` );
            } catch( error ) {
                //console.error( 'error', error );
                errorMsg = `GitHub profile not found: ${github_username}`;
            }

            console.log( 'gitHubResponse', gitHubResponse );

            if( errorMsg ) {
                console.error( 'errorMsg', errorMsg );
                return response.json( { error: errorMsg } );
            }
        
            const { name = login, avatar_url, bio } = gitHubResponse.data;

            console.log( 'data', { name, avatar_url, bio } );

            const location = {
                type: 'Point'
                , coordinates: [ longitude, latitude ]
            };
            console.log( 'location', location );

            dev = await Dev.create( {
                github_username
                , name
                , avatar_url
                , bio
                , techs: techsArray
                , location
            } );

            console.log( 'dev created', dev );

            // filter websocket connections within 10km distance
            // and whose new dev has at least one tech
            const sendSocketMessageTo = findConnection( 
                { latitude, longitude }
                , techsArray
            );

            console.log( 'sendSocketMessageTo', sendSocketMessageTo );
            sendMessage( sendSocketMessageTo, 'new-dev', dev );
        }

        return response.json( { dev } );
} }