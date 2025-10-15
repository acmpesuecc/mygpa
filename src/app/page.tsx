"use client";
import Intro from "./intro";
import { useState, useEffect } from "react";
import IntroPC from "./intropc";
import Loading from "./loading";
function HomePage() {
    const [isSlim, setSlim] = useState(false);
    const updateMedia = () => {
        if (typeof window !== null && window.innerWidth < 1024) {
            setSlim(true);
        }
    };

    useEffect(() => {
        updateMedia();
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    }, []);
    return (
        <>
            <main className="min-w-screen min-h-screen touch-pan-x overflow-hidden">
                {typeof window !== "undefined" ? (
                    isSlim ? (
                        <Intro welcome="Welcome to MyGPA." />
                    ) : (
                        <IntroPC welcome="Welcome to MyGPA." />
                    )
                ) : (
                    <>
                        <Loading />
                    </>
                )}
            </main>
        </>
    );
}

export default HomePage;
