"use client"

import { Observer, Vehicle } from "@/types/road-observer.type";
import { useRef } from "react";

interface Props {
    vehicles: Vehicle[];
    observer: Observer;
    width: number;
    length: number;
}

const Board = ({ vehicles, observer, width, length }: Props) => {
    const canvasRef = useRef(nui)
}