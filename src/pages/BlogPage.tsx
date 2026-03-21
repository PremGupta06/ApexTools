import ToolLayout from "@/components/ToolLayout";
import { Link } from "react-router-dom";
import { blogs } from "@/data/blogs";

const Blog = () => {
  return (
    <ToolLayout title="Blog">

      <div className="grid gap-4">

        {blogs.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="p-5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md hover:border-primary/40"
          >
            <h3 className="text-white font-semibold">
              {post.title}
            </h3>

            <p className="text-xs text-muted-foreground mt-1">
              Read article →
            </p>
          </Link>
        ))}

      </div>

    </ToolLayout>
  );
};

export default Blog;