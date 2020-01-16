const axios = require( 'axios' );
const Dev = require( '../models/Dev' );
const parseStringAsArray = require( '../utils/parseStringAsArray' );

module.exports = { 
    async index( request, response ) {
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray( techs );

        // find all devs in a radius of 10km using $near operator
        // filter by tech using $in operator
        const devs = await Dev.find( {
            techs: {
                $in: techsArray
            }
            , location: {
                $near: {
                    $geometry: {
                        type: 'Point'
                        // trick to convert to number
                        , coordinates: [ longitude * 1, latitude * 1 ]
                    }
                    , $maxDistance: 10000
                }
            }
        } );

        

        //const devs = await Dev.find();

        return response.json( { devs } );
    }
};