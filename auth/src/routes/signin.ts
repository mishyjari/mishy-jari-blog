import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError, PasswordManager, NotAuthorizedError } from '@mfrattaroli/common';
import { User } from '../models/user';


const router = express.Router();

router.post('/api/users/signin', 
[  
    // Request validation
    body('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username required!'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must enter a password')
],
validateRequest,
async( req: Request, res: Response ) => {
    const { username, password } = req.body;

    // Check if email exists
    const existingUser = await User.findOne({ username });
    if ( !existingUser ) throw new NotAuthorizedError();

    // Match passwords
    const passwordsMatch = await PasswordManager.compare(existingUser.password, password);

    if ( !passwordsMatch ) throw new NotAuthorizedError();

    // Generate JSON Web Token
    const userJWT = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },
        process.env.JWT_KEY!);

    // Set cookie on session
    req.session = {
        jwt: userJWT
    };
    res.status(200).send(existingUser);
});

export { router as signinRouter };