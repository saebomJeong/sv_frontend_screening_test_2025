import { Board } from '@/components/road-observer';

const RoadObserverPage = async () => {
  /**
   * You can use "useRoadStream" hook or modify it as needed to implement this page.
   * const { road } = useRoadStream(isPaused);
   */
  const getRoadData = async () => {
    try {
      // 배포할 경우 baseUrl 수정 필요
      const baseUrl = 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/road?type=json`, {
        cache: 'no-store', // 항상 최신 데이터
      });

      if (!response.ok) {
        throw new Error('API 호출 실패!');
      }

      return await response.json();
    } catch (error) {
      console.error('Road data fetch error: ', error);
      return null;
    }
  };
  const data = await getRoadData();

  return (
    <Board
      vehicles={data.vehicles}
      observer={data.observer}
      width={data.width}
      length={data.length}
    />
  );
};

export default RoadObserverPage;
