'use client';

import { useBoolean } from '@/hooks/common';
import { Observer, Vehicle } from '@/types/road-observer.type';
import { useEffect, useRef, useState } from 'react';

interface Props {
  vehicles: Vehicle[];
  observer: Observer;
  width: number;
  length: number;
}

const Board = ({ vehicles, observer, width, length }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const { isActive, deactivate, activate } = useBoolean(false);

  // 움직이는 차량 리스트
  const [vehicleList, setVehicleList] = useState<Vehicle[]>(vehicles);
  // 움직이는 관측자
  const [observ, setObserv] = useState<Observer>(observer);

  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;

  const SCALE_X = CANVAS_WIDTH / width;
  const SCALE_Y = CANVAS_HEIGHT / length;

  const getVisibilityStatus = (vehicle: Vehicle) => {
    const dx = vehicle.position.x - observ.position.x;
    const dy = vehicle.position.x - observ.position.y;

    let angle;
    if (observ.direction === -1) {
      angle = Math.atan2(dx, dy) * (180 / Math.PI);
    } else {
      angle = Math.atan2(dx, -dy) * (180 / Math.PI);
    }

    // 각도 범위 정규화
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;

    const halfFov = observ.fov / 2;
    const absAngle = Math.abs(angle);

    // 경계 마진을 5도로 설정
    const margin = 5;

    if (absAngle <= halfFov - margin) {
      return 'inside';
    } else if (absAngle <= halfFov + margin) {
      return 'boundary';
    } else {
      return 'outside';
    }
  };

  const drawRoad = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 배경 초기화
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 중앙선
    const centerX = (width / 2) * SCALE_X;
    ctx.strokeStyle = '#f1c40f';
    ctx.setLineDash([15, 15]);
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, CANVAS_HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    // 도로 경계선
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, CANVAS_HEIGHT);
    ctx.moveTo(CANVAS_WIDTH, 0);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.stroke();

    // 차량 상태별 카운트
    let insideCount = 0,
      boundaryCount = 0,
      outsideCount = 0;

    // 차량 그리기
    vehicleList.forEach((vehicle: Vehicle) => {
      const status = getVisibilityStatus(vehicle);

      let fillColor, strokeColor;
      switch (status) {
        case 'inside':
          fillColor = '#2ecc71';
          strokeColor = '#27ae60';
          insideCount++;
          break;
        case 'boundary':
          fillColor = '#3498db';
          strokeColor = '#2980b9';
          boundaryCount++;
          break;
        default:
          fillColor = '#e74c3c';
          strokeColor = '#c0392b';
          outsideCount++;
      }

      const vehX = vehicle.position.x * SCALE_X;
      const vehY = (length - vehicle.position.y) * SCALE_Y;
      const vehWidth = vehicle.width * SCALE_X;
      const vehHeight = vehicle.length * SCALE_Y;

      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;

      ctx.fillRect(vehX, vehY, vehWidth, vehHeight);
      ctx.strokeRect(vehX, vehY, vehWidth, vehHeight);

      ctx.fillStyle = 'white';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      const vehArrow = vehicle.direction === 1 ? '↓' : '↑';
      ctx.fillText(vehArrow, vehX + vehWidth / 2, vehY + vehHeight / 2 + 3);
    });

    // observer
    ctx.fillStyle = '#ffc0cb';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    const obsX = observ.position.x * SCALE_X;
    const obsY = (length - observ.position.y) * SCALE_Y;
    const obsWidth = observ.width * SCALE_X;
    const obsHeight = observ.length * SCALE_Y;
    ctx.fillRect(obsX, obsY, obsWidth, obsHeight);
    ctx.strokeRect(obsX, obsY, obsWidth, obsHeight);

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    const arrow = observ.direction === -1 ? '↑' : '↓';
    ctx.fillText(arrow, obsX + obsWidth / 2, obsY + obsHeight / 2 + 6);
    };
    
    const animate = () => {
        if (!isActive) return;

        setVehicleList(
            (prev) => prev.map(
                (vehicle) => ({
                    ...vehicle,
                    position: {
                        x: vehicle.position.x,
                        y: vehicle.position.y + vehicle.direction * vehicle.speed
                    }
                })
            )
        )

        setObserv((prev) => ({
            ...prev,
            position: {
                x: prev.position.x,
                y: prev.position.y + prev.direction * prev.speed
            }
        }))

        drawRoad();

        animationRef.current = setTimeout(() => {
            animate();
        }, 1000)
    }

    const stopAnimation = () => {
        deactivate();
        if (animationRef.current) {
            clearTimeout(animationRef.current);
        }
    }

    useEffect(() => {
        drawRoad();
    }, [])

    useEffect(() => {
        if (isActive) {
            animate();
        }

        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current)
            }
        }
    }, [isActive])

    return 
};
