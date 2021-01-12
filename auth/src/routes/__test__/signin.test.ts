import request from 'supertest';
import { app } from '../../app';

const signup = () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'pass1234',
            username: 'foobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)
}

it('Should return 400 if username is missing or password are missing', async() => {
    await signup()
    
    await request(app)
        .post('/api/users/signin')
        .send({
            username: 'foobar',
            password: ''
        })
        .expect(400)

    await request(app)
        .post('/app/users/signin')
        .send({
            username: '',
            password: 'pass1234'
        })
});

it('Should return 401 if username is present but does not exist', async() => {
    await signup();

    await request(app)
        .post('/api/users/signin')
        .send({
            username: 'barfoo',
            password: 'pass1234'
        })
    .expect(401)
});

it('Should return 401 if password does not match', async() => {
    await signup();

    await request(app)
        .post('/api/users/signin')
        .send({
            username: 'foobar',
            password: 'wrongpassword'
        })
    .expect(401)
});

it('Should create a user session on success', async() => {
    await signup();

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            username: 'foobar',
            password: 'pass1234'
        })
    .expect(200);

    expect(response.get('Set-Cookie'))
        .toBeDefined();
});