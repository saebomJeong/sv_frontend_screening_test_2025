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

  const connectSSE = async () => {
    let eventSource: EventSource;
    eventSource = new EventSource('/api/road');
    eventSource.onmessage = async (event) => {
      const roadData = JSON.parse(event.data);
      console.log(roadData);
      await updateRoad(roadData);
    };

    eventSource.onerror = async (error) => {
      console.error('SSE Error:', error);
      eventSource.close();

      await new Promise
      setTimeout(connectSSE, 2000);
    };
  };

  useEffect(() => {
    

    

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
