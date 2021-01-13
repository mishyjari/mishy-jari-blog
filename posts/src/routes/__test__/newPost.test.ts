import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Should Create a New Post', async() => {
    const token = await global.getAuthToken();
        await request(app)
        .post('/api/posts')
        .set('Cookie', token)
        .send({
            userId: mongoose.Schema.Types.ObjectId,
            title: 'Hello Lorem',
            content: 'Lorem ipsum dolor sit emet',
        })
        .expect(201);
});

it.todo('Should associate the post with the current user id');
it.todo('Should default to an empty array for the tags attribute');
it('Should return 401 if the user is not logged in', async() => {
    await request(app)
        .post('/api/posts')
        .send({
            userId: mongoose.Schema.Types.ObjectId,
            title: 'Hello Lorem',
            content: 'Lorem ipsum dolor sit emet',
        })
        .expect(401);
});
it.todo('Should return 400 if title or content are missing');