import mongoose from 'mongoose'; 
import { app } from './app';

const PORT = process.env.PORT || 3000;

if ( !process.env.JWT_KEY ) throw new Error('Missing env variable for JWT_KEY');
if ( !process.env.MONGO_URI ) throw new Error('Missing env variable for MONGO_URI');

const { MONGO_URI } = process.env;

const start = async() => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true 
        })
        console.log('SUCCESS | Connection to MongoDB on Auth Server')
    }
    catch ( err ) {
        console.log('FAILED | Connection to MongoDB on Auth Server', err)
    }
    app.listen(PORT, () => {
        console.log('SUCCESS | Auth Server listening on port ' + PORT)
    })
};

start();