import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: () => <div className="p-6 mt-20 text-center font-bold text-navy">اتصل بنا</div>
});
