import { createFileRoute } from '@tanstack/react-router'
import QuickWizard from '../components/QuickWizard'
import { useNavigate } from '@tanstack/react-router'

type QuickStartSearch = {
  mode?: string;
};

export const Route = createFileRoute('/quick-start')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): QuickStartSearch => {
    return {
      mode: search.mode as string | undefined,
    };
  },
})

function RouteComponent() {
  const navigate = useNavigate();

  const handleQuickWizardComplete = () => {
    navigate({ to: '/home' });
  };

  return <QuickWizard onComplete={handleQuickWizardComplete} />;
}
