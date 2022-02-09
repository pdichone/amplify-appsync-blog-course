/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const newOnCreatePost = /* GraphQL */ `
  subscription NewOnCreatePost {
    newOnCreatePost {
      id
      title
      content
      username
      coverImage
      comments {
        items {
          id
          message
          postID
          createdAt
          updatedAt
          createdBy
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($username: String) {
    onCreatePost(username: $username) {
      id
      title
      content
      username
      coverImage
      comments {
        items {
          id
          message
          postID
          createdAt
          updatedAt
          createdBy
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($username: String) {
    onUpdatePost(username: $username) {
      id
      title
      content
      username
      coverImage
      comments {
        items {
          id
          message
          postID
          createdAt
          updatedAt
          createdBy
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($username: String) {
    onDeletePost(username: $username) {
      id
      title
      content
      username
      coverImage
      comments {
        items {
          id
          message
          postID
          createdAt
          updatedAt
          createdBy
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($createdBy: String) {
    onCreateComment(createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        coverImage
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      postID
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($createdBy: String) {
    onUpdateComment(createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        coverImage
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      postID
      createdAt
      updatedAt
      createdBy
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($createdBy: String) {
    onDeleteComment(createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        coverImage
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      postID
      createdAt
      updatedAt
      createdBy
    }
  }
`;
