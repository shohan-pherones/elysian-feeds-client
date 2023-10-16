import { data } from "@/data/blogs";
import SectionTitle from "./SectionTitle";
import BlogItem from "./BlogItem";

const Blogs = () => {
  return (
    <section className="wrapper section-padding">
      <SectionTitle title="Blogs" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {data.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
