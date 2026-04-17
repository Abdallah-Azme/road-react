import { useQuery } from '@tanstack/react-query';
import { staticPageService } from '../services/page.service';

export function useTerms() {
  return useQuery({
    queryKey: ['pages', 'terms'],
    queryFn: () => staticPageService.getTerms().then(res => res.data),
  });
}

export function usePrivacy() {
  return useQuery({
    queryKey: ['pages', 'privacy'],
    queryFn: () => staticPageService.getPrivacy().then(res => res.data),
  });
}

export function useFaqs() {
  return useQuery({
    queryKey: ['pages', 'faqs'],
    queryFn: () => staticPageService.getFaqs().then(res => res.data),
  });
}
