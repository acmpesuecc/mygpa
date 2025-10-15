"use client";

import { lato } from "./fonts";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stagger, useAnimate } from "framer-motion";

export default function Button() {
    const router = useRouter();
    const [cgpascope, cgpaanimate] = useAnimate();
    const [sgpascope, sgpaanimate] = useAnimate();
    const cgpa = "Find my CGPA";
    const sgpa = "Find my SGPA";

    const onCgpaButtonClick = async () => {
        await cgpaanimate([
            [".cgpaletter", { y: -27 }, { duration: 0.4, delay: stagger(0.05) }],
            [".cgpa-button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
            [".cgpa-button", { scale: 1 }, { duration: 0.1 }],
            [".cgpaletter", { y: 0 }, { duration: 0.0000001, at: 0.05 }],
        ]);
    };

    const onSgpaButtonClick = async () => {
        await sgpaanimate([
            [".sgpaletter", { y: -27 }, { duration: 0.4, delay: stagger(0.05) }],
            [".sgpa-button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
            [".sgpa-button", { scale: 1 }, { duration: 0.1 }],
            [".sgpaletter", { y: 0 }, { duration: 0.0000001, at: 0.05 }],
        ]);
    };

    const handlecgpalink = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setTimeout(() => {
            router.push("/findmycgpa");
        }, 1000);
    };

    const handlesgpalink = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setTimeout(() => {
            router.push("/findmysgpa");
        }, 1000);
    };

    useEffect(() => {
        AOS.init({
            easing: "ease",
            once: true,
        });
    }, []);
    return (
        <>
            <span data-aos="fade-right" data-aos-duration="1400" ref={cgpascope} className="mx-2">
                <Link href="/findmycgpa" onClick={handlecgpalink}>
                    <button
                        className={`cgpa-button flex h-12 w-40 items-center justify-center border-3 border-sky-600 p-4 shadow-2xl hover:cursor-pointer`}
                        onClick={onCgpaButtonClick}
                    >
                        <span className="relative flex items-center justify-center overflow-hidden bg-transparent">
                            {cgpa.split("").map((letter: string, index: number) => (
                                <span
                                    data-letter={letter}
                                    key={` ${letter + "-" + index}`}
                                    className={`text-sky-600 ${lato.className} cgpaletter relative inline-block text-lg after:absolute after:left-0 after:top-full after:text-lg after:content-[attr(data-letter)]`}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </span>
                            ))}
                        </span>
                    </button>
                </Link>
            </span>
            <span data-aos="fade-left" data-aos-duration="1400" ref={sgpascope} className="mx-2">
                <Link href="/findmysgpa" onClick={handlesgpalink}>
                    <button
                        className={`sgpa-button flex h-12 w-40 items-center justify-center border-3 border-sky-600  p-4 shadow-2xl hover:cursor-pointer`}
                        onClick={onSgpaButtonClick}
                    >
                        <span className="relative flex items-center justify-center overflow-hidden bg-transparent">
                            {sgpa.split("").map((letter: string, index: number) => (
                                <span
                                    data-letter={letter}
                                    key={` ${letter + "-" + index}`}
                                    className={`text-sky-600 ${lato.className} sgpaletter relative inline-block text-lg after:absolute after:left-0 after:top-full after:text-lg after:content-[attr(data-letter)]`}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </span>
                            ))}
                        </span>
                    </button>
                </Link>
            </span>
        </>
    );
}
