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
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onCreatePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      coverImage
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onUpdatePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      coverImage
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onDeletePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      coverImage
      comments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onCreateComment(filter: $filter, createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        coverImage
        createdAt
        updatedAt
        __typename
      }
      postID
      createdAt
      updatedAt
      createdBy
      __typename
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onUpdateComment(filter: $filter, createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        coverImage
        createdAt
        updatedAt
        __typename
      }
      postID
      createdAt
      updatedAt
      createdBy
      __typename
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $createdBy: String
  ) {
    onDeleteComment(filter: $filter, createdBy: $createdBy) {
      id
      message
      post {
        id
        title
        content
        username
        coverImage
        createdAt
        updatedAt
        __typename
      }
      postID
      createdAt
      updatedAt
      createdBy
      __typename
    }
  }
`;
