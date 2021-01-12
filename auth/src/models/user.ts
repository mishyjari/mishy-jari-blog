import mongoose from 'mongoose';
import { PasswordManager } from '@mfrattaroli/common'

// Types for creating a new user
interface UserAttrs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
};

// Typing for the build method
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
};

// Types for a given user document
interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    username: string;
};

// Mongoose Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
}, {
    toJSON: {
        // Rename the _id attribute to id for cross compadibility between databses
        // Add a 'full name' attribute
        // Remove the password field as it wont be needed when sending JSON document to the client
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            ret.fullName = `${ret.firstName} ${ret.lastName}`
        },
        // Do not send the mongo version key
        versionKey: false
    }
});

// Hash the password prior to saving
userSchema.pre('save', async function(done) {
    // Prevent rehashing is document is being updated without modifying password
    if ( this.isModified('password') ) {
        const hashed = await PasswordManager.toHash(
            this.get('password')
        );
        this.set( 'password', hashed );
    }
});

// Give access to typed document creation via the build() method
userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

// Define user model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };