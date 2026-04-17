import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: () => <div className="p-6 mt-20 text-center font-bold text-navy">عن التطبيق</div>
});
