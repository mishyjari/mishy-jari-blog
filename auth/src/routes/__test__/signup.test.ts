import request from 'supertest';
import { app } from '../../app';
import { User } from "../../models/user";

const sampleUser = {
    email: 'foo@bar.com',
    password: 'pass1234',
    username: 'foobar',
    firstName: 'Foo',
    lastName: 'Bar'
}


it('Should return 400 if name is missing or invalid', async() => {
    const user: any = {...sampleUser}
    delete user['firstName']

    await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(400)
});

it('Should return 400 if email is missing or invalid', async() => {
    const user: any = {...sampleUser}
    delete user['email']

    await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(400)
});

it('Should return 400 if email or username already exists', async() => {
    await request(app)
        .post('/api/users/signup')
        .send(sampleUser)
        .expect(201);
    
    const res = await request(app)
        .post('/api/users/signup')
        .send(sampleUser)
        .expect(400)
})

it('Should return 400 if password is missing or invalid', async() => {
    const user: any = {...sampleUser}
    user.password = '';

    await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(400)

    delete user['password'];
    await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(400)
});

it('Should return 400 if username is missing', async() => {
    const user: any = {...sampleUser}
    delete user['username']

    await request(app)
        .post('/api/users/signup')
        .send(user)
        .expect(400)
});

it('Should create a user document in the database on success', async() => {
    const { body: userResponse } = await request(app)
        .post('/api/users/signup')
        .send(sampleUser)
        .expect(201)

    const user = await User.findById(userResponse.id);

    expect(user).toBeTruthy();
    expect(user.firstName).toEqual('Foo');
    expect(user.lastName).toEqual('Bar')
});

it('Should create a new user session on success', async() => {
    const response = await request(app)
        .post('/api/users/signup')
        .send(sampleUser)
        .expect(201);

    expect(response.get('Set-Cookie'))
        .toBeDefined();
});