import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

// Declare and type global to simulate authorization
declare global {
    namespace NodeJS {
        interface Global {
            getAuthToken(): Promise<string[]>
        }
    }
}

// Open connection to mongoose memory server
let mongo: any;
beforeAll( async() => {
    // Jest will not have access to enviornment variables set in Kubernetes, set secret key manually
    process.env.JWT_KEY = 'imasecret';

    // Creates MongoDB Server in memory for testing
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect( mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
});

// Reset memory db before each test
beforeEach( async () => {
    const collections = await mongoose.connection.db.collections();
    for ( let collection of collections ) {
        await collection.deleteMany({})
    }
});

// Close connection
afterAll( async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

// Signin auth simulator
// Returns a promise!
global.getAuthToken = async () => {

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'foo@bar.com',
            password: 'pass1234',
            username: 'foobar',
            firstName: 'Foo',
            lastName: 'Bar'
        })
        .expect(201)

    return response.get('Set-Cookie')
}