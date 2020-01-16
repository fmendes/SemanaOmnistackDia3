const mongoose = require( 'mongoose' );
const PointSchema = require( './utils/PointSchema.js' );

// this gets rid of the DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true)

const DevSchema = new mongoose.Schema( {
    name: String
    , github_username: String
    , bio: String
    , avatar_url: String
    , techs: [ String ]
    , location: {
        type: PointSchema
        , index: '2dsphere'
    }
} );

module.exports = mongoose.model( 'Dev', DevSchema );