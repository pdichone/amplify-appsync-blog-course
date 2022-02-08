import { useEffect, useState, useRef } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
// import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { updatePost } from "../../src/graphql/mutations";
import { getPost } from "../../src/graphql/queries";
import { v4 as uuid } from "uuid";

function EditPost() {
  const [post, setPost] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [localImage, setLocalImage] = useState(null);
  const fileInput = useRef(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchPost();
    async function fetchPost() {
      if (!id) return;
      const postData = await API.graphql({
        query: getPost,
        variables: { id },
      });
      setPost(postData.data.getPost);
      if (postData.data.getPost.coverImage) {
        updateCoverImage(postData.data.getPost.coverImage);
      }
    }
  }, [id]);

  if (!post) return null;
  async function updateCoverImage(coverImage) {
    const imageKey = await Storage.get(coverImage);
    setCoverImage(imageKey);
  }
  async function uploadImage() {
    fileInput.current.click();
  }

  function handleChange(e) {
    const fileUpload = e.target.files[0];
    if (!fileUpload) return;
    setCoverImage(fileUpload);
    setLocalImage(URL.createObjectURL(fileUpload));
  }

  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }));
  }

  const { title, content } = post;
  async function updateCurrentPost() {
    if (!title || !content) return;
    const postUpdated = {
      id,
      content,
      title,
    };
    if (coverImage && localImage) {
      const fileName = `${coverImage.name}_${uuid()}`;
      postUpdated.coverImage = fileName;
      await Storage.put(fileName, coverImage);
    }

    await API.graphql({
      query: updatePost,
      variables: { input: postUpdated },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    });
    router.push("/my-posts");
  }
  return (
    <div>
      <h1 className='text-3xl font-semibold tracking-wide mt-6 mb-2'>
        Edit post
      </h1>

      {coverImage && (
        <img className='mt-4' src={localImage ? localImage : coverImage} />
      )}
      <input
        onChange={onChange}
        name='title'
        placeholder='Title'
        value={post.title}
        className='border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2'
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <input
        type='file'
        ref={fileInput}
        className='absolute w-0 h-0'
        onChange={handleChange}
      />

      <button
        className='mb-4 bg-purple-600 text-white font-semibold px-8 py-2 rounded-lg'
        onClick={uploadImage}
      >
        Upload Cover Image
      </button>

      <button
        className='mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg'
        onClick={updateCurrentPost}
      >
        Update Post
      </button>
    </div>
  );
}

export default EditPost;
