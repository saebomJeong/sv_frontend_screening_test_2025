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
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const { isActive, deactivate, activate } = useBoolean(false);
    
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 600;

    const SCALE_X = CANVAS_WIDTH / width;
    const SCALE_Y = CANVAS_HEIGHT / length;

    const fetch
}