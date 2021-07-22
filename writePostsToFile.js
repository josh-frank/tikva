require( "dotenv" ).config();

const fetch = require("node-fetch");
const fs = require( "fs" );

let brain = [];

exports.writePostsToFile = async subredditName => {
    await fetch( `https://www.reddit.com/r/${ subredditName }.json` )
        .then( response => response.json() )
        .then( json => json.data.children.forEach( post => {
            const resultToPush = [ post.data.selftext, post.data.title, post.data.selftext_html ];
            brain = [ ...brain, ...resultToPush ];
        } ) )
        .then( () => fs.writeFile( subredditName, brain.join( " " ), error => {
            if ( error ) console.log( error );
        } ) );
}
