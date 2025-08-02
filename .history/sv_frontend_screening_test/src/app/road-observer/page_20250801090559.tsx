import useRoadStream from '@/hooks/useRoadStream.hook';

const RoadObserverPage = async () => {
  /**
   * You can use "useRoadStream" hook or modify it as needed to implement this page.
   * const { road } = useRoadStream(isPaused);
   */
  const { getRoadData, road } = useRoadStream(false);
  await getRoadData();
  console.log(road)
  return <div />;
};

export default RoadObserverPage;
