'use strict';

const Hapi = require('@hapi/hapi');
const FileRoute = require('./routes/FileRoute')

const init = async () => {

    const server = Hapi.server({
        port: 4000,
        host: 'localhost',
        routes: {

            cors: {
                origin: [
                    'http://localhost:3000',
                    'http://localhost'
                        ],
                additionalHeaders: [
                    'Access-Control-Allow-Origin',
                    'Access-Control-Request-Method',
                    'Allow-Origin',
                    'Origin',
                    'access-control-allow-origin',
                    'access-control-request-method',
                    'allow-origin',
                    'origin',
                ]
            }
        }

        
        // routes:{
        //     cors:{
        //          origin:['http://localhost:3000'],
        //          headers: ["Access-Control-Allow-Headers","Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"],
        //          additionalHeaders: ["Access-Control-Allow-Headers: Origin, Content-Type, x-ms-request-id , Authorization"],
        //          additionalExposedHeaders:[ "Access-Control-Allow-Origin"]

        //     //     headers:["Access-Control-Allow-Origin", 'Access-Control-Request-Headers']
        //     //     //additionalHeaders:["Access-Control-Allow-Origin", 'Content-Type', 'token']
        //      }
        //}
    });
    await server.route(FileRoute)

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();