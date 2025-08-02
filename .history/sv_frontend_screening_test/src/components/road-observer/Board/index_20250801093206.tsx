"use client"

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
    const [isRiding, setIsRiding] = useState
}