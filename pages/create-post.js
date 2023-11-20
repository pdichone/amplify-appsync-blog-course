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
        className='text-4xl text-center text-white font-semibold tracking-wide
      mt-6 mb-3'
      >
        Create New Post
      </h1>
      <lable className="text-2xl font-semibold text-white" htmlFor="title">Title</lable>
      <input
        onChange={onChange}
        id="title"
        name='title'
        placeholder='Title'
        value={post.title}
        className='mt-3 text-lg p-4 rounded-lg
        focus:outline-none w-full'
      />
      {image && <img src={URL.createObjectURL(image)} className='my-4' />}
      <p className="text-2xl text-white font-semibold mb-3 mt-6">Description</p>
      <SimpleMDE
        className="bg-white rounded-lg"
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
        font-semibold px-8 py-2 rounded-lg mr-4 mt-8'
        onClick={uploadImage}
      >
        Upload Image Image
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
