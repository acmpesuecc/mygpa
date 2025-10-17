"use client";
import { spectral } from "@/app/fonts";
import React, { useEffect, useState } from "react";
export default function GPAProgress({ gpa, openProgress }: { gpa: string; openProgress: boolean }) {
    let radius = 0;
    let multiplier = 0;
    if (window.innerWidth < 900) {
        radius = 88;
        multiplier = 553;
    } else {
        radius = 140;
        multiplier = 880;
    }
    const [showGPA, setShowGPA] = useState(false);
    useEffect(() => {
        const draw = () => {
            const element = document.getElementById("robin");
            const number = document.getElementById("robin1");
            if (element && number) {
                element.style.strokeDasharray = `${Math.round(Math.PI * (2 * radius))}`;
                element.style.strokeDashoffset = `${Math.round(Math.PI * (2 * radius)) - (parseFloat(gpa) / 10) * multiplier}`;
            }
            setTimeout(() => {
                setShowGPA(true);
            }, 1800);
        };
        setTimeout(draw, 4000);
    }, [openProgress, gpa, multiplier, radius]);
    return (
        <div
            className={`absolute z-[999999] flex w-full select-none flex-col items-center
       justify-center lg:pt-16`}
        >
            {openProgress && (
                <>
                    <svg className="relative z-[2] flex h-96 w-96 -rotate-90 transform items-center justify-center">
                        <circle
                            className={`text-slate-400`}
                            stroke="currentColor"
                            strokeWidth="4"
                            cx="50%"
                            cy="50%"
                            r={radius}
                            fill="transparent"
                        />
                        <circle
                            cx="50%"
                            cy="50%"
                            r={radius}
                            stroke="currentColor"
                            id="robin"
                            stroke-linecap="round"
                            stroke-width="4"
                            fill="transparent"
                            className="ease text-white transition-all duration-[1800ms]"
                            strokeDasharray={Math.round(Math.PI * (2 * radius))}
                            strokeDashoffset={Math.round(Math.PI * (2 * radius))}
                        />
                    </svg>
                </>
            )}
            <span
                className={`ease text-bold absolute z-[9999999999] text-5xl text-white opacity-0 transition-all duration-[2000ms] lg:text-6xl ${
                    spectral.className
                } ${showGPA ? "opacity-100" : ""}`}
                id="robin1"
            >
                {gpa}
            </span>
        </div>
    );
}
