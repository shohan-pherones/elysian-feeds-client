import { data } from "@/data/blogs";
import BlogItem from "./BlogItem";
import SectionTitle from "./SectionTitle";

const Blogs = () => {
  return (
    <section className="wrapper section-padding">
      <SectionTitle title="Blogs" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {data.map((blog, index) => (
          <BlogItem key={blog.id} blog={blog} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
