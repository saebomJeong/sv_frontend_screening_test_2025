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

  useEffect(() => {
    let eventSource: EventSource;

    

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [updateRoad]);

  return { road, setRoad };
}

export default useRoadStream;
