"use client"

import { useBoolean } from "@/hooks/common";
import { Observer, Vehicle } from "@/types/road-observer.type";
import { useRef, useState } from "react";

interface Props {
    vehicles: Vehicle[];
    observer: Observer;
    width: number;
    length: number;
}

const Board = ({ vehicles, observer, width, length }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef(null);
    const { isActive, deactivate, activate } = useBoolean(false);
    
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;

    const SCALE_X = CANVAS_WIDTH / width;
    const SCALE_Y = CANVAS_HEIGHT / length;

    const getVisibilityStatus = (vehicle: Vehicle, observer: Observer) => {
        const dx = vehicle.position.x - observer.position.x;
        const dy = vehicle.position.x - observer.position.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        let angle;
        if (observer.direction === -1) {
            angle = Math.atan2(dx, dy) * (180 / Math.PI);
        } else {
            angle = Math.atan2(dx, -dy) * (180 / Math.PI);
        }

        // 각도 범위 정규화
        if (angle > 180) angle -= 360
        if (angle < -180) angle += 360

        const halfFov = observer.fov / 2;
        const absAngle = Math.abs(angle);

        // 경계 마진을 5도로 설정
        const margin = 5;

        if (absAngle <= halfFov - margin) {
            return 'inside';
        } else if (absAngle <= halfFov + margin) {
            return "boundary"
        } else {
            return 'outside'
        }
    }

    const drawRoad = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // 배경 초기화
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // 중앙선
        const centerX = (width / 2) * SCALE_X;
        ctx.strokeStyle = "#f1c40f";
        ctx.setLineDash([15, 15]);
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, CANVAS_HEIGHT);
        ctx.stroke();
        ctx.setLineDash([]);

        // 도로 경계선
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, CANVAS_HEIGHT);
        ctx.moveTo(CANVAS_WIDTH, 0);
        ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.stroke();

        // 차량 상태별 카운트
        let insideCount = 0, boundaryCount = 0, outsideCount = 0;

        // 차량 그리기
        vehicles.forEach((vehicle: Vehicle, index: number) => {
            const status = getVisibilityStatus(vehicle, observer);

            let fillColor, strokeColor;
            switch (status) {
                case 'inside':
                    fillColor = "#2ecc71";
                    strokeColor = '#27ae60';
                    insideCount++;
                    break;
                case 'boundary':
                    fillColor = "#3498db";
                    strokeColor = "#2980b9";
                    boundaryCount++;
                    break;
                default:
                    fillColor = "#e74c3c";
                    strokeColor = "#c0392b";
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
            ctx.strokeRect(vehX, vehY, vehWidth, vehHeight)
        })

        // observer
        ctx.fillStyle = "#ffc0cb";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        const obsX = observer.position.x * SCALE_X;
        const obsY = (length - observer.position.y) * SCALE_Y;
        const obsWidth = observer.width * SCALE_X;
        const obsHeight = observer.length * SCALE_Y;
        ctx.fillRect(obsX, obsY, obsWidth, obsHeight);
        ctx.strokeRect(obsX, obsY, obsWidth, obsHeight);

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        const arrow = observer.direction === -1 ? '↑' : "↓";
        ctx.fillText(arrow, obsX + obsWidth / 2, obsY + obsHeight / 2 + 6);
    }
}