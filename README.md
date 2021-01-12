# MishyJari Blog

## Concept

Impliment a microservices architecure within docker containers to create a blog service for personal use. *Possible future use: expand to a multi-user platform to make a Medium clone of sorts.*

## Features

- Independent authentication service
- WYSWIG or similar input for posts
- Searching and sorting by date, tags, content
- Commenting service *(Should this require user accounts? Email verification? Admin approval?)*
- Event broadcasting / listening with real-time updates of posts and comments
- Social media integration allowing for easy sharing of posts to social media accounts and easy incorporation of social media posts into blog posts
- Fully responsive design, mobile friendly

## User Stories

**A public user should be able to...**

- view a landing page with all posts, paginated, most recent first
- use a 'quick search' that will return results matching any field (title, content, tags)
- use an 'advanced search' that will search based on specified parameters
- access a sidebar on the landing page to quickly navigate to posts by month or tag
- view a show page for each post containing the post content and content
- see all tags on the post's show page which link to a search for all posts with that tag
- view all comments on a post and see new comments appear in real time without a page reload
- add comments to a post
  
**An authorized user should be able to...**

- log in to and out of their account
- update account details
- create, edit and delete their posts
- delete comments to their posts
- use a WYSWIG editor for creating new posts

## Resources

- User
- Post
- Comment

## Services

- Auth
- Posts
- Comments
- Client

## Routes

- `GET /` 
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PATCH /api/posts/:id`
- `DELETE /api/posts/:id`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PATCH /api/users/:id`
- `DELETE /api/users/:id`
- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/signout`
- `GET /api/auth/currentuser`
- `GET /api/posts/:id/comments`
- `GET /api/posts/:id/comments/:id`
- `POST /api/posts/:id/comments/:id`
- `PATCH /api/posts/:id/comments/:id`
- `DELETE /api/posts/:id/comments/:id`

