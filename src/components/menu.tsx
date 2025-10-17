"use client";
import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/menu.css";
import Link from "next/link";
import { spectral } from "@/app/fonts";

type MenuProps = {
    link1: string;
    link2: string;
};

function Menu(props: MenuProps) {
    const { link1, link2 } = props;
    let linkerinit = [""];
    if (link2) {
        linkerinit = link2.split("").slice(-4);
    }
    let linkertext = "";

    if (linkerinit && linkerinit.length > 0) {
        for (const char of linkerinit) {
            if (char) {
                linkertext += char.toLowerCase();
            }
        }
    }

    const aniref = useRef(null);
    const [rotation, setRotation] = useState(false);
    const rotateOnClick = () => {
        setRotation(!rotation);
    };
    useEffect(() => {
        AOS.init({
            easing: "ease",
            once: true,
        });
    }, []);
    return (
        <div className="absolute h-full w-full" ref={aniref}>
            <div data-aos="fade-down-right" data-aos-duration="1400" className="absolute z-[999999]">
                <div
                    className={` absolute h-auto w-auto cursor-pointer rounded-br-full bg-white pb-4 pl-1 pr-4 pt-3 lg:pb-6 lg:pl-2 lg:pr-6 lg:pt-4`}
                    onClick={rotateOnClick}
                >
                    <div
                        className={`ease space-y-1.5 transition-transform duration-300 lg:space-y-2 ${
                            rotation ? `rotate-90 ` : ` `
                        }`}
                    >
                        <span className=" relative block h-0.5 w-6 rounded-full bg-gray-400 lg:h-1 lg:w-8"></span>
                        <span className="relative block h-0.5 w-6 rounded-full bg-gray-400 lg:h-1 lg:w-8"></span>
                        <span className="relative block h-0.5 w-6 rounded-full bg-gray-400 lg:h-1 lg:w-8"></span>
                    </div>
                </div>
            </div>

            <span
                className={`absolute left-[4.5vw] top-[4vh] z-[199] -rotate-[48deg] text-xl text-black lg:left-[2.5vw] lg:top-[9vh] lg:text-4xl
         ${spectral.className} ${
             rotation ? "opacity-100 transition-all delay-[200ms] duration-[1600ms]" : " opacity-0 transition-all duration-500"
         }`}
                style={{ fontWeight: 800 }}
            >
                {rotation && <Link href="../">{link1}</Link>}
            </span>

            <span
                className={`absolute left-[8vw] top-[10vh] z-[199] -rotate-[48deg] text-xl text-black lg:left-[5vw] lg:top-[23vh] lg:text-4xl
         ${spectral.className} ${
             rotation ? " opacity-100 transition-all duration-[2000ms] " : "opacity-0 transition-all duration-300"
         }`}
                style={{ fontWeight: 800 }}
            >
                {rotation && <Link href={`../findmy${linkertext}`}> {link2}</Link>}
            </span>

            <nav
                id="nav"
                className={` absolute inset-0 overflow-hidden transition-all duration-1000 ${
                    rotation ? "visible z-[100]" : " invisible -z-[1] "
                }`}
            >
                <ul>
                    <li className="shape-circle circle-one curser-pointer"></li>

                    <li className="shape-circle circle-one curser-pointer"></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
