import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Post } from '../models/post';
import { BadRequestError, validateRequest, currentUser } from '@mfrattaroli/common';
const router = express.Router();

router.post(
    '/api/posts',
    currentUser,
    [
        body('title')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Title Required'),
        body('content')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Title Required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        // Catch validation Errors
        const errors = validationResult(req);
        if ( errors ) {
            console.log(errors);
            throw new BadRequestError('Request validation failed');
        };
        const {
            title,
            content,
            tags
        } = req.body;

        try {
            const post = Post.build({
                userId: req.currentUser!.id,
                title,
                content,
                tags
            });

            await post.save();

            res.status(201).send(post);
        }
        catch (err) {
            console.log('Error in new post route handler', err);
            res.status(500).send({})
        }

    }
);

export { router as newPostRouter };