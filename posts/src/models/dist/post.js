"use strict";
exports.__esModule = true;
exports.Post = void 0;
var mongoose_1 = require("mongoose");
;
// Schema
var postSchema = new mongoose_1["default"].Schema({
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
}, {
    // Rename the _id attribute to id for cross compadibility between databses
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
        versionKey: false
    }
});
// Give access to types documents via a static build() method
postSchema.statics.build = function (attrs) { return new Post(attrs); };
// Define User model
var Post = mongoose_1["default"].model('Post', postSchema);
exports.Post = Post;
