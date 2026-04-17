import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import NotificationsPage from '../components/NotificationsPage';

export const Route = createFileRoute('/notifications')({
  component: NotificationsRoute,
});

function NotificationsRoute() {
  return <NotificationsPage />;
}
