import { createFileRoute, useNavigate } from '@tanstack/react-router'
import AuthPage from '../components/AuthPage'
import { useAppContext } from '../components/AppContext'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { setIsAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate({ to: '/quick-start' });
  };

  return <AuthPage onLoginSuccess={handleLoginSuccess} />;
}
