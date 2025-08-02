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

        // observer
        ctx.fillStyle = "#ffc0cb"
    }
}