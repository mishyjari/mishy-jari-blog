import express, { Request, Response } from 'express';
import { currentUser, NotAuthorizedError, NotFoundError } from '@mfrattaroli/common';
import { Post } from '../models/post';

const router = express.Router();

router.delete(
    '/api/posts/:id',
    currentUser,
    async (req: Request, res: Response) => {

        try {
            // Find post
            const post = await Post.findById(req.params.id);
            if ( !post ) {
                throw new NotFoundError();
            };

            // Make sure the current user owns this post
            if ( post.id !== req.currentUser!.id ) {
                throw new NotAuthorizedError();
            };

            await Post.deleteOne(post);

            res.status(204).send({});
        }
        catch (err) {
            console.log('Error in delete post route handler', err);
            res.status(500).send({});
        }
    }
);

export { router as deletePostRouter };