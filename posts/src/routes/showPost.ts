import { NotFoundError } from '@mfrattaroli/common';
import express, { Request, Response } from 'express';
import { Post } from '../models/post';

const router = express.Router();

router.get(
    '/api/posts/:id',
    async (req: Request, res: Response) => {
        try {
            const post = await Post.findById(req.params.id);
            if ( !post ) throw new NotFoundError();
            res.send(post);
        }
        catch ( err ) {
            console.log('Error in GET post handler');
            res.status(500).send()
        }
    }
);

router.get(
    '/api/posts',
    async (req: Request, res: Response) => {
        try {
            const posts = await Post.find({});
            res.send(posts);
        }
        catch ( err ) {
            console.log('Error in GET post handler');
            res.status(500).send()
        }
    }
);

export { router as showPostRouter };