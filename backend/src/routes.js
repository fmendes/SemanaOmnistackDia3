const { Router } = require( 'express' );
const DevController = require( './controllers/DevController' );
const SearchController = require( './controllers/SearchController' );

const routes = Router();
const cors = require( 'cors' );
routes.use( cors() );

routes.get( '/', ( request, response ) => {
    //return response.send( 'Hello World' );
    console.log( 'request.query', request.query );
    return response.json( {
        message:  'Hello Omnistack'
    } );
} );

// index, show, store, update, destroy

routes.post( '/devs', DevController.store );
routes.get( '/devs', DevController.index );
routes.put( '/devs/:id', DevController.update );
routes.delete( '/devs/:id', DevController.destroy );

routes.get( '/search', SearchController.index );

// make routes visible to the app
module.exports = routes;