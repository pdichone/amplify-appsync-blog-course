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

const initialState = { title: "", content: "", slug: "", categories: "" };
function CreatePost() {
  const [post, setPost] = useState(initialState);
  const { title, content, slug, categories } = post;
  const router = useRouter();
  const [image, setImage] = useState(null);
  const imageFileInput = useRef(null);

  function onChange(e) {
    setPost(() => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNewPost(e) {
    setPost(initialState);
    if (!title || !content || !slug || !categories) return;
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
        className="text-4xl text-center text-white font-semibold tracking-wide
      mt-6 mb-3"
      >
        Create New Post
      </h1>
      <lable className="text-2xl font-semibold text-white" htmlFor="title">
        Title
      </lable>
      <input
        onChange={onChange}
        id="title"
        name="title"
        placeholder="Title"
        value={post.title}
        className="my-3 text-lg p-4 rounded-lg
        focus:outline-none w-full"
      />
      <lable className="text-2xl font-semibold text-white" htmlFor="slug">
        Slug
      </lable>
      <input
        onChange={onChange}
        id="slug"
        name="slug"
        placeholder="Slug"
        value={post.slug}
        className="my-3 text-lg p-4 rounded-lg
        focus:outline-none w-full"
      />
      <lable className="text-2xl font-semibold text-white" htmlFor="categories">
        Categories
      </lable>
      <input
        onChange={onChange}
        id="categories"
        name="categories"
        placeholder="Categories"
        value={post.categories}
        className="my-3 text-lg p-4 rounded-lg
        focus:outline-none w-full"
      />
      <lable className="text-2xl font-semibold text-white" htmlFor="metatitle">
        MetaTitle
      </lable>
      <input
        onChange={onChange}
        id="metatitle"
        name="metatitle"
        placeholder="MetaTitle"
        value={post.metaTitle}
        className="my-3 text-lg p-4 rounded-lg
        focus:outline-none w-full"
      />
      <p className="text-2xl text-white font-semibold mb-3 mt-3">Content</p>
      <SimpleMDE
        className="bg-white rounded-lg mb-3"
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <input
        type="file"
        ref={imageFileInput}
        className="absolute w-0 h-0"
        onChange={handleChange}
      />
      <lable
        className="text-2xl font-semibold text-white"
        htmlFor="metadescription"
      >
        Meta Description
      </lable>
      <input
        onChange={onChange}
        id="metadescription"
        name="metadescription"
        placeholder="MetaDescription"
        value={post.metaDescription}
        className="mt-3 text-lg p-4 rounded-lg
        focus:outline-none w-full"
      />
      {image && (
        <div className="flex h-[40vh]">
        <div>
          <img src={URL.createObjectURL(image)} className="my-4 h-[40vh]" />
        </div>
        <div className="">
        <button
        type="button"
        className="bg-green-600 text-white 
        font-semibold px-8 py-2 rounded-lg mt-4 ml-4"
        onClick={uploadImage}
      >
        Change
      </button>    
        </div>
        </div>
      )}
      <button
        type="button"
        className="bg-green-600 text-white 
        font-semibold px-8 py-2 rounded-lg mr-4 mt-8"
        onClick={uploadImage}
      >
        Upload Image Image
      </button>
      <button
        type="button"
        className="mb-4 bg-blue-600 text-white 
     font-semibold px-8 py-2 rounded-lg"
        onClick={createNewPost}
      >
        Create Post
      </button>{" "}
    </div>
  );
}

export default withAuthenticator(CreatePost);
