import { useEffect, useState, useCallback } from 'react';
import { Road } from '@/types/road-observer.type';

function useRoadStream(isPaused: boolean) {
  const [road, setRoad] = useState<Road | null>(null);

  const updateRoad = useCallback(
    (roadData: Road) => {
      if (!isPaused) {
        setRoad(roadData);
      }
    },
    [isPaused]
  );

  const getRoadData = async () => {
    try {
      // 배포할 경우 baseUrl 수정 필요
      const baseUrl = "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/road`, {
        cache: "no-store" // 항상 최신 데이터
      });

      if (!response.ok) {
        throw new Error("API 호출 실패!")
      }

      return await response.json();
    } catch (error) {
      console.error("Road data fetch error: ", error)
    }
  }

  return { road, setRoad };
}

export default useRoadStream;
