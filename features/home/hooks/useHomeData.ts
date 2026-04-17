import { useQuery } from '@tanstack/react-query';
import { homeService } from '@/shared/services/home.service';

export function useHomeData() {
  return useQuery({
    queryKey: ['home-data'],
    queryFn: () => homeService.getHomeData(),
    staleTime: 60 * 1000,
  });
}
