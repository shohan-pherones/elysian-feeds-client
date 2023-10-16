import Image from "next/image";

interface BlogItemProps {
  blog: {
    id: string;
    title: string;
    banner: string;
    author: string;
    publishedDate: string;
    body: string;
  };
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
  return (
    <div className="overflow-hidden h-full">
      <div className="card h-full w-full bg-base-300 border border-white/30">
        <figure>
          <Image
            src={blog.banner}
            alt={blog.title}
            width={400}
            height={300}
            priority
            className="h-60 w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title truncate">{blog.title}</h2>
          <div className="flex items-center justify-between gap-5">
            <p>{blog.author}</p>
            <p>{blog.publishedDate}</p>
          </div>
          <p>{blog.body.substring(0, 200)}...</p>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
