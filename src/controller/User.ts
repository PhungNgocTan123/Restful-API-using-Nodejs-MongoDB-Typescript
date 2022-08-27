import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import Logging from "../library/logging";
import signJWT from '../utils/signJwt';
import User from "../models/User";


const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    Logging.info(NAMESPACE, 'Token validated, user authorized.')

    return res.status(200).json({
        message: 'Token is valid '
    })
}

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt, (hashError, hash) => {
            if (hashError) {
                return res.status(401).json({
                    message: hashError.message,
                    error: hashError
                });
            }
        })

        const newUser = await new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash,
        })
        /** Save user database */
        const _user = await newUser.save();

        return res.status(200).json({ _user });
    } catch (error) {
        Logging.error(error);

        return res.status(500).json({ error })
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "Wrong Username" });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) return res.status(401).json({ messgae: 'Password Mismatch' })

        if (user && validPassword) {
            const accessToken = signJWT(user, (_error, token) => {
                if (_error) {
                    return res.status(500).json({
                        error: _error
                    });
                } else if (token) {
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        user: user
                    });
                }
            })
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            res.status(200).json({
                users,
                count: users.length
            })
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
}

export default {
    register,
    login,
    validateToken,
    getAllUsers,
}

