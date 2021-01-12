import request from 'supertest';
import { app } from '../../app';
import { User } from '../../models/user';
 
it('Should return 401 if the user is not logged in', async() => {
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

    await request(app) 
        .patch(`/api/users/${user.id}`)
        .send({
            email: 'hello@world.com',
            password: 'pass1234',
            username: 'helloworld',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(401)
});

it('Should return 401 requested update user doesn\'t match the current user', async() => {
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
        .patch(`/api/users/${user.id}`)
        .set('Cookie', token)
        .send({
            email: 'hello@world.com',
            password: 'pass1234',
            username: 'helloworld',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(401)
});

it('Should return 401 if the user id does not exist', async() => {
    const token = await global.getAuthToken();

    await request(app)
        .patch(`/api/users/1234`)
        .set('Cookie', token)
        .send({
            email: 'hello@world.com',
            password: 'pass1234',
            username: 'foobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(401)
});

it('Should update the user document in the database on success', async () => {
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
    
    const patch = await request(app)
        .patch(`/api/users/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            email: 'hello@world.com',
            password: 'pass1234',
            username: 'helloworld',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(200)
    
    expect(patch.body.id).toEqual(res.body.id);
    expect(patch.body.email).toEqual('hello@world.com')
    expect(patch.body.username).toEqual('helloworld')
    expect(patch.body.firstName).toEqual('Foo')

});

it('Should update the information in the user session on success', async() => {
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

    await request(app)
        .patch(`/api/users/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            email: 'hello@world.com',
            password: 'pass1234',
            username: 'helloworld',
            firstName: 'Foo',
            lastName: 'Bar'
        })
    .expect(200)

    const user = await User.findById(res.body.id);
    expect(user).toBeDefined();

    expect(user.email).toEqual('hello@world.com')
    expect(user.username).toEqual('helloworld')
    expect(user.firstName).toEqual('Foo')

    
});