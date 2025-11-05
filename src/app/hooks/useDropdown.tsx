import { useQuery } from '@tanstack/react-query';
import { KeyValueItem } from '@/app/types/CommonType';
import { useMemo } from 'react';

export const useDropdown = (
  key: string,
  fetchFn: () => Promise<KeyValueItem[]>,
  includeAll: boolean = true,
) => {
  const { data, isLoading, isError } = useQuery<KeyValueItem[]>({
    queryKey: [key],
    queryFn: fetchFn,
    staleTime: Infinity,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    return includeAll ? data : data.filter((item) => item.key !== 'ALL');
  }, [data, includeAll]);

  return { options: filteredData ?? [], isLoading, isError };
};
