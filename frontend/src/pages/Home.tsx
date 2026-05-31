import { Link } from 'react-router-dom';
import { mainCategories } from '../data/catalog';

export default function Home() {
  return (
    <div>
      {/* Hero — original layout */}
      <section className="relative overflow-hidden bg-[#0f0c29] min-h-[520px] flex items-center">
        <div className="absolute w-[520px] h-[520px] rounded-full bg-purple-700 opacity-20 -top-52 -left-28 pointer-events-none" />
        <div className="absolute w-[320px] h-[320px] rounded-full bg-pink-600 opacity-15 -bottom-24 left-60 pointer-events-none" />
        <div className="absolute w-[200px] h-[200px] rounded-full bg-violet-500 opacity-10 top-10 right-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 py-20 w-full">
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
                to={`/category/${mainCategories[0]?.slug ?? 'classic-frames'}`}
                className="bg-purple-400 text-[#1e0038] font-semibold px-6 py-3 rounded-lg hover:bg-purple-300 transition text-sm"
              >
                Start creating →
              </Link>
              <Link
                to={`/category/${mainCategories[0]?.slug ?? 'classic-frames'}`}
                className="flex items-center gap-2 border border-white/30 text-white px-5 py-3 rounded-lg hover:bg-white/10 transition text-sm"
              >
                <span className="text-xs">▶</span> Browse categories
              </Link>
            </div>

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

          <div
            className="relative flex-shrink-0 z-10 hidden md:flex items-center justify-center"
            style={{ width: '340px', height: '380px' }}
          >
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

            <div className="relative z-10" style={{ width: '208px', height: '256px' }}>
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400"
                  className="w-full h-full object-cover"
                  alt="Sample acrylic print"
                />
              </div>

              <div
                className="absolute left-1/2 -translate-x-1/2 bg-white text-[#0f0c29] text-xs font-semibold px-5 py-2 rounded-full whitespace-nowrap shadow-lg"
                style={{ bottom: '-18px' }}
              >
                From ₹499
              </div>

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

      {/* Categories */}
      <section className="py-12 md:py-16 bg-[#f5f4f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
            Shop by category
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Six collections — frames, prints, collage & more
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#e11d48]">
                    {category.brand}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-1 group-hover:text-[#e11d48] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{category.description}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-[#e11d48]">
                    View frames
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-2xl mb-2">🚚</div>
              <h3 className="font-semibold text-gray-900 text-sm">Free shipping</h3>
              <p className="text-xs text-gray-500 mt-1">On all orders across India</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">↩️</div>
              <h3 className="font-semibold text-gray-900 text-sm">30-day returns</h3>
              <p className="text-xs text-gray-500 mt-1">Hassle-free guarantee</p>
            </div>
            <div className="p-4">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-900 text-sm">100% secure</h3>
              <p className="text-xs text-gray-500 mt-1">Encrypted checkout</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
