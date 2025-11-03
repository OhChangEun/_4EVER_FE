import { useQuery } from '@tanstack/react-query';
import { KeyValueItem } from '@/app/types/CommonType';

export const useDropdown = (key: string, fetchFn: () => Promise<KeyValueItem[]>) => {
  const { data, isLoading, isError } = useQuery<KeyValueItem[]>({
    queryKey: [key],
    queryFn: fetchFn,
    staleTime: Infinity,
  });

  return { options: data ?? [], isLoading, isError };
};
