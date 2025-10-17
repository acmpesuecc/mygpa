"use client";
import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../styles/menu.css";
import Link from "next/link";
import { spectral } from "../fonts";

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
                className={`menu-link menu-link-one z-[199] ${spectral.className} ${
                    rotation
                        ? "opacity-100 transition-opacity delay-[200ms] duration-700"
                        : "opacity-0 transition-opacity duration-300"
                }`}
                style={{ fontWeight: 800 }}
            >
                {rotation && <Link href="../">{link1}</Link>}
            </span>

            <span
                className={`menu-link menu-link-two z-[199] ${spectral.className} ${
                    rotation ? "opacity-100 transition-opacity duration-900" : "opacity-0 transition-opacity duration-300"
                }`}
                style={{ fontWeight: 800 }}
            >
                {rotation && <Link href={`../findmy${linkertext}`}> {link2}</Link>}
            </span>

            <nav
                id="nav"
                className={`absolute inset-0 overflow-hidden duration-700 ease-[cubic-bezier(0.7,0.1,0.45,1)] ${
                    rotation ? "visible opacity-100 pointer-events-auto z-[100]" : "opacity-0 pointer-events-none z-[100]"
                }`}
            >
                <ul>
                    <li className="shape-circle circle-one cursor-pointer"></li>

                    <li className="shape-circle circle-one cursor-pointer"></li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
