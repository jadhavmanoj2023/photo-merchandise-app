import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Photo Street, Creative City, IN 12345',
  };

  const mockOrders = [
    {
      id: 'ORD001',
      date: '2026-01-20',
      total: 2499,
      status: 'Delivered',
      items: 2,
    },
    {
      id: 'ORD002',
      date: '2026-01-15',
      total: 1799,
      status: 'Processing',
      items: 1,
    },
    {
      id: 'ORD003',
      date: '2026-01-10',
      total: 3299,
      status: 'Shipped',
      items: 3,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{mockUser.name}</h2>
              <p className="text-gray-600">{mockUser.email}</p>
            </div>

            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-semibold">
                Profile Details
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                Order History
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition">
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={mockUser.name}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={mockUser.email}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={mockUser.phone}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={mockUser.address}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
            </div>
            <button className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
              Edit Profile
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Orders</h3>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">Order #{order.id}</h4>
                      <p className="text-sm text-gray-600">{order.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </p>
                    <p className="font-bold text-blue-700">₹{order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}