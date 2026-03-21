import { useParams } from "react-router-dom";
import ToolLayout from "@/components/ToolLayout";
import { blogs } from "@/data/blogs";

const BlogPost = () => {
  const { slug } = useParams();

  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return <ToolLayout title="Not Found">Post not found</ToolLayout>;
  }

  return (
    <ToolLayout title={post.title}>

      <div className="bg-black/40 border border-white/10 p-6 rounded-xl backdrop-blur-md space-y-4">

        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {post.content}
        </p>

      </div>

    </ToolLayout>
  );
};

export default BlogPost;