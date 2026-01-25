import { Link } from 'react-router-dom';

export default function About() {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Premium Quality',
      description: 'We use only the finest materials to ensure your memories last a lifetime.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast Delivery',
      description: 'Quick turnaround time with reliable shipping to your doorstep.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: 'Custom Design',
      description: 'Personalize every product exactly the way you want it.',
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '100% Satisfaction',
      description: 'We stand behind our products with a satisfaction guarantee.',
    },
  ];

  return (
    <div>
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About PhotoMerch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We transform your cherished memories into beautiful, lasting keepsakes
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, PhotoMerch was born from a simple idea: everyone should be able to turn their favorite moments into tangible treasures. We started with a small team of passionate creatives who believed that photos deserve more than just living on a phone or computer.
              </p>
              <p className="text-gray-600 mb-4">
                Today, we've helped thousands of customers preserve their memories in unique and meaningful ways. From acrylic prints to personalized keychains, every product we create is crafted with care and attention to detail.
              </p>
              <p className="text-gray-600">
                Our mission is to make high-quality, personalized photo products accessible to everyone, combining cutting-edge printing technology with timeless craftsmanship.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600"
                alt="Our team"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-blue-700 mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg shadow-xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Create Something Special?</h2>
            <p className="text-xl mb-8">Start turning your memories into art today</p>
            <Link
              to="/category"
              className="inline-block bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}