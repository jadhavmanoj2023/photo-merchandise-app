import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ImageUploader from '../components/ImageUploader';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('Medium');
  const [quantity, setQuantity] = useState<number>(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    );
  }

  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];

  const handleAddToCart = () => {
    if (!uploadedImage) {
      alert('Please upload an image first');
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        productName: `${product.name} (${selectedSize})`,
        price: product.price,
        quantity,
        uploadedImageUrl: uploadedImage,
      })
    );

    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-700 mb-6">₹{product.price}</p>
          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Upload Your Photo</h3>
            <ImageUploader onImageUpload={setUploadedImage} />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Select Size</h3>
            <div className="grid grid-cols-2 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-4 rounded-lg border-2 transition ${
                    selectedSize === size
                      ? 'border-blue-700 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-700'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-700 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}