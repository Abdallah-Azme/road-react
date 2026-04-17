
import React, { useState, useEffect } from 'react';
import { VerifiedIcon, StarIcon, ChevronRightIcon, BuildingIcon, ConstructionIcon, ContractingIcon, DecorIcon, MaterialsIcon, SpinnerIcon } from './Icons';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useOffices, useDepartments } from '../features/companies/hooks/useOffices';
import { CompanyDepartment } from '../features/companies/types';

const OfficesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Sync internal state with URL params
    const searchParams = new URLSearchParams(window.location.search);
    setSelectedCategory(searchParams.get('category'));
  }, [location.search]);

  const { data: offices = [], isLoading } = useOffices(selectedCategory);
  const { data: departments = [], isLoading: isLoadingDepartments } = useDepartments();
  const displayOffices = offices;

  const handleCategoryClick = (categoryId: number | string) => {
    navigate({ to: '/companies', search: { category: categoryId.toString() } as any });
  };

  const handleCompanyClick = (companyId: string) => {
    navigate({ to: '/profile', search: { user: companyId } as any });
  };

  // Render Companies Grid View (Filtered)
  return (
    <div className="w-full min-h-full bg-bg dark:bg-slate-950 p-4 pb-24 flex flex-col gap-4 animate-fade-in transition-colors duration-300">
      
      {/* Department Filter Chips */}
      {!isLoadingDepartments && departments.length > 0 && (
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-4 px-4 sm:px-0 sm:mx-0">
          <button
            onClick={() => navigate({ to: '/companies' })}
            className={`shrink-0 px-5 py-2 rounded-full font-bold text-sm transition-all border ${
              !selectedCategory 
              ? 'bg-navy dark:bg-blue text-white border-navy dark:border-blue shadow-md' 
              : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-pale dark:border-slate-800'
            }`}
          >
            الكل
          </button>
          {departments.map((dept: CompanyDepartment) => (
            <button
              key={dept.id}
              onClick={() => handleCategoryClick(dept.id)}
              className={`shrink-0 px-5 py-2 rounded-full font-bold text-sm transition-all border ${
                selectedCategory === String(dept.id)
                ? 'bg-navy dark:bg-blue text-white border-navy dark:border-blue shadow-md' 
                : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border-pale dark:border-slate-800'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-10 mt-10">
            <SpinnerIcon className="w-8 h-8 text-navy dark:text-blue animate-spin" />
        </div>
      ) : displayOffices.length === 0 ? (
        <div className="flex justify-center items-center py-10 mt-10">
           <span className="text-gray-400 dark:text-slate-500 font-bold">لا توجد مكاتب في هذا القسم</span>
        </div>
      ) : (        <div className="grid grid-cols-2 gap-4">
          {displayOffices.map((office: any) => (
            <div 
              key={office.id}
              onClick={() => handleCompanyClick(String(office.id))}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-pale dark:border-slate-800 shadow-sm overflow-hidden flex flex-col active:scale-98 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-28 bg-gray-50 dark:bg-slate-800 flex items-center justify-center p-4">
                <div className="w-[68px] h-[68px] rounded-full border-4 border-white dark:border-slate-700 shadow-md overflow-hidden bg-white dark:bg-slate-900 z-10">
                  <img 
                    src={office.logo} 
                    alt={office.officeName} 
                    className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = 'https://raiyansoft.com/wp-content/uploads/2026/01/1.png'}
                  />
                </div>
                {office.verified && (
                  <div className="absolute top-3 left-3 text-blue drop-shadow-sm" title="مكتب موثق">
                     <VerifiedIcon className="w-6 h-6" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-2.5 py-1 rounded-xl shadow-sm border border-pale/50 dark:border-slate-700">
                  <span className="text-[14px] font-semibold text-navy dark:text-slate-200 leading-none mt-0.5">{office.rating}</span>
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              
              <div className="p-4 flex flex-col items-center text-center flex-1">
                {/* Title with min-height for alignment */}
                <div className="min-h-[3rem] flex items-center justify-center w-full mb-0.5">
                   <h3 className="text-[18px] sm:text-[20px] font-bold text-navy dark:text-slate-200 leading-[1.35] line-clamp-2">
                      {office.officeName}
                   </h3>
                </div>

                {/* Location */}
                <span className="text-[14px] sm:text-[15px] font-medium text-gray-500 dark:text-slate-400 mb-2.5 max-w-full truncate px-1">
                   {office.governorate}
                </span>

                <div className="w-full mt-auto">
                  <div className="flex justify-between items-center bg-gray-50 dark:bg-slate-800/50 rounded-xl px-3 py-2.5 mb-1.5 border border-pale/30 dark:border-slate-700/50">
                     <span className="text-[13px] sm:text-[14px] font-medium text-gray-600 dark:text-slate-400">إعلانات نشطة</span>
                     <span className="text-[16px] sm:text-[18px] font-bold text-blue dark:text-blue">{office.activeListingsCount}</span>
                  </div>
                  <button className="w-full h-[46px] rounded-xl bg-navy/5 dark:bg-slate-800 text-navy dark:text-slate-200 text-[15px] sm:text-[16px] font-semibold hover:bg-navy/10 dark:hover:bg-slate-700 transition-colors flex items-center justify-center">
                    عرض الملف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfficesPage;
