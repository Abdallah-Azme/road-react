import { createFileRoute } from '@tanstack/react-router'
import ListingDetailsPage from '../../components/ListingDetailsPage'

export const Route = createFileRoute('/ad/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams();

  const handleBackFromDetails = () => {
    window.history.back();
  };

  return (
    <ListingDetailsPage 
      listingId={parseInt(id, 10)}
      onBack={handleBackFromDetails} 
    />
  )
}
