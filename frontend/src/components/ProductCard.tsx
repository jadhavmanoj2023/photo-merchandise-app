import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title + Price */}
      <div className="p-3 flex items-center justify-between gap-2">
        <h3
          className="text-sm font-medium text-gray-800 truncate flex-1"
          title={name}
        >
          {name}
        </h3>
        <span className="text-sm font-semibold text-blue-700 whitespace-nowrap">
          ₹{price}
        </span>
      </div>
    </Link>
  );
}
