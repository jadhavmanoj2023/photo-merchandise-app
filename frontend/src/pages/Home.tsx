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
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0f0c29] min-h-[520px] flex items-center">
        {/* Decorative background blobs */}
        <div className="absolute w-[520px] h-[520px] rounded-full bg-purple-700 opacity-20 -top-52 -left-28 pointer-events-none" />
        <div className="absolute w-[320px] h-[320px] rounded-full bg-pink-600 opacity-15 -bottom-24 left-60 pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-violet-500 opacity-10 top-10 right-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-20 w-full">

          {/* Left — copy */}
          <div className="flex-1 z-10">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-purple-300 text-xs px-4 py-1.5 rounded-full mb-6">
              ✦ Premium quality · Delivered fast
            </span>

            <h1 className="text-5xl md:text-6xl font-semibold text-white leading-tight mb-5">
              Your photos,<br />
              transformed into<br />
              <span className="text-purple-400">lasting memories</span>
            </h1>

            <p className="text-white/60 text-base leading-relaxed max-w-md mb-8">
              From acrylic prints to personalized wall art — create gifts people actually keep.
              Upload your photo, pick a style, and we handle the rest.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                to="/category"
                className="bg-purple-400 text-[#1e0038] font-semibold px-6 py-3 rounded-lg hover:bg-purple-300 transition text-sm"
              >
                Start creating →
              </Link>
              <Link
                to="/category"
                className="flex items-center gap-2 border border-white/30 text-white px-5 py-3 rounded-lg hover:bg-white/10 transition text-sm"
              >
                <span className="text-xs">▶</span> See how it works
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 text-xs text-white/45">
              <span className="flex items-center gap-1.5">
                <span className="text-purple-400">✓</span> 7-day easy returns
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-purple-400">✓</span> Ships in 2–4 days
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-yellow-400">★</span> 4.9 · 12,000+ happy orders
              </span>
            </div>
          </div>

          {/* Right — floating product card stack */}
          {/*
            KEY FIX: The main card wrapper does NOT have overflow-hidden.
            Only the inner image div does. This lets the pills (.price-pill, .rating-pill)
            visually escape the card boundary without being clipped.
            The outer container is sized generously (340×380) so pills never touch the edge.
          */}
          <div
            className="relative flex-shrink-0 z-10 hidden md:flex items-center justify-center"
            style={{ width: '340px', height: '380px' }}
          >
            {/* Back-left card */}
            <div
              className="absolute rounded-2xl overflow-hidden opacity-70 border border-white/15 shadow-xl"
              style={{
                width: '160px',
                height: '192px',
                top: '50%',
                left: '12px',
                transform: 'translateY(-50%) rotate(-6deg)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            {/* Back-right card */}
            <div
              className="absolute rounded-2xl overflow-hidden opacity-70 border border-white/15 shadow-xl"
              style={{
                width: '160px',
                height: '192px',
                top: '50%',
                right: '12px',
                transform: 'translateY(-50%) rotate(6deg)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            {/* Main front card wrapper — NO overflow-hidden here so pills show fully */}
            <div className="relative z-10" style={{ width: '208px', height: '256px' }}>

              {/* Image container — overflow-hidden only on this inner div */}
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400"
                  className="w-full h-full object-cover"
                  alt="Sample acrylic print"
                />
              </div>

              {/* Price pill — sits 18px below the card bottom, centered */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-white text-[#0f0c29] text-xs font-semibold px-5 py-2 rounded-full whitespace-nowrap shadow-lg"
                style={{ bottom: '-18px' }}
              >
                From ₹499
              </div>

              {/* Rating pill — sits 18px above the card top, right-aligned */}
              <div
                className="absolute right-0 bg-[#1e1045] border border-white/20 text-yellow-400 text-xs px-3 py-2 rounded-full flex items-center gap-1.5 whitespace-nowrap shadow-md"
                style={{ top: '-18px' }}
              >
                ★ 4.9 <span className="text-white/60">· 2.4k reviews</span>
              </div>
            </div>
          </div>

        </div>
      </section>
      {/* ── END HERO ─────────────────────────────────────────────────────── */}

      {/* Categories */}
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

      {/* Best Sellers */}
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