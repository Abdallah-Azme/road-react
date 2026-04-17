import { createFileRoute, useNavigate } from '@tanstack/react-router'
import AddWizard from '../../components/AddWizard'

export const Route = createFileRoute('/post-ad/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const handleWizardComplete = () => {
    navigate({ to: '/profile' });
  };

  return (
    <div className="absolute inset-0 block">
      <AddWizard onComplete={handleWizardComplete} />
    </div>
  )
}
