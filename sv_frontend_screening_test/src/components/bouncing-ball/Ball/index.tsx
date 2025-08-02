'use client';

import { Direction } from '@/types/road-observer.type';
import { useEffect, useRef, useState } from 'react';

const Ball = () => {
  const [bottom, setBottom] = useState<number>(100);
  const [maxH, setMaxH] = useState<number>(100);

  // 움직이기 시작하고 돌아가는 타이머
  const moveTimer = useRef<NodeJS.Timeout | null>(null);

  // 스페이스바를 연달아 몇번 눌렀는지
  const spaceClickCount = useRef<number>(0);

  // 스페이스바 클릭 사이 시간 간격
  const spaceClickTimer = useRef<NodeJS.Timeout | null>(null);

  // 방향
  const directionRef = useRef<Direction>(-1);

  const handleStart = () => {
    directionRef.current = -1;
    setBottom(100);

    moveTimer.current = setInterval(() => {
      setBottom((prev) => {
        // 속도가 일정하다고 가정한다.
        const newBottom = prev + directionRef.current * 5;
        console.log(newBottom);

        if (newBottom < 0.5) {
          directionRef.current = 1;
          return 0;
        }

        // 이전 최고 높이의 60%까지만 튀어 오른다
        if (newBottom > maxH * 0.6 && directionRef.current === 1) {
          setMaxH((prev) => prev * 0.6);
          directionRef.current = -1;
          return maxH * 0.6;
        }

        return newBottom;
      });
    }, 1000);
  };

  const handleStop = () => {
    if (moveTimer.current) {
      clearInterval(moveTimer.current);
      moveTimer.current = null;
    }
    setBottom(100);
    setMaxH(100);
    directionRef.current = -1;
  };

  useEffect(() => {
    document.body.focus();
    document.body.click();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        spaceClickCount.current += 1;

        if (spaceClickTimer.current) {
          clearTimeout(spaceClickTimer.current);
        }

        spaceClickTimer.current = setTimeout(() => {
          if (spaceClickCount.current === 2) {
            handleStart();
          } else if (spaceClickCount.current === 3) {
            handleStop();
          }

          spaceClickCount.current = 0;
        }, 500);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (spaceClickTimer.current) clearTimeout(spaceClickTimer.current);
      if (moveTimer.current) clearInterval(moveTimer.current);
    };
  }, []);

  return (
    <div
      className="rounded-full bg-black absolute translate-y-[40px] w-10 h-10 left-0"
      style={{
        bottom: `${bottom}%`,
      }}
    />
  );
};

export default Ball;
