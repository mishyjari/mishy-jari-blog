import request from 'supertest';
import { app } from '../../app';

it('Should show a given user', async() => {
    const { body: userOne} = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'pfoo@bar.com',
            password: 'pass1234',
            username: 'pfoobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'pass1234',
            username: 'foobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)

    const { body: userResponse } = await request(app)
        .get(`/api/users/${userOne.id}`)
        .expect(200)

    expect(userResponse.id).toEqual(userOne.id)

});

it('Should retrieve all users', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'pfoo@bar.com',
            password: 'pass1234',
            username: 'pfoobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'pass1234',
            username: 'foobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)

    const { body: users } = await request(app)
        .get(`/api/users`)
        .expect(200)

    expect(users.length).toEqual(2)

});