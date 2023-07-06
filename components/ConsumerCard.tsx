import Image from "next/image";
import Link from "next/link";

interface ConsumerCardProps {
  id: string;
  name: string;
  image: string;
  address: string;
  consumptions: number;
}

const ConsumerCard: React.FC<ConsumerCardProps> = ({
  id,
  name,
  image,
  address,
  consumptions,
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
        <p>Total Consumptions: {consumptions}</p>
        <div className="card-actions justify-start">
          <Link href={`/providers/${id}`} className="btn btn-accent">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsumerCard;
