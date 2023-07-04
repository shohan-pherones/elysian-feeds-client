interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div>
      <h2 className="text-4xl font-semibold text-white text-center uppercase mb-10">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;
