import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import Logging from '../library/logging';
import { IUserModel } from '../models/User';

const NAMESPACE = 'Auth';

const signJWT = (user: IUserModel, callback: (error: Error | null | string, token: string | null) => void): void => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

    Logging.info(`Attempting to sign token for ${user._id}`, NAMESPACE);

    try {
        jwt.sign(
            {
                username: user.username
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (err) {
        Logging.error('Somthing wrong', NAMESPACE);
    }
};

export default signJWT;