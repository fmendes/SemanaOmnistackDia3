const socketio = require( 'socket.io' );
const parseStringAsArray = require( './utils/parseStringAsArray' );
const calculateDistance = require( './utils/calculateDistance' );

const connections = [];
let io;

exports.setupWebSocket = ( server ) => {

    io = socketio( server );

    io.on( 'connection', socket => {
        console.log( 'WebSocket ok', socket.id );
        console.log( 'Query', socket.handshake.query );

        const { latitude, longitude, techs } = socket.handshake.query;
        
        connections.push( {
            id: socket.id
            , coordinates: {
                latitude: Number( latitude )
                , longitude: Number( longitude )
            }
            , techs: parseStringAsArray( techs )
        } );

        // testing socket messaging
        //setTimeout( () => {
        //    socket.emit( 'message', 'Hello WebSocket!' );
        //}, 3000 );
    } );
};

exports.findConnection = ( coordinates, techs ) => {
    // filter connections by criteria below
    return connections.filter( connection => {
        // criteria is distance < 10 and ...
        return 12 > calculateDistance( 
                    coordinates, connection.coordinates )
            // ... and techs array includes at least one tech
            && ( connection.techs.length == 0 
                || techs.length == 0
                || connection.techs.some( 
                    item => techs.includes( item ) )
            );
    } );
};

exports.sendMessage = ( to, message, data ) => {
    to.forEach( connection => {
        io.to( connection.id ).emit( message, data );
    } );
};