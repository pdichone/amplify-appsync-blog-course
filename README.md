# amplify-appsync-blog-course

Final AWS amplify &amp; AppSync &amp; NextJs Blog project

# Removing Services

If at any time, or at the end of this workshop, you would like to delete a service from your project & your account, you can do this by running the `amplify remove` command:

```
$ amplify remove auth

$ amplify push
```

f you are unsure of what services you have enabled at any time, you can run the `amplify status` command:

`$ amplify status`

`amplify status` will give you the list of all the enabled services in your app.

## Deleting the Amplify project and all services

If you would like to delete everything - the entire project, run the `delete` command:

`$ amplify delete `

# Next Steps/Challenges/Exercise

1.  Add another type in the `schema` called `Likes`
2.  Add the correct directives to relate to the comments table
3.  Add a functionality for users to like posts and show the likes count on the post.
