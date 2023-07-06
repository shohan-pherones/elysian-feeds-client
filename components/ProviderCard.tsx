import Image from "next/image";
import Link from "next/link";

interface ProviderCardProps {
  id: string;
  name: string;
  image: string;
  address: string;
  contributions: number;
}

const ProviderCard: React.FC<ProviderCardProps> = ({
  id,
  name,
  image,
  address,
  contributions,
}) => {
  return (
    <div className="card w-full bg-base-300 shadow-xl">
      <figure>
        <Image
          src={image}
          alt={name}
          width={500}
          height={500}
          priority
          className="h-60 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Address: {address}</p>
        <p>Total Contributions: {contributions}</p>
        <div className="card-actions justify-start">
          <Link href={`/providers/${id}`} className="btn btn-accent">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
