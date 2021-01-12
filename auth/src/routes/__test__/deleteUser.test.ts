import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('Should return 401 if the user is not logged in', async() => {
    const { body: user } = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'pass1234',
            username: 'foobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)
    
    await request(app)
        .delete(`/api/users/${user.id}`)
        .send()
        .expect(401)

});

it('Should return 401 requested delete user doesn\'t match the current user', async() => {
    const { body: user } = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'pfoo@bar.com',
            password: 'pass1234',
            username: 'pfoobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)

    const token = await global.getAuthToken();

    await request(app)
        .delete(`/api/users/${user.id}`)
        .set('Cookie', token)
        .send()
        .expect(401)
});

it('Should return 404 if the user id does not exist', async() => {
    const token = await global.getAuthToken();

    await request(app)
        .delete(`/api/users/${mongoose.Types.ObjectId}`)
        .set('Cookie', token)
        .send()
        .expect(404)
});

it('Should remove the user document from the database and destroy session if authorized', async() => {
    const res = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'pfoo@bar.com',
            password: 'pass1234',
            username: 'pfoobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)

    const cookie = res.get('Set-Cookie')

    const deleteResponse = await request(app)
        .delete(`/api/users/${res.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(204)

    expect(deleteResponse.get('Set-Cookie')[0])
        .toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
});