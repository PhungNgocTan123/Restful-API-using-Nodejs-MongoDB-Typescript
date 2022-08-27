import express, { response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config'
import Logging from './library/logging';
import authorRoutes from './routes/Author';

const router = express();


//** Connect to Mongo **/
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to MongoDB');
        StartServer();
    })
    .catch((error) => {
        Logging.error('Unable to connect : ');
        Logging.error(error);
    })

/** Only start server of Mongo Connects*/
const StartServer = () => {
    router.use((req, res, next) => {

        /** Log the Request */
        Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the Response */
            Logging.info(`Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress} - Status: [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    /** Rules of API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Origin', 'Origin, X-Request-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json();
        };

        next();
    })


    /** Routes */

    router.use('authors/', authorRoutes);

    router.use('users/',)
    /** Healthcheck */
    router.get('/ping', (req, res, next) => {
        res.status(200).json({ message: 'pong' });
    });

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);

        return res.status(404).json({ message: error.message });
    })
    http.createServer(router).listen(config.server.port, () => {
        Logging.info(`Server is running on port ${config.server.port}`);
    });
}

