## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

=======

## Blog App with AWS AppSync and Amplify CLI

This is a full-fledged Blog web app created using Amplyfy CLI, AWS AppSync and NextJS for the frontend. All of the instructions and steps can be found in the accompanying course: [https://www.udemy.com/course/aws-appsync-amplify-with-react-graphql-course](https://www.udemy.com/course/aws-appsync-amplify-with-react-graphql-course).

### For Students of the course

If you are a student, I recommend you download/clone this repo so you have the code handy as you go through the course.

## Building the App (automated)

This project contains an Amplify project (/amplify) already configured & ready to be deployed. Deploying this project will create the following resources in your account: an authentication configuration using Amazon Cognito, an AWS AppSync GraphQL API, & a DynamoDB table.

1. Make sure you are on the newest version of the AWS Amplify CLI

```bash
npm install -g @aws-amplify/cli
```

``You must also have the CLI configured with a user from your AWS account (amplify configure). For a walkthrough of how to do this, check the lecture in the course where I show how to do just that (or go to amplify docs).`

2. Clone the Blog app

`git clone https://github.com/pdichone/amplify-appsync-blog-course.git`

3. Install dependencies

`npm install`

4. Initialize the amplify project

`amplify init`

- Enter a name for the environment

5. Push the new resources to the cloud (AWS AppSync console)

``amplify push`

6. Run the project

```bash
npm dev run
```

## Build the App (manually)

You can also manually set up your resources if you would like. If you would like to manually create & configure the resources for this project, follow these steps:

1. Install & configure the Amplify CLI

```bash
  npm install -g @aws-amplify

  amplify configure
```

2. Clone the Blog App

`git clone https://github.com/pdichone/amplify-appsync-blog-course.git`

3. Install dependencies

`npm install`

4. Delete the amplify folder

5. Initialize a new amplify project

`amplify init`

6. Add Authentication

`amplify add auth `

7. Add the api

`amplify add api`

`Choose Cognito User Pools as the authentication type. When prompted for the GraphQL schema, use the following schema: `

**The simple schema (the beginning of the course this is what's used)**

```
At first, use this one:

type Post
   @model
   @auth(
     rules: [
       { allow: owner, ownerField: "username" }
       { allow: public, operations: [read] }
     ]
   ) {
   id: ID!
   title: String!
   content: String!
   username: String
     @index(name: "postsByUsername", queryField: "postsByUsername")
   coverImage: String
 }

```

**This is the final Schema**

```

# This is the final schema
type Post
  @model
  @auth(
    rules: [
      { allow: owner, ownerField: "username" }
      { allow: public, operations: [read] }
    ]
  ) {
  id: ID!
  title: String!
  content: String!
  username: String
    @index(name: "postsByUsername", queryField: "postsByUsername")
  coverImage: String
  comments: [Comment] @hasMany(indexName: "byPost", fields: ["id"]) #check out: https://docs.amplify.aws/cli/graphql/data-modeling/#has-many-relationship
}

type Comment
  @model
  @auth(
    rules: [
      { allow: owner, ownerField: "createdBy" }
      { allow: public, operations: [read] }
    ]
  ) {
  id: ID!
  message: String
  post: Post @belongsTo(fields: ["postID"])
  postID: ID @index(name: "byPost")
}
type Subscription {
  newOnCreatePost: Post @aws_subscribe(mutations: ["createPost"])
  #newOnUpdatedPost: Post @aws_subscribe(mutations: ["updatePost"])
}

```

8. Run `push` command to create the resources in your account:

`amplify push`

9. Run the project

`npm run dev`

10. Deleting the project (caution: this command deletes the entire project in the cloud)

`amplify delete`

Happy coding!

Paulo
