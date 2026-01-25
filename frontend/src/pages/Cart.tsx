import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function Cart() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleQuantityChange = (productId: string, imageUrl: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id: `${productId}_${imageUrl}`, quantity: newQuantity }));
  };

  const handleRemove = (productId: string, imageUrl: string) => {
    dispatch(removeFromCart(`${productId}_${imageUrl}`));
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="flex gap-6">
                <img
                  src={item.uploadedImageUrl}
                  alt={item.productName}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.productName}
                  </h3>
                  <p className="text-blue-700 font-bold mb-4">₹{item.price}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.uploadedImageUrl, item.quantity - 1)
                      }
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.productId, item.uploadedImageUrl, item.quantity + 1)
                      }
                      className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.productId, item.uploadedImageUrl)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-blue-700">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Checkout (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}