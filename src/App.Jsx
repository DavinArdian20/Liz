import { useState, useEffect, useRef } from 'react';
import { X, Heart, Music, Play, Pause, SkipForward, SkipBack, Volume2, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';


const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${8 + Math.random() * 10}s`,
  size: `${6 + Math.random() * 10}px`,
  opacity: 0.15 + Math.random() * 0.25,
}));

const PHOTOS = [
  { id: 1, category: 'Album Concept', title: 'REVIVE+', color: '#F2C4CE', accent: '#E8A4B8', desc: 'Dreamy pastel concept from REVIVE+ IVE album', imgSrc: '/Liz/img/Albumconsept.jpg' },
  { id: 2, category: 'On-Stage', title: 'Bang Bang Performance', color: '#C9B8E8', accent: '#B09DD4', desc: 'Charismatic stage presence at Inkigayo', imgSrc: '/Liz/img/Bangbang.jpg' },
  { id: 3, category: 'Airport Fashion', title: 'Fan Concert', color: '#B8D4E8', accent: '#94BDD4', desc: "Show What I'AM", imgSrc: '/Liz/img/LizOnstage.jpg' },
  { id: 4, category: 'Album Concept', title: 'After Like', color: '#F9D5E5', accent: '#F0B8CC', desc: 'Iconic concept photos from After Like era' },
  { id: 5, category: 'On-Stage', title: 'Starlight Concert', color: '#E8C9B8', accent: '#D4B094', desc: 'Solo spotlight moment at IVE 1st Concert' },
  { id: 6, category: 'Airport Fashion', title: 'Paris Fashion Week', color: '#C8E8C9', accent: '#A4D4A8', desc: 'Chic looks at Paris FW 2024' },
  { id: 7, category: 'Album Concept', title: 'Heya Era', color: '#D5E5F9', accent: '#B8CCF0', desc: 'Bold and vibrant Heya concept photos' },
  { id: 8, category: 'On-Stage', title: 'MAMA Awards', color: '#E8E8C9', accent: '#D4D494', desc: 'Stunning performance at MAMA 2023' },
  { id: 9, category: 'Album Concept', title: 'Love Dive', color: '#F9E5D5', accent: '#F0CCB8', desc: 'Elegant Love Dive concept shooting' },
];

const CATEGORIES = ['Semua', 'Album Concept', 'On-Stage', 'Airport Fashion'];

const SONGS = [
  { title: 'Kitsch', duration: '3:12' },
  { title: 'After Like', duration: '3:01' },
  { title: 'Love Dive', duration: '3:08' },
  { title: 'Heya', duration: '3:03' },
  { title: 'I AM', duration: '3:16' },
];

// ── Placeholder photo card ───────────────────────────────────────────────────
// ── Photo card dengan Render Gambar Asli ───────────────────────────────────────
function PhotoCard({ photo, onClick }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: `linear-gradient(135deg, ${photo.color} 0%, ${photo.accent} 100%)`,
        boxShadow: hovered
          ? "0 20px 60px rgba(61,26,46,0.18)"
          : "0 4px 20px rgba(61,26,46,0.08)",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(photo)}
    >
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10 z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 1px, transparent 1px),
                            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }} />

      {/* RENDER FOTO ASLI LIZ */}
      <div className="relative flex flex-col items-center justify-center" style={{ height: "220px", overflow: "hidden" }}>
        {photo.imgSrc ? (
          <img 
            src={photo.imgSrc} 
            alt={photo.title} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 120 160" width="90" height="120" style={{ opacity: 0.18 }}>
              <ellipse cx="60" cy="45" rx="28" ry="32" fill="#3D1A2E" />
              <path d="M10 160 Q10 100 60 95 Q110 100 110 160 Z" fill="#3D1A2E" />
            </svg>
          </div>
        )}
        {/* Sparkle accent */}
        <div className="absolute top-4 right-4 z-20">
          <Star size={14} style={{ color: "rgba(255,255,255,0.6)", fill: "rgba(255,255,255,0.3)" }} />
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <Sparkles size={12} style={{ color: "rgba(255,255,255,0.5)" }} />
        </div>
      </div>

      {/* Info overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 z-20"
        style={{
          background: "linear-gradient(to top, rgba(61,26,46,0.7) 0%, transparent 100%)",
          transform: hovered ? "translateY(0)" : "translateY(40px)",
          opacity: hovered ? 1 : 0,
          transition: "all 0.3s ease",
        }}
      >
        <p className="text-white font-semibold text-sm leading-tight">{photo.title}</p>
        <p className="text-pink-100 text-xs mt-0.5 opacity-80">{photo.desc}</p>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3 z-20">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(8px)",
            color: "#3D1A2E",
            fontSize: "10px",
            letterSpacing: "0.03em",
          }}
        >
          {photo.category}
        </span>
      </div>

      {/* Like button */}
      <button
        className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-20"
        style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)" }}
        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
      >
        <Heart
          size={14}
          style={{
            color: liked ? "#E05080" : "#3D1A2E",
            fill: liked ? "#E05080" : "transparent",
            transition: "all 0.2s",
          }}
        />
      </button>
    </div>
  );
}

// ── Lightbox dengan Render Gambar Asli ─────────────────────────────────────────
function Lightbox({ photo, photos, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{
        background: 'rgba(61,26,46,0.45)',
        backdropFilter: 'blur(16px)',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl scale-95"
        style={{
          background: `linear-gradient(135deg, ${photo.color} 0%, ${photo.accent} 100%)`,
          animation: 'scaleIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          boxShadow: '0 40px 100px rgba(61,26,46,0.35), 0 0 0 1px rgba(255,255,255,0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background lines */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)`,
            backgroundSize: '30px 30px',
          }} />

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-[#3D1A2E] hover:scale-105 active:scale-95 transition-all z-30"
          style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* FOTO BESAR DI LIGHTBOX */}
        <div className="flex items-center justify-center relative" style={{ height: '360px', overflow: 'hidden' }}>
          {photo.imgSrc ? (
            <img 
              src={photo.imgSrc} 
              alt={photo.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <svg viewBox="0 0 120 160" width="130" height="175" style={{ opacity: 0.22 }}>
              <ellipse cx="60" cy="45" rx="28" ry="32" fill="#3D1A2E" />
              <path d="M10 160 Q10 100 60 95 Q110 100 110 160 Z" fill="#3D1A2E" />
            </svg>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-4 flex items-center z-20">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#3D1A2E] hover:scale-105 active:scale-95 transition-all"
            style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onPrev}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center z-20">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#3D1A2E] hover:scale-105 active:scale-95 transition-all"
            style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={onNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Photo Detail Info Panel */}
        <div className="relative p-6 sm:p-8 z-20" style={{ background: 'rgba(255,255,255,0.35)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full"
              style={{ background: '#3D1A2E', color: '#FFF' }}
            >
              {photo.category}
            </span>
            <span className="text-xs text-[#6B3A58] opacity-70 font-medium">
              Photo {photos.findIndex(p => p.id === photo.id) + 1} of {photos.length}
            </span>
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(20px, 4vw, 28px)',
              color: '#3D1A2E',
              fontWeight: 600,
              lineHeight: 1.2,
              marginBottom: '6px'
            }}
          >
            {photo.title}
          </h3>
          <p className="text-sm text-[#522542] leading-relaxed opacity-90">{photo.desc}</p>
        </div>
      </div>
    </div>
  );
}
// ── Music Player ─────────────────────────────────────────────────────────────
function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [songIdx, setSongIdx] = useState(0);
  const [progress, setProgress] = useState(22);
  const [expanded, setExpanded] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 0.4));
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing, songIdx]);

  const next = () => {
    setSongIdx((i) => (i + 1) % SONGS.length);
    setProgress(0);
  };
  const prev = () => {
    setSongIdx((i) => (i - 1 + SONGS.length) % SONGS.length);
    setProgress(0);
  };

  const song = SONGS[songIdx];

  return (
    <div
      className="fixed bottom-5 right-5 z-40 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,245,248,0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(232,164,192,0.35)',
        boxShadow: '0 12px 40px rgba(61,26,46,0.2)',
        width: expanded ? '280px' : 'auto',
        transition: 'all 0.3s cubic-bezier(0.23,1,0.32,1)',
      }}
    >
      {expanded ? (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F9D5E5, #C9B8E8)' }}>
                <Music size={14} style={{ color: '#3D1A2E' }} />
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#9E6B80', letterSpacing: '0.08em' }}>NOW PLAYING</p>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#3D1A2E', lineHeight: 1.2 }}>{song.title}</p>
                <p style={{ fontSize: '11px', color: '#9E6B80' }}>IVE</p>
              </div>
            </div>
            <button onClick={() => setExpanded(false)} style={{ color: '#9E6B80' }}>
              <X size={15} />
            </button>
          </div>

          {/* Progress */}
          <div className="rounded-full h-1.5 mb-3 overflow-hidden" style={{ background: 'rgba(61,26,46,0.1)' }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #E8A4C0, #C9B8E8)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} style={{ color: '#9E6B80' }}>
              <SkipBack size={16} />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8A4C0, #C9B8E8)' }} onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={15} color="white" /> : <Play size={15} color="white" />}
            </button>
            <button onClick={next} style={{ color: '#9E6B80' }}>
              <SkipForward size={16} />
            </button>
          </div>

          {/* Song list */}
          <div className="mt-3 space-y-1">
            {SONGS.map((s, i) => (
              <button
                key={i}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg"
                style={{
                  background: i === songIdx ? 'rgba(232,164,192,0.25)' : 'transparent',
                  transition: 'background 0.2s',
                }}
                onClick={() => {
                  setSongIdx(i);
                  setProgress(0);
                  setPlaying(true);
                }}
              >
                <span style={{ fontSize: '12px', color: i === songIdx ? '#3D1A2E' : '#9E6B80', fontWeight: i === songIdx ? 600 : 400 }}>{s.title}</span>
                <span style={{ fontSize: '11px', color: '#C4A0B8' }}>{s.duration}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button className="flex items-center gap-2.5 px-4 py-3" onClick={() => setExpanded(true)}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #F9D5E5, #C9B8E8)',
              animation: playing ? 'spin 3s linear infinite' : 'none',
            }}
          >
            <Music size={14} style={{ color: '#3D1A2E' }} />
          </div>
          <div className="text-left">
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#3D1A2E' }}>{song.title}</p>
            <p style={{ fontSize: '10px', color: '#9E6B80' }}>{playing ? '▶ Playing' : 'IVE'}</p>
          </div>
          <Volume2 size={14} style={{ color: '#C4A0B8', marginLeft: '4px' }} />
        </button>
      )}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const filtered = activeFilter === 'Semua' ? PHOTOS : PHOTOS.filter((p) => p.category === activeFilter);

  const lightboxPhotos = filtered.length > 0 ? filtered : PHOTOS;
  const openIdx = lightboxPhoto ? lightboxPhotos.findIndex((p) => p.id === lightboxPhoto.id) : -1;

  const openLightbox = (photo) => setLightboxPhoto(photo);
  const closeLightbox = () => setLightboxPhoto(null);
  const prevPhoto = () => setLightboxPhoto(lightboxPhotos[(openIdx - 1 + lightboxPhotos.length) % lightboxPhotos.length]);
  const nextPhoto = () => setLightboxPhoto(lightboxPhotos[(openIdx + 1) % lightboxPhotos.length]);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: '#FFF5F8',
        minHeight: '100vh',
        color: '#3D1A2E',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes float-petal {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.7s ease forwards; }
        .fade-up-delay { animation: fade-up 0.7s 0.2s ease both; }
        .fade-up-delay-2 { animation: fade-up 0.7s 0.4s ease both; }
        .petal {
          position: fixed; pointer-events: none; z-index: 0;
          border-radius: 50% 0 50% 0;
          animation: float-petal var(--dur) var(--delay) infinite linear;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #FFF5F8; }
        ::-webkit-scrollbar-thumb { background: #E8A4C0; border-radius: 4px; }
      `}</style>

      {/* Floating petals */}
      {PETALS.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            background: 'linear-gradient(135deg, #F9D5E5, #C9B8E8)',
            '--op': p.opacity,
            '--dur': p.duration,
            '--delay': p.delay,
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ── Nav ── */}
        <nav
          className="flex items-center justify-between px-6 py-4"
          style={{
            borderBottom: '1px solid rgba(232,164,192,0.2)',
            background: 'rgba(255,245,248,0.8)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full" style={{ background: 'linear-gradient(135deg, #E8A4C0, #C9B8E8)' }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 700, letterSpacing: '0.05em' }}>LIZ</span>
            <span style={{ fontSize: '11px', color: '#C4A0B8', letterSpacing: '0.15em', marginLeft: '2px' }}>IVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-6" style={{ fontSize: '13px', color: '#9E6B80' }}>
            <a href="#hero" className="hover:text-pink-400 transition-colors">
              Profile
            </a>
            <a href="#gallery" className="hover:text-pink-400 transition-colors">
              Gallery
            </a>
          </div>
          <div className="flex items-center gap-1" style={{ fontSize: '12px', color: '#C4A0B8', letterSpacing: '0.08em' }}>
            <Star size={11} style={{ fill: '#E8A4C0', color: '#E8A4C0' }} />
            <span>STARLIGHT</span>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section id="hero" className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 sm:px-12 lg:px-24 py-16 lg:py-24" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Photo side */}
          <div className="fade-up flex-shrink-0 relative">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                width: 'min(340px, 80vw)',
                height: 'min(440px, 104vw)',
                background: 'linear-gradient(145deg, #F9D5E5 0%, #C9B8E8 60%, #B8D4E8 100%)',
                boxShadow: '0 30px 80px rgba(61,26,46,0.18), 0 0 0 1px rgba(232,164,192,0.3)',
              }}
            >
              {/* Decorative circles */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.9) 1.5px, transparent 1.5px),
                                    radial-gradient(circle at 75% 75%, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />
              {/* Large silhouette */}
              <img src="/Liz/img/Liz2.jpg" alt="Liz Profile" className="absolute inset-0 w-full h-full object-cover" />
              {/* Sparkle accents */}
              <img src="/Liz/img/Liz2.jpg" alt="Liz Profile" className="absolute inset-0 w-full h-full object-cover z-0" />
              <div className="absolute bottom-8 left-6">
                <Star size={16} style={{ color: 'rgba(61,26,46,0.18)', fill: 'rgba(61,26,46,0.1)' }} />
              </div>

              {/* IVE badge */}
              <div
                className="absolute bottom-5 right-5 px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#3D1A2E',
                  letterSpacing: '0.1em',
                }}
              >
                IVE ✦ Member
              </div>
            </div>

            {/* Floating stat pill */}
            <div
              className="absolute -bottom-4 -left-4 px-4 py-2 rounded-2xl"
              style={{
                background: 'rgba(255,245,248,0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(232,164,192,0.4)',
                boxShadow: '0 8px 24px rgba(61,26,46,0.1)',
              }}
            >
              <p style={{ fontSize: '10px', color: '#C4A0B8', letterSpacing: '0.1em' }}>FANS WORLDWIDE</p>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#3D1A2E' }}>4.2M+</p>
            </div>
          </div>

          {/* Bio side */}
          <div className="fade-up-delay flex-1 text-center lg:text-left">
            <p style={{ fontSize: '12px', color: '#C4A0B8', letterSpacing: '0.2em', marginBottom: '8px' }}>✦ &nbsp;VISUAL &amp; VOCALIST&nbsp; ✦</p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(52px, 8vw, 88px)',
                fontWeight: 700,
                lineHeight: 0.95,
                color: '#3D1A2E',
                marginBottom: '6px',
              }}
            >
              Liz
            </h1>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(18px, 3vw, 24px)',
                color: '#C4A0B8',
                fontStyle: 'italic',
                marginBottom: '20px',
                letterSpacing: '0.1em',
              }}
            >
              리즈 · Liz
            </p>

            <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#6B3A58', maxWidth: '420px', margin: '0 auto 24px' }}>
              Kim Jiwon, dikenal sebagai <strong>Liz</strong>, adalah anggota grup K-Pop IVE dari Starship Entertainment. Ia dikenal sebagai visual utama grup yang memukau dengan keindahan dan bakat vokalnya yang luar biasa.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mb-8">
              {[
                { label: 'Tanggal Lahir', value: '21 Nov 2004' },
                { label: 'Asal', value: 'Jeju, Korea' },
                { label: 'Grup', value: 'IVE (2021–Now)' },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ fontSize: '10px', color: '#C4A0B8', letterSpacing: '0.12em', marginBottom: '2px' }}>{s.label.toUpperCase()}</p>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#3D1A2E' }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {['#Visual', '#Vocalist', '#IVE', '#Starship', '#Kitsch', '#AfterLike'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs"
                  style={{
                    background: 'rgba(232,164,192,0.2)',
                    border: '1px solid rgba(232,164,192,0.4)',
                    color: '#9E6B80',
                    letterSpacing: '0.03em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="px-6 sm:px-12 lg:px-24" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(232,164,192,0.5), transparent)' }} />
        </div>

        {/* ── Gallery ── */}
        <section id="gallery" className="px-6 sm:px-12 lg:px-24 py-16" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="fade-up-delay-2 text-center mb-10">
            <p style={{ fontSize: '11px', color: '#C4A0B8', letterSpacing: '0.2em', marginBottom: '8px' }}>✦ KOLEKSI FOTO ✦</p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: '#3D1A2E',
              }}
            >
              Photo Gallery
            </h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeFilter === cat ? 'linear-gradient(135deg, #E8A4C0, #C9B8E8)' : 'rgba(255,245,248,0.8)',
                  color: activeFilter === cat ? 'white' : '#9E6B80',
                  border: activeFilter === cat ? 'none' : '1px solid rgba(232,164,192,0.4)',
                  boxShadow: activeFilter === cat ? '0 4px 16px rgba(232,164,192,0.4)' : 'none',
                  transform: activeFilter === cat ? 'translateY(-1px)' : 'none',
                  letterSpacing: '0.02em',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            className="grid gap-5"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
            }}
          >
            {filtered.map((photo, i) => (
              <div key={photo.id} style={{ animationDelay: `${i * 0.05}s` }}>
                <PhotoCard photo={photo} onClick={openLightbox} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ── */}
        <footer
          className="text-center py-10 mt-8"
          style={{
            borderTop: '1px solid rgba(232,164,192,0.2)',
            background: 'rgba(255,245,248,0.6)',
          }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#E8A4C0', marginBottom: '6px' }}>✦ Liz — IVE ✦</p>
          <p style={{ fontSize: '11px', color: '#C4A0B8', letterSpacing: '0.12em' }}>FAN GALLERY · UNOFFICIAL · MADE WITH LOVE</p>
        </footer>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && <Lightbox photo={lightboxPhoto} photos={lightboxPhotos} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />}

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}
