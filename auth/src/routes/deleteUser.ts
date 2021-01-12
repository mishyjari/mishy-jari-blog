import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { currentUser, NotAuthorizedError, NotFoundError } from '@mfrattaroli/common';

const router = express.Router();

router.delete(
    '/api/users/:id',
    currentUser,
    async (req: Request, res: Response) => {

        const user = await User.findById(req.params.id);

        if ( !user ) throw new NotFoundError();
        if ( !req.currentUser || user.id !== req.currentUser!.id ) throw new NotAuthorizedError();
        await User.deleteOne(user);
        req.session = null;
        res.status(204).send({})

    }
);

export { router as deleteUserRouter };