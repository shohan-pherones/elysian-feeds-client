import { data } from "@/data/galleryImages";
import SectionTitle from "./SectionTitle";
import GalleryItem from "./GalleryItem";

const Gallery = () => {
  return (
    <section className="wrapper section-padding">
      <SectionTitle title="Ethereal Exhibit" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {data.map((image: any) => (
          <GalleryItem key={image.id} src={image.src} alt={image.alt} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
