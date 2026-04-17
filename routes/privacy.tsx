import React from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import Header from '../components/Header';
import { usePrivacy } from '../features/pages/hooks/usePages';
import { SpinnerIcon } from '../components/Icons';

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage
});

function PrivacyPage() {
  const navigate = useNavigate();
  const { data, isLoading } = usePrivacy();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-24" dir="rtl">
      <Header title="سياسة الخصوصية" showBack onBack={() => navigate({ to: '..' })} />
      
      <div className="flex-1 p-5 overflow-y-auto" style={{ paddingTop: 'calc(var(--header-h) + env(safe-area-inset-top) + 20px)' }}>
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <SpinnerIcon className="w-8 h-8 animate-spin text-navy" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-pale text-right">
             <h2 className="text-xl font-bold text-navy mb-4">{data?.title || 'سياسة الخصوصية'}</h2>
             <div 
               className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-line Prose" 
               dangerouslySetInnerHTML={{ __html: data?.description || '' }}
             />
          </div>
        )}
      </div>
    </div>
  );
}
