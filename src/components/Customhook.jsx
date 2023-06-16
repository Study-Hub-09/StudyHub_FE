import { useQuery } from 'react-query';
import { getSearchRoom, getRoom } from '../api/api';

const useSearchData = (page, queryString) => {
  return useQuery(['searchRoom', page, queryString], () =>
    getSearchRoom(page, queryString)
  );
};
const useRoomData = (page) => {
  return useQuery(
    ['rooms', page],
    async () => {
      // 현재 페이지 데이터와 다음 페이지 데이터 불러오기
      const data = await Promise.all([getRoom(page), getRoom(page + 1)]);
      return {
        currentPageData: data[0].data.content,
        nextPageData: data[1].data.content,
      };
    },
    // 이전 페이지 저장
    {
      keepPreviousData: true,
    }
  );
};

export { useSearchData, useRoomData };
