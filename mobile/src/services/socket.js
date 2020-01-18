import socketio from 'socket.io-client';

// same URL as in api.js
const socket = socketio( 'http://192.168.1.213:3333', {
    autoConnect: false
} );

function subscribeToNewDevs( subscribeFunction ) {
    socket.on( 'new-dev', subscribeFunction );
}

function connect( latitude, longitude, techs ) {
    socket.io.opts.query = {
        latitude, longitude, techs
    };

    socket.connect();

    socket.on( 'message', text => {
        console.log( 'message received via socket', text );
    } );
}

function disconnect() {
    if( socket.connected ) {
        socket.disconnect();
    }
}

export { connect, disconnect, subscribeToNewDevs };