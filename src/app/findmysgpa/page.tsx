import "@/styles/background.css";
import Menu from "../findmycgpa/menu";
import SgpaForm from "./sgpaform";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SGPA Calculator",
    description: "Calculate your Semester Grade Point Average (SGPA) for PES University. Enter your current semester grades and credits to get your accurate SGPA instantly.",
    keywords: ["SGPA calculator", "semester GPA", "PES University", "grade point average", "semester calculator"],
    openGraph: {
        title: "SGPA Calculator - MyGPA",
        description: "Calculate your Semester Grade Point Average (SGPA) for PES University. Enter your current semester grades and credits to get your accurate SGPA instantly.",
        url: "/findmysgpa",
        type: "website",
    },
    twitter: {
        title: "SGPA Calculator - MyGPA",
        description: "Calculate your Semester Grade Point Average (SGPA) for PES University. Enter your current semester grades and credits to get your accurate SGPA instantly.",
    },
    alternates: {
        canonical: "/findmysgpa",
    },
};

function FindMySGPA() {
    const grades = ["S", "A+", "A", "A-", "B+", "B", "C", "D", "E", "F"];
    const randomGrade = () => {
        return grades[Math.floor(Math.random() * 10)];
    };

    const renderListitems = () => {
        const listItems = [];
        for (let i = 0; i < 10; i++) {
            listItems.push(
                <li key={i} className="-z-{1} absolute -bottom-40 block text-sky-100">
                    {randomGrade()}
                </li>,
            );
        }
        return listItems;
    };

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "SGPA Calculator",
        "description": "Calculate your Semester Grade Point Average (SGPA) for PES University. Enter your current semester grades and credits to get your accurate SGPA instantly.",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app'}/findmysgpa`,
        "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "SGPA Calculator",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "description": "Calculate your Semester Grade Point Average (SGPA) for PES University students",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app'
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "SGPA Calculator",
                    "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app'}/findmysgpa`
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
            <Menu link1="Home" link2="Find my CGPA" />
            <main className="flex h-screen w-screen touch-pan-x justify-center overflow-hidden">
                <div className="-z-{2} absolute h-full w-full bg-radial-[ellipse_at_bottom_right] from-violet-600 via-indigo-800 to-gray-900">
                    <ul className="grades -z-{1} absolute left-0 top-0 h-full w-full overflow-hidden ">{renderListitems()}</ul>
                </div>
                <SgpaForm />
            </main>
        </>
    );
}
export default FindMySGPA;
