import "@/styles/background.css";
import CgpaForm from "./cgpaform";
import Menu from "./menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CGPA Calculator",
    description: "Calculate your Cumulative Grade Point Average (CGPA) for PES University. Enter your grades and credits to get your accurate CGPA instantly.",
    keywords: ["CGPA calculator", "cumulative GPA", "PES University", "grade point average", "academic calculator"],
    openGraph: {
        title: "CGPA Calculator - MyGPA",
        description: "Calculate your Cumulative Grade Point Average (CGPA) for PES University. Enter your grades and credits to get your accurate CGPA instantly.",
        url: "/findmycgpa",
        type: "website",
    },
    twitter: {
        title: "CGPA Calculator - MyGPA",
        description: "Calculate your Cumulative Grade Point Average (CGPA) for PES University. Enter your grades and credits to get your accurate CGPA instantly.",
    },
    alternates: {
        canonical: "/findmycgpa",
    },
};

function FindMyCGPA() {
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
        "name": "CGPA Calculator",
        "description": "Calculate your Cumulative Grade Point Average (CGPA) for PES University. Enter your grades and credits to get your accurate CGPA instantly.",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app'}/findmycgpa`,
        "mainEntity": {
            "@type": "SoftwareApplication",
            "name": "CGPA Calculator",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser",
            "description": "Calculate your Cumulative Grade Point Average (CGPA) for PES University students",
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
                    "name": "CGPA Calculator",
                    "item": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app'}/findmycgpa`
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
            <Menu link1="Home" link2="Find my SGPA" />
            <main className="flex h-screen w-screen touch-pan-x justify-center overflow-hidden">
                <div className="-z-{2} absolute h-full w-full bg-radial-[ellipse_at_bottom_right] from-violet-600 via-indigo-800 to-gray-900">
                    <ul className="grades -z-{1} absolute left-0 top-0 h-full w-full overflow-hidden ">{renderListitems()}</ul>
                </div>

                <CgpaForm />
            </main>
        </>
    );
}
export default FindMyCGPA;
