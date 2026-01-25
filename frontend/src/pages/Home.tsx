import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const bestSellers = products.slice(0, 5);
  
  const categories = [
    {
      name: 'Premium Acrylic Photos',
      image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=500',
    },
    {
      name: 'Framed Acrylic Photos',
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400',
    },
    {
      name: 'Wall Clocks',
      image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400',
    },
    {
      name: 'Acrylic Cut Outs',
      image: 'https://images.unsplash.com/photo-1549298240-0d8e60513026?w=400',
    },
    {
      name: 'Name Plates',
      image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=400',
    },
    {
      name: 'Fridge Magnets',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    },
    {
      name: 'Mini Photo Gallery Set',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400',
    },
    {
      name: 'Acrylic Photo Stand',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Turn Your Memories Into Art
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create stunning personalized photo merchandise with premium quality materials
          </p>
          <Link
            to="/category"
            className="inline-block bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition"
          >
            Upload Your Photo
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Browse Categories
          </h2>
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {categories.map((category, index) => (
              <Link
                key={index}
                to="/category"
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Best Sellers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/category"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}