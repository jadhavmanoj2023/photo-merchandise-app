import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { frameTemplates, frameCategories, FrameCategory } from '../data/frameTemplates';
import FrameThumbnail from '../components/FrameThumbnail';

export default function FrameGallery() {
  const [activeCategory, setActiveCategory] = useState<FrameCategory>('All');
  const navigate = useNavigate();

  const filtered =
    activeCategory === 'All'
      ? frameTemplates
      : frameTemplates.filter((f) => f.category === activeCategory);

  const categoryIcons: Record<FrameCategory, string> = {
    All: '⊞',
    Portrait: '▯',
    Landscape: '▭',
    Square: '□',
    Circle: '○',
    Collage: '⊟',
    'Dual Border': '⬜',
    Creative: '✦',
  };

  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-5">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Acrylic Wall Photo Frames
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Choose a frame style · Upload your photo · Preview & order
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide">
            {frameCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                <span className="text-xs opacity-70">{categoryIcons[cat]}</span>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Frame Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-gray-400 mb-6">
          {filtered.length} frame style{filtered.length !== 1 ? 's' : ''} available
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((frame) => (
            <div
              key={frame.id}
              onClick={() => navigate(`/frame-customizer/${frame.id}`)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200 hover:-translate-y-1"
            >
              {/* Thumbnail area */}
              <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 min-h-[200px]">
                <div className="transition-transform duration-300 group-hover:scale-105">
                  <FrameThumbnail frame={frame} size={140} />
                </div>
              </div>

              {/* Card footer */}
              <div className="px-4 py-3 border-t border-gray-50">
                <p className="text-sm font-semibold text-gray-800 truncate">{frame.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider">
                    {frame.category}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[11px] font-semibold px-2.5 py-1 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors">
                    ✏ Customise
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}