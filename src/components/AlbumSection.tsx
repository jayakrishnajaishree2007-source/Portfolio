import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Sparkles,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ALBUM_CATEGORIES,
  AlbumCategory,
  AlbumPhoto,
  INITIAL_ALBUM_PHOTOS,
} from '../data/portfolioData';

const INITIAL_PAGE_SIZE = 18;

export function AlbumSection() {
  const [activeCategory, setActiveCategory] = useState<AlbumCategory>('All');
  const [visibleLimit, setVisibleLimit] = useState(INITIAL_PAGE_SIZE);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [activePhoto, setActivePhoto] = useState<AlbumPhoto | null>(null);

  // Photos immutable verified catalog for published production
  const photos = INITIAL_ALBUM_PHOTOS;

  // Reset pagination when category changes
  const handleCategoryChange = (cat: AlbumCategory) => {
    setActiveCategory(cat);
    setVisibleLimit(INITIAL_PAGE_SIZE);
  };

  // Lock body scroll and prevent Lenis background scrolling when lightbox modal is open
  useEffect(() => {
    if (activePhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhoto]);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'All') return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [activeCategory, photos]);

  const displayedPhotos = useMemo(() => {
    return filteredPhotos.slice(0, visibleLimit);
  }, [filteredPhotos, visibleLimit]);

  const activeIdx = useMemo(() => {
    if (!activePhoto) return -1;
    return filteredPhotos.findIndex((p) => p.id === activePhoto.id);
  }, [activePhoto, filteredPhotos]);

  const handlePrev = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const nextIdx = (activeIdx - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIdx]);
  }, [activeIdx, filteredPhotos]);

  const handleNext = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const nextIdx = (activeIdx + 1) % filteredPhotos.length;
    setActivePhoto(filteredPhotos[nextIdx]);
  }, [activeIdx, filteredPhotos]);

  // Lightbox Keyboard Navigation
  useEffect(() => {
    if (!activePhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePhoto(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePhoto, handleNext, handlePrev]);

  return (
    <section id="album" className="relative py-24 sm:py-32 border-b border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.22em] text-[#00D9FF]">
              <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>07 · Visual Journey &amp; Milestones</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white mt-2">
              Photo <span className="gradient-text-cyan">Album</span> &amp; Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mt-3 leading-relaxed">
              Documented snapshots of campus leadership, national symposium awards, network lab sessions, and engineering highlights.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 border border-white/15 bg-[#0C0F15] font-mono-tech text-xs text-[#CBD5E1]">
              <span className="text-[#00D9FF] font-semibold">{photos.length}</span> Verified Records
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {ALBUM_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 border font-mono-tech text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#00D9FF] ${
                  isSelected
                    ? 'border-[#00D9FF] bg-[#00D9FF] text-[#080A0E] font-semibold shadow-[0_0_16px_rgba(0,217,255,0.25)]'
                    : 'border-white/15 bg-[#0C0F15] text-[#CBD5E1] hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
          <span className="font-mono-tech text-xs text-[#94A3B8] ml-auto">
            Showing {displayedPhotos.length} of {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photo' : 'Photos'}
          </span>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPhotos.map((photo) => (
            <article
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              data-cursor="VIEW"
              className="group relative cursor-pointer border border-white/15 bg-[#0C0F15]/90 hover:border-[#00D9FF]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Photo Image Stage */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#10131A]">
                {imageErrors[photo.id] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#10131A] text-[#94A3B8]">
                    <ImageIcon className="w-10 h-10 text-[#00D9FF]/40 mb-2" />
                    <span className="font-mono-tech text-xs uppercase text-white tracking-wider line-clamp-1">
                      {photo.title}
                    </span>
                    <span className="text-[11px] text-[#64748B] mt-1">{photo.category}</span>
                  </div>
                ) : (
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    onError={() =>
                      setImageErrors((prev) => ({ ...prev, [photo.id]: true }))
                    }
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  />
                )}

                {/* Ambient vignette and hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F15] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Floating Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="px-2.5 py-1 text-[10px] font-mono-tech uppercase tracking-wider font-semibold border backdrop-blur-md"
                    style={{
                      borderColor: `${photo.color}60`,
                      backgroundColor: `${photo.color}15`,
                      color: photo.color,
                    }}
                  >
                    {photo.tag}
                  </span>
                </div>
              </div>

              {/* Photo Caption & Metadata */}
              <div className="p-5 space-y-2 border-t border-white/10 bg-[#0C0F15]">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono-tech text-[10px] uppercase tracking-widest text-[#94A3B8]">
                    {photo.category}
                  </p>
                  <span className="font-mono-tech text-[11px] text-[#CBD5E1]">{photo.date}</span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#00D9FF] transition-colors line-clamp-1">
                  {photo.title}
                </h3>

                <p className="text-xs text-[#CBD5E1] line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>

                {photo.location && (
                  <p className="font-mono-tech text-[10px] text-[#38BDF8] pt-1">
                    📍 {photo.location}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Load More / Expand Controls */}
        {filteredPhotos.length > visibleLimit && (
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setVisibleLimit((prev) => prev + 18)}
              className="px-6 py-3 border border-[#00D9FF] bg-[#00D9FF]/10 hover:bg-[#00D9FF] text-[#00D9FF] hover:text-[#080A0E] font-mono-tech text-xs uppercase font-semibold tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,217,255,0.15)]"
            >
              Load More Photos (+{Math.min(18, filteredPhotos.length - visibleLimit)} Remaining)
            </button>
            <button
              type="button"
              onClick={() => setVisibleLimit(filteredPhotos.length)}
              className="px-6 py-3 border border-white/20 hover:border-white/40 bg-[#10131A] text-[#CBD5E1] hover:text-white font-mono-tech text-xs uppercase tracking-wider transition-colors"
            >
              Show All ({filteredPhotos.length})
            </button>
          </div>
        )}
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden border border-white/20 bg-[#0C0F15] flex flex-col lg:flex-row shadow-[0_32px_120px_rgba(0,0,0,0.95)]"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-20 w-10 h-10 border border-white/20 bg-black/80 hover:border-[#00D9FF] text-white flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#00D9FF]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[220px] sm:min-h-[320px] max-h-[48vh] lg:max-h-none overflow-hidden select-none">
              {imageErrors[activePhoto.id] ? (
                <div className="w-full h-full min-h-[320px] flex flex-col items-center justify-center p-8 text-center text-[#94A3B8]">
                  <ImageIcon className="w-16 h-16 text-[#00D9FF]/40 mb-3" />
                  <p className="font-display text-xl text-white font-bold">{activePhoto.title}</p>
                  <p className="text-xs text-[#64748B] mt-1">{activePhoto.caption}</p>
                </div>
              ) : (
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [activePhoto.id]: true }))
                  }
                  className="max-w-full max-h-[75vh] object-contain p-2 transition-all duration-300"
                />
              )}

              {/* On-image Navigation Chevrons */}
              {filteredPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/70 hover:bg-[#00D9FF] hover:text-[#080A0E] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/70 hover:bg-[#00D9FF] hover:text-[#080A0E] text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                  </button>

                  {/* Photo counter overlay */}
                  <div className="absolute bottom-3 left-3 z-20 px-3 py-1 bg-black/80 border border-white/20 font-mono-tech text-[11px] text-[#00D9FF] backdrop-blur-sm">
                    {activeIdx + 1} / {filteredPhotos.length}
                  </div>
                </>
              )}
            </div>

            {/* Right Story & Details Panel */}
            <div className="w-full lg:w-96 p-6 sm:p-8 space-y-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0C0F15] overflow-y-auto max-h-[40vh] lg:max-h-none">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 text-[11px] font-mono-tech uppercase tracking-wider font-semibold border"
                    style={{
                      borderColor: `${activePhoto.color}60`,
                      backgroundColor: `${activePhoto.color}15`,
                      color: activePhoto.color,
                    }}
                  >
                    {activePhoto.tag}
                  </span>
                  <span className="font-mono-tech text-xs text-[#94A3B8]">
                    {activePhoto.category}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-extrabold text-white">
                  {activePhoto.title}
                </h3>

                <p className="text-sm text-[#F1F5F9] leading-relaxed">
                  {activePhoto.caption}
                </p>

                <div className="pt-4 border-t border-white/10 space-y-1.5 font-mono-tech text-xs">
                  <p className="text-[#CBD5E1]">
                    <span className="text-[#94A3B8]">Date:</span> {activePhoto.date}
                  </p>
                  {activePhoto.location && (
                    <p className="text-[#38BDF8]">
                      <span className="text-[#94A3B8]">Location:</span> {activePhoto.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation controls & indicators */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono-tech text-xs text-[#94A3B8]">
                  {activeIdx + 1} of {filteredPhotos.length} · Arrow keys
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photo"
                    className="p-2.5 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photo"
                    className="p-2.5 border border-white/20 bg-[#10131A] hover:border-[#00D9FF] hover:text-[#00D9FF] text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
