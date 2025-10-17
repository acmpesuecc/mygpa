"use client";
import Intro from "./intro";
import { useState, useEffect } from "react";
import IntroPC from "./intropc";
import Loading from "./loading";

export default function HomePageClient() {
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
    
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "MyGPA - GPA Calculator for PES University Students",
        "description": "Welcome to MyGPA - Your comprehensive GPA calculator for PES University. Calculate CGPA and SGPA with ease and track your academic progress.",
        "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app',
        "mainEntity": {
            "@type": "WebApplication",
            "name": "MyGPA",
            "description": "Calculate your CGPA and SGPA with our easy-to-use GPA calculator designed specifically for PES University students.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            },
            "featureList": [
                "CGPA Calculator",
                "SGPA Calculator",
                "Grade Point Average Calculation",
                "PES University Grade System"
            ]
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app'
                }
            ]
        }
    };
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
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
