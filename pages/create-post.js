import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, React } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import { createPost } from "../src/graphql/mutations";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const initialState = { title: "", content: "" };
function CreatePost() {
  const [post, setPost] = useState(initialState);
  const { title, content } = post;
  const router = useRouter();
  const [image, setImage] = useState(null);
  const imageFileInput = useRef(null);

  function onChange(e) {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNewPost() {
    if (!title || !content) return;
    const id = uuid();
    post.id = id;

    if (image) {
      const filename = `${image.name}_${uuid()}`;
      post.coverImage = filename;
      await Storage.put(filename, image);
    }

    await API.graphql({
      query: createPost,
      variables: { input: post },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push(`/posts/${id}`);
  }
  async function uploadImage() {
    imageFileInput.current.click();
  }
  function handleChange(e) {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
  }

  return (
    <div>
      <h1
        className='text-3xl font-semibold tracking-wide
      mt-6'
      >
        Create new Post
      </h1>
      <input
        onChange={onChange}
        name='title'
        placeholder='Title'
        value={post.title}
        className='border-b pb-2 text-lg my-4
         focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2'
      />
      {image && <img src={URL.createObjectURL(image)} className='my-4' />}
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <input
        type='file'
        ref={imageFileInput}
        className='absolute w-0 h-0'
        onChange={handleChange}
      />
      <button
        type='button'
        className='bg-green-600 text-white 
        font-semibold px-8 py-2 rounded-lg mr-2'
        onClick={uploadImage}
      >
        Upload Cover Image
      </button>
      <button
        type='button'
        className='mb-4 bg-blue-600 text-white 
     font-semibold px-8 py-2 rounded-lg'
        onClick={createNewPost}
      >
        Create Post
      </button>{" "}
    </div>
  );
}

export default withAuthenticator(CreatePost);
