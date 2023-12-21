import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData)
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);

    if (post) {
      const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        userId: userData.$id,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        data.userName = userData.name;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
        console.log(dbPost)

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }

    setLoading(false);
  };

  const slugTransform = useCallback(
    (value) => {
      if (value && typeof value === "string")
        return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");

      return "";
    },
    []
  );

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      {loading && (
        <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce' style={{ animationDelay: '-0.3s' }}></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce' style={{ animationDelay: '-0.15s' }}></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
      </div>
      
      )}

      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
          />
          <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" disabled={loading}>
            {loading ? "Loading..." : post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}
