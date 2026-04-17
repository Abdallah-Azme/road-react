
import React, { useState, useEffect, useRef } from 'react';
import { Listing } from '../types';
import { SlidersIcon, SunIcon, MoonIcon, ChevronDownIcon, KeyIcon, TagIcon, BedIcon, SpinnerIcon } from './Icons';
import { useNavigate } from '@tanstack/react-router';
import { useHomeListings } from '../features/home/hooks/useHomeListings';

// Fallback images for slider
const FALLBACK_SLIDER_IMAGES = [
  'https://raiyansoft.com/wp-content/uploads/2026/02/1.jpg',
  'https://raiyansoft.com/wp-content/uploads/2026/02/3.jpg'
];

const COUNTRIES = [
  { code: 'KW', name: 'الكويت', flag: '🇰🇼' },
  { code: 'SA', name: 'السعودية', flag: '🇸🇦' },
  { code: 'AE', name: 'الإمارات', flag: '🇦🇪' },
  { code: 'QA', name: 'قطر', flag: '🇶🇦' },
  { code: 'BH', name: 'البحرين', flag: '🇧🇭' },
  { code: 'OM', name: 'عُمان', flag: '🇴🇲' },
  { code: 'SY', name: 'سوريا', flag: '🇸🇾' },
  { code: 'EG', name: 'مصر', flag: '🇪🇬' },
  { code: 'JO', name: 'الأردن', flag: '🇯🇴' },
  { code: 'TR', name: 'تركيا', flag: '🇹🇷' },
];

const QUICK_ACTIONS = [
  { id: 'rent', label: 'إيجار', icon: KeyIcon },
  { id: 'sale', label: 'بيع', icon: TagIcon },
  { id: 'hotels', label: 'فنادق', icon: BedIcon },
];

const BannerSlider: React.FC<{ images?: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  
  const displayImages = images && images.length > 0 ? images : FALLBACK_SLIDER_IMAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % displayImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
        if (diff < 0) {
            setCurrentIndex(prev => (prev + 1) % displayImages.length);
        } else {
            setCurrentIndex(prev => (prev - 1 + displayImages.length) % displayImages.length);
        }
    }
    touchStartX.current = null;
  };

  return (
    <div 
        className="w-full aspect-[2.5/1] relative overflow-hidden rounded-2xl touch-pan-y"
        dir="rtl"
    >
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {displayImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Banner"
            className="w-full h-full object-cover flex-shrink-0 select-none pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
};

const StaticBanner: React.FC<{ image?: string }> = ({ image }) => {
  return (
    <div className="w-full aspect-[2.5/1] relative overflow-hidden rounded-2xl shadow-sm bg-gray-100 dark:bg-slate-800">
      <img
        src={image || "https://raiyansoft.com/wp-content/uploads/2026/02/3.jpg"}
        alt="Static Banner"
        className="w-full h-full object-cover pointer-events-none select-none opacity-90 dark:opacity-80"
      />
    </div>
  );
};

const HomeListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
   const navigate = useNavigate();
   const handleClick = () => {
       navigate({ to: `/ad/${listing.id}` });
   };

   const [imgSrc, setImgSrc] = useState<string>('');
   const FALLBACK_IMAGE = 'https://raiyansoft.com/wp-content/uploads/2026/01/1.png';

   useEffect(() => {
        if (listing.imageUrl instanceof Blob || listing.imageUrl instanceof File) {
             setImgSrc(URL.createObjectURL(listing.imageUrl));
        } else if (typeof listing.imageUrl === 'string') {
             setImgSrc(listing.imageUrl);
        } else if (listing.images && listing.images.length > 0) {
             const first = listing.images[0];
             if (first instanceof Blob || first instanceof File) {
                 setImgSrc(URL.createObjectURL(first));
             } else {
                 setImgSrc(first as string);
             }
        } else {
            setImgSrc(FALLBACK_IMAGE);
        }
   }, [listing]);

   return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-pale/50 dark:border-slate-800 overflow-hidden active:scale-95 transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-square bg-gray-100 dark:bg-slate-800 relative">
        <img
          src={imgSrc}
          alt={listing.title}
          className="w-full h-full object-cover"
          onError={(e) => e.currentTarget.src = FALLBACK_IMAGE}
        />
      </div>
      <div className="p-3 flex flex-col gap-1">
         <span className="text-blue dark:text-blue/80 font-bold text-sm text-right font-sans">{listing.price}</span>
         <h4 className="text-navy dark:text-slate-200 font-semibold text-xs truncate text-right font-sans">{listing.title}</h4>
         <div className="flex items-center justify-end gap-1 opacity-60">
            <span className="text-[13px] text-navy dark:text-slate-400 font-medium font-sans">{listing.area}</span>
             <div className="w-1 h-1 rounded-full bg-navy dark:bg-slate-400"></div>
         </div>
      </div>
    </div>
   );
};

import { useHomeData } from '../features/home/hooks/useHomeData';

const HomePage: React.FC<{ theme: 'light' | 'dark'; onToggleTheme: () => void }> = ({ theme, onToggleTheme }) => {
  const navigate = useNavigate();
  const { data: homeListings = [], isLoading: isListingsLoading } = useHomeListings();
  const { data: homeData, isLoading: isHomeDataLoading } = useHomeData();
  const displayAds = homeListings.slice(0, 6);

  const [searchText, setSearchText] = useState('بيت / بيان');
  const [countryOpen, setCountryOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(COUNTRIES[0]);

  useEffect(() => {
    const prefs = localStorage.getItem('road80_preferences');
    if (prefs) {
        try {
            const p = JSON.parse(prefs);
            if (p.propertyType && p.purpose && p.area) {
                setSearchText(`${p.propertyType} / ${p.purpose} / ${p.area}`);
            }
        } catch (e) {
            console.error("Failed to parse preferences");
        }
    }
  }, []);

  const handleCountrySelect = (c: typeof COUNTRIES[0]) => {
      setCurrentCountry(c);
      setCountryOpen(false);
  };

  return (
    <div className="flex flex-col p-4 gap-6 animate-fade-in pt-2">
      {/* Country Switcher Header with Theme Toggle */}
      <div className="flex items-center justify-between -mb-2">
         <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold mb-0.5">الدولة</span>
            <button 
              onClick={() => setCountryOpen(true)}
              className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-pale dark:border-slate-800 rounded-full pl-3 pr-2 py-1 shadow-sm active:scale-95 transition-all duration-300"
            >
               <span className="text-lg leading-none">{currentCountry.flag}</span>
               <span className="text-sm font-bold text-navy dark:text-slate-200">{currentCountry.name}</span>
               <ChevronDownIcon className="w-3 h-3 text-blue" />
            </button>
         </div>
         
         {/* Theme Toggle Button */}
         <button 
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-full bg-pale/30 dark:bg-slate-800 flex items-center justify-center transition-all duration-300 active:scale-95 text-navy dark:text-slate-200 border border-transparent dark:border-slate-700"
            aria-label="تبديل المظهر"
         >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
            ) : (
                <SunIcon className="w-5 h-5" />
            )}
         </button>
      </div>

      {/* Top Banner (Slider) */}
      <BannerSlider images={homeData?.header?.map(h => h.image) || []} />

      {/* Interactive Search Card */}
      <div 
        onClick={() => navigate({ to: '/quick-start', search: { mode: 'edit' } as any })}
        className="w-full bg-white dark:bg-slate-900 text-navy dark:text-slate-200 rounded-2xl p-4 shadow-lg shadow-navy/5 dark:shadow-black/20 flex items-center justify-between cursor-pointer active:scale-98 transition-all relative overflow-hidden group border border-navy/10 dark:border-slate-800 hover:border-navy/30 dark:hover:border-slate-700"
      >
          <div className="flex flex-col gap-1 z-10">
            <span className="text-[13px] text-gray-400 font-medium group-hover:text-blue transition-colors">عن ماذا تبحث</span>
            <h3 className="text-sm font-semibold text-navy dark:text-slate-200 leading-tight truncate pl-4">
              {searchText || 'اضغط لتحديد طلبك'}
            </h3>
          </div>

          <div className="w-10 h-10 bg-pale/50 dark:bg-slate-800 rounded-xl flex items-center justify-center backdrop-blur-sm border border-pale dark:border-slate-700 z-10 group-hover:bg-navy dark:group-hover:bg-blue group-hover:text-white transition-all">
            <SlidersIcon className="w-5 h-5" />
          </div>
      </div>

      {/* Quick Actions Row */}
      <div className="flex gap-3">
        {(homeData?.categories || []).length > 0 ? (
          homeData!.categories.slice(0, 3).map((action) => (
            <button
              key={action.id}
              onClick={() => navigate({ to: '/explore', search: { category_values_ids: [action.id] } as any })}
              className="flex-1 flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-900 py-5 rounded-2xl shadow-sm border border-pale dark:border-slate-800 active:scale-95 transition-all duration-200 group hover:border-navy/20 dark:hover:border-slate-700"
            >
              <div className="w-12 h-12 rounded-full bg-navy/5 dark:bg-slate-800 flex items-center justify-center group-hover:bg-navy dark:group-hover:bg-blue transition-colors duration-300">
                <img src={action.icon} alt={action.value} className="w-6 h-6 object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-300" />
              </div>
              <span className="text-sm font-medium text-navy dark:text-slate-200 group-hover:text-navy dark:group-hover:text-blue transition-colors">
                {action.value}
              </span>
            </button>
          ))
        ) : (
          QUICK_ACTIONS.map((action) => (
            <button
              key={action.id}
              onClick={() => navigate({ to: '/explore' })} // Demo link
              className="flex-1 flex flex-col items-center justify-center gap-3 bg-white dark:bg-slate-900 py-5 rounded-2xl shadow-sm border border-pale dark:border-slate-800 active:scale-95 transition-all duration-200 group hover:border-navy/20 dark:hover:border-slate-700"
            >
              <div className="w-12 h-12 rounded-full bg-navy/5 dark:bg-slate-800 flex items-center justify-center group-hover:bg-navy dark:group-hover:bg-blue transition-colors duration-300">
                <action.icon className="w-6 h-6 text-navy dark:text-blue group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-sm font-medium text-navy dark:text-slate-200 group-hover:text-navy dark:group-hover:text-blue transition-colors">
                {action.label}
              </span>
            </button>
          ))
        )}
      </div>

      {/* Latest Ads Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-navy dark:text-slate-200">احدث الاعلانات المضافة تناسب طلبك</h2>
        </div>

        {isListingsLoading ? (
            <div className="flex justify-center items-center py-10">
                <SpinnerIcon className="w-8 h-8 text-navy dark:text-blue animate-spin" />
            </div>
        ) : (
            <div className="grid grid-cols-2 gap-3">
                {displayAds.map((ad, index) => (
                    <HomeListingCard key={`${ad.id}-${index}`} listing={ad} />
                ))}
            </div>
        )}

        {!isListingsLoading && displayAds.length > 0 && (
            <button
              onClick={() => navigate({ to: '/explore' })}
              className="w-full py-3 bg-white dark:bg-slate-900 border border-pale dark:border-slate-800 text-navy dark:text-slate-200 rounded-xl font-semibold text-sm hover:bg-pale/30 dark:hover:bg-slate-800 active:scale-95 transition-all shadow-sm"
            >
                مشاهدة المزيد
            </button>
        )}
      </div>

      {/* Bottom Banner (Static) */}
      <StaticBanner image={homeData?.footer?.[0]?.image} />

      {/* Country Selection Modal */}
      {countryOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ zIndex: 100 }}>
            <div className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setCountryOpen(false)} />
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-sm mx-auto sm:rounded-2xl rounded-t-3xl p-6 flex flex-col gap-4 shadow-2xl animate-fade-in max-h-[80vh] overflow-hidden border-t dark:border-slate-800">
                <div className="w-12 h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full mx-auto mb-2 shrink-0" />
                <h3 className="text-lg font-bold text-navy dark:text-slate-200 text-center mb-2 shrink-0">اختر الدولة</h3>
                
                <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar pb-6">
                    {COUNTRIES.map(c => (
                        <button 
                            key={c.code}
                            onClick={() => handleCountrySelect(c)}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                                currentCountry.code === c.code 
                                ? 'border-navy dark:border-blue bg-navy/5 dark:bg-blue/10' 
                                : 'border-pale dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{c.flag}</span>
                                <span className="font-bold text-navy dark:text-slate-200">{c.name}</span>
                            </div>
                            {currentCountry.code === c.code && (
                                <div className="w-2.5 h-2.5 rounded-full bg-navy dark:bg-blue shadow-sm" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
