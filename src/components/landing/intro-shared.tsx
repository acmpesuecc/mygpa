"use client";

import React, { useEffect, useState } from "react";
import "@/styles/intro.css";
import Image from "next/image";
import { motion, type Transition, type Variants } from "motion/react";
import { spectral } from "../../app/fonts";
import Button from "./button";

interface IntroSharedProps {
    welcome: string;
    imageSrc: string;
    textSize: "text-4xl" | "text-6xl";
    containerClassName: string;
    useExtraWrapper?: boolean;
    marginTopClass?: string;
    buttonMarginClass?: string;
    applySecondGroupMargin?: boolean;
}

export default function IntroShared({
    welcome,
    imageSrc,
    textSize,
    containerClassName,
    useExtraWrapper = false,
    marginTopClass = "mt-[7rem]",
    buttonMarginClass = "mt-12",
    applySecondGroupMargin = false,
}: IntroSharedProps) {
    const [showbutton, setShowButton] = useState(false);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.1 + 0.1 * i },
        }),
    };

    const spring: Transition = { type: "spring", damping: 12, stiffness: 60 };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: spring,
        },
        hidden: {
            opacity: 0,
            x: 0,
            y: 50,
            transition: spring,
        },
    };

    const skipAnimation = () => {
        setShowButton(true);
    };

    useEffect(() => {
        setTimeout(() => setShowButton(true), 6000);
    }, []);

    const animationContent = (
        <div>
            <motion.span
                variants={container}
                initial={showbutton ? "visible" : "hidden"}
                animate="visible"
                className={`container ${!useExtraWrapper ? marginTopClass : ""} flex items-center justify-center`}
            >
                {welcome
                    .split("")
                    .slice(0, 10)
                    .map((char: string, index: number) => (
                        <motion.span
                            key={index}
                            className={`el-${index} change-style relative ${textSize} ${spectral.className}`}
                            variants={child}
                            custom={index + 1}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                {welcome
                    .split("")
                    .slice(10, 17)
                    .map((char: string, index: number) => (
                        <motion.span
                            key={index}
                            className={`el-${index + 10} change-style relative ${textSize} ${spectral.className}`}
                            variants={child}
                            custom={index * 10 + 1}
                            style={
                                applySecondGroupMargin
                                    ? {
                                          marginRight: `-0.2%`,
                                          paddingLeft: "0.3%",
                                      }
                                    : undefined
                            }
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
            </motion.span>
            <span className={`relative ${buttonMarginClass} flex flex-wrap items-center justify-center`}>
                {showbutton && <Button />}
            </span>
        </div>
    );

    return (
        <div className={containerClassName} onClick={skipAnimation}>
            <Image src={imageSrc} objectFit="cover" fill={true} alt="MyGPA introbg" loading="eager" />
            {useExtraWrapper ? <div className="relative">{animationContent}</div> : animationContent}
        </div>
    );
}
