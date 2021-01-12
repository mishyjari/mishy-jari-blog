import express, { Request, Response } from "express";
import { User } from "../models/user";
import { NotFoundError } from "@mfrattaroli/common";

const router = express.Router();

router.get('/api/users', async(req: Request, res: Response) => {
    const users = await User.find({});

    res.send(users)
});

router.get('/api/users/:id', async(req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    if ( !user ) throw new NotFoundError();

    res.send(user)
});

export { router as showUserRouter };