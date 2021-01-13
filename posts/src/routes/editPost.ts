import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Post } from '../models/post';
import { BadRequestError, validateRequest, currentUser, NotAuthorizedError } from '@mfrattaroli/common';
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
        body('title')
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
            const post = Post.findById(req.params.id);

            if ( post.userId !== req.currentUser!.id ) {
                throw new NotAuthorizedError();
            }

            post.title = title;
            post.content = content;
            post.tags = tags;

            await post.save();

            res.status(200).send(post);
        }
        catch (err) {
            console.log('Error in new post route handler', err);
            res.status(500).send({})
        }

    }
);
export { router as editPostRouter };