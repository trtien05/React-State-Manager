import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "./key";
import { calculatePageCount } from "../helper";
export interface IUser {
  id: number;
  name: string;
  email: string;
}
export const PAGE_SIZE = 2;

export const useFetchUser = (currentPage: number) => {
  const queryInfor = useQuery({
    queryKey: QUERY_KEY.getUserPaginate(currentPage),
    queryFn: async (): Promise<any> =>
      fetch(
        `http://localhost:8000/users?_page=${currentPage}&_limit=${PAGE_SIZE}`
      ).then(async (res) => {
        const total_items = +(res.headers.get("X-Total-Count") ?? 0);
        const totalPages = calculatePageCount(PAGE_SIZE, total_items);
        const d = await res.json();
        return {
          total_items,
          totalPages,
          users: d,
        };
      }),
  });
  return {
    ...queryInfor,
    data: queryInfor?.data?.users ?? [],
    count: queryInfor?.data?.total_items ?? 0,
    totalPages: queryInfor?.data?.totalPages ?? 0,
  };
};

export const useFetchUserDetail = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEY.getUserDetail(id),
    queryFn: (): Promise<IUser> =>
      fetch(`http://localhost:8000/users/${id}`).then((res) => res.json()),
  });
};
