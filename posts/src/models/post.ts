import mongoose from 'mongoose';

// Typescript interfaces

// PostAttrs Interface for creating a new document
interface PostAttrs {
    userId: string;
    title: string;
    content: string;
    tags: string[];
};

// PostModel Interface for using the build() static
interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc;
}

// PostDoc Interface for refrencing Post documents
interface PostDoc extends mongoose.Document {
    userId: string;
    title: string;
    content: string;
    tags: string[];
}

// Schema
const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    }
},{
    // Rename the _id attribute to id for cross compadibility between databses
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
        versionKey: false
    }
});

// Give access to types documents via a static build() method
postSchema.statics.build = (attrs: PostAttrs) => new Post(attrs);

// Define User model
const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };