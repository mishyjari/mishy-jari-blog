import request from 'supertest';
import { app } from '../../app';

it('Should destroy user session on logout', async () => {
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
    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200)

    expect(response.get('Set-Cookie')[0])
        .toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})