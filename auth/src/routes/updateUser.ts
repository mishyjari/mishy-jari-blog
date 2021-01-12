import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { currentUser, NotAuthorizedError, validateRequest } from '@mfrattaroli/common';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.patch(
    '/api/users/:id', 
    currentUser,
    [
        // Validation middleware
        body('email')
            .trim()
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters'),
        body('firstName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('First Name is Required'),
        body('lastName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Last Name is Required'),
        body('username')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Username is Required')
    ],
    validateRequest,
    async( req: Request, res: Response ) => {    
        const errors = validationResult(req);
        const { 
            email, 
            password,
            username,
            firstName,
            lastName,
        } = req.body;

        // Authorize user
        if ( !req.currentUser || req.currentUser!.id !== req.params.id ) throw new NotAuthorizedError();

        // Check if email is unique
        const user = await User.findById(req.params.id);

        user.email = email;
        user.password = password;
        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;

        await user.save();

        // Generate JSON Web Token
        const userJWT = jwt.sign({
            id: user.id,
            email: user.email,
            username: user.username
        }, process.env.JWT_KEY!);

        // Set cookie on session
        req.session = {
            jwt: userJWT
        };
        res.status(200).send(user);
});

export { router as updateUserRouter };