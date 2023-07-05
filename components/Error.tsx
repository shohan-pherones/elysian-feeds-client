interface ErrorProps {
  error: string;
}
const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div className="text-center text-error">
      <p>{error}</p>
    </div>
  );
};

export default Error;
