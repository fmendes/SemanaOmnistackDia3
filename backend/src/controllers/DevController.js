
const axios = require( 'axios' );
const Dev = require( '../models/Dev' );
const parseStringAsArray = require( '../utils/parseStringAsArray' );



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

        // check if dev exists in db
        let dev = await Dev.findOne( { github_username } );

        if( ! dev ) {

            const techsArray = parseStringAsArray( techs );

            const gitHubResponse = await axios.get( 
                    `https://api.github.com/users/${github_username}` );

            //console.log( 'gitHubResponse', gitHubResponse );

            const { name = login, avatar_url, bio } = gitHubResponse.data;

            console.log( name, avatar_url, bio, techsArray );

            const location = {
                type: 'Point'
                , coordinates: [ longitude, latitude ]
            };

            dev = await Dev.create( {
                github_username
                , name
                , avatar_url
                , bio
                , techs: techsArray
                , location
            } );
        }

        return response.json( { dev } );
} }