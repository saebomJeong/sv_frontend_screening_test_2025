'use client';
import { Ball } from '@/components/bouncing-ball';

const BouncingBallPage = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="relative w-[40px] h-full">
        <Ball />
      </div>
    </div>
  );
};

export default BouncingBallPage;
