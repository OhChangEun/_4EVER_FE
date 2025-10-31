import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchDepartmentsDropdown } from '@/app/(private)/hrm/api/hrm.api';
import { DepartmentsDropdown } from '@/app/(private)/hrm/types/HrmDropdownApiType';

export const useDepartmentsDropdown = (includeAll = true) => {
  const { data, isLoading, isError } = useQuery<DepartmentsDropdown[]>({
    queryKey: ['departmentsDropdown'],
    queryFn: fetchDepartmentsDropdown,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    const list = data ?? [];
    const mapped = list.map((d) => ({
      key: d.departmentId,
      value: d.departmentName + '팀',
    }));

    if (includeAll) {
      return [{ key: '', value: '전체 부서' }, ...mapped];
    }

    return mapped;
  }, [data, includeAll]);

  return { options, isLoading, isError };
};
