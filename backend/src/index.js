const express = require( 'express' );
//const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
const routes = require( './routes' );
const http = require( 'http' );

const { setupWebSocket } = require( './websocket' );

const app = express();

const server = http.Server( app );

setupWebSocket( server );

// copied from cloud.mongodb.com cluster configuration
mongoose.connect( 'mongodb+srv://fmendes:omnistackfmtf01@cluster0-bfjhx.mongodb.net/week10?retryWrites=true&w=majority'
        , {
            useNewUrlParser: true
            , useUnifiedTopology: true
        } );

app.use( express.json() );
app.use( routes );

server.listen( 3333 );

//app.listen( 3333 );

//app.use( cors() );/* { origin: 'http://localhost:3000' } */

// default error handler
// TODO:  find out how to get the actual exception msg
//app.use( function( err, request, response, next ) {
//    console.log( 'error', err );
//    return response.json( {
//        error:  err.type
//        , statusCode: err.statusCode
//        , status: err.status
//    } );
//} );

//www.omnistack.com/users
//app.get( '/users', () => {} );

// Parameter types:
// Query:  request.query ( url = ...?search=value )
// Route:  request.params ( route= /users/:id )
// Body:   request.body ( needs app.use(express.json()); )

// localhost:3333
