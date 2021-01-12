import request from 'supertest';
import { app } from '../../app';

it('Returns current user when logged valid session exists', async () => {
    const token = await global.getAuthToken();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', token)
        .send()
        .expect(200)
    
    expect(response.body.currentUser.email).toEqual('foo@bar.com')
});

it('Should return an object where currentUser is null when no session exists', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)
    expect(response.body.currentUser).toEqual(null)
});