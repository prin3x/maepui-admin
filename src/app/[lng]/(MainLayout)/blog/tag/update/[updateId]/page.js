"use client";
import TagForm from "@/Components/Tag/TagForm";
import FormWrapper from "@/Utils/HOC/FormWrapper";

const BlogTagUpdate = ({ params }) => {
  return (
    params?.updateId && (
      <FormWrapper title="UpdateTag">
        <TagForm updateId={params?.updateId} type={"BLOG"} />
      </FormWrapper>
    )
  );
};

export default BlogTagUpdate;
