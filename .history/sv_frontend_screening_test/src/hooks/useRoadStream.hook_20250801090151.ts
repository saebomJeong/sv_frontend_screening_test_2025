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

  const getRoadData

  return { road, setRoad };
}

export default useRoadStream;
