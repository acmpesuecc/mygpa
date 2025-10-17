"use client";
import Intro from "./intro";
import { useState, useEffect } from "react";
import IntroPC from "./intropc";
function HomePage() {
    const [isSlim, setSlim] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const updateMedia = () => {
                setSlim(window.innerWidth < 1024);
            };
            updateMedia();
            window.addEventListener("resize", updateMedia);
            return () => window.removeEventListener("resize", updateMedia);
        }
    }, []);

    if (!mounted) {
        return <main className="min-w-screen min-h-screen touch-pan-x overflow-hidden"></main>;
    }

    return (
        <main className="min-w-screen min-h-screen touch-pan-x overflow-hidden">
            {isSlim ? <Intro welcome="Welcome to MyGPA." /> : <IntroPC welcome="Welcome to MyGPA." />}
        </main>
    );
}

export default HomePage;
