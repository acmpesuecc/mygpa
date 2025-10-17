import React, { useEffect, useState } from "react";
import "@/styles/intro.css";
import { motion, type Transition, type Variants } from "motion/react";
import { spectral } from "./fonts";
import Button from "./button";
import Image from "next/image";

export default function IntroPC({ welcome }: { welcome: string }) {
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
    return (
        <div className="flex min-h-screen items-center justify-center overflow-hidden" onClick={skipAnimation}>
            <Image 
                src="/85327.jpg" 
                objectFit="cover" 
                fill={true} 
                alt="MyGPA background image showing academic theme" 
                loading="eager"
                priority
                sizes="100vw"
                quality={85}
            />
            <div className="relative">
                <motion.span
                    variants={container}
                    initial={showbutton ? "visible" : "hidden"}
                    animate="visible"
                    className="container flex items-center justify-center"
                >
                    {welcome
                        .split("")
                        .slice(0, 10)
                        .map((char: string, index: number) => (
                            <motion.span
                                key={index}
                                className={`el-${index} change-style relative text-6xl ${spectral.className}`}
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
                                className={`el-${index + 10} change-style relative text-6xl ${spectral.className}`}
                                variants={child}
                                custom={index * 10 + 1}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                </motion.span>
                <span className="relative mt-16 flex flex-wrap items-center justify-center">{showbutton && <Button />}</span>
            </div>
        </div>
    );
}
