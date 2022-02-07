import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listPosts } from "./../src/graphql/queries";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    });
    setPosts(postData.data.listPosts.items);
  }

  return (
    <div>
      <h1
        className='text-sky-400 text-3xl 
    font-bold tracking-wide mt-6 mb-2'
      >
        My Posts
      </h1>

      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <div
            className='cursor-pointer border-b border-gray-300
        mt-8 pb-4'
          >
            <h2 className='text-xl font-semibold' key={index}>
              {post.title}
            </h2>
            <p className='text-gray-500 mt-2'>Author: {post.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
