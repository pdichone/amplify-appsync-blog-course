import { useState, useEffect } from "react";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listPosts } from "./../src/graphql/queries";
import Link from "next/link";
import { newOnCreatePost } from "./../src/graphql/subscriptions";
import RyzLogo from "../src/assets/blogLogo/ryzBlog.png"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);

  let subOncreate;

  function setUpSubscriptions() {
    subOncreate = API.graphql(graphqlOperation(newOnCreatePost)).subscribe({
      next: (postData) => {
        console.log(postData.value.data.newOnCreatePost);
        setPosts((prevPosts) => [postData.value.data.newOnCreatePost, ...prevPosts]);
      },
      
    });
  }
  useEffect(() => {
    setUpSubscriptions();
    return () => {
      subOncreate.unsubscribe();
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [post]);

  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    });
    const { items } = postData.data.listPosts;
    const postWithImages = await Promise.all(
      items.map(async (post) => {
        if (post.coverImage) {
          post.coverImage = await Storage.get(post.coverImage);
        }
        return post;
      })
    );

    setPosts(postWithImages);
  }

  return (
    <div className="bg-lightGrey" >
      <div className="flex justify-center mb-6 ">
        <img className="" width="200px" src={RyzLogo.src} alt="ryzLogo" />
      </div>

    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post, index) => (
            <Link key={index} href={`/posts/${post.id}`}>
                <div className='border-b border-gray-300 rounded-t-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out bg-white'>
                    {post.coverImage && (
                        <img
                            src={post.coverImage}
                            className='w-full h-36 object-cover rounded-md'
                        />
                    )}
                    <div className='mt-2 p-4'>
                        <h2 className='text-2xl font-semibold cursor-pointer'>{post.title}</h2>
                        <button className="button-hover-color border-2 border-black rounded-lg px-2 py-1 font-bold my-4">Read more</button>
                        {/* <p className='text-gray-500 mt-2'>Author: {post.username}</p> */}
                        {post.comments && post.comments.items && post.comments.items.length > 0 && (
                            post.comments.items.map((comment, index) => (
                                <div key={index}>
                                    {/* Render comment content here */}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </Link>
        ))}
    </div>
</div>

  );
}
