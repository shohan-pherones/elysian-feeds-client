import { MoonLoader } from "react-spinners";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <div className="flex justify-center">
      <MoonLoader
        color="#1fb2a6"
        loading={isLoading}
        size={36}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
