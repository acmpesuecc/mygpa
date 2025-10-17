import type { Metadata } from "next";
import HomePageClient from "./home-client";

export const metadata: Metadata = {
    title: "Home",
    description: "Welcome to MyGPA - Your comprehensive GPA calculator for PES University. Calculate CGPA and SGPA with ease and track your academic progress.",
    openGraph: {
        title: "MyGPA - GPA Calculator for PES University Students",
        description: "Welcome to MyGPA - Your comprehensive GPA calculator for PES University. Calculate CGPA and SGPA with ease and track your academic progress.",
        url: "/",
        type: "website",
    },
    twitter: {
        title: "MyGPA - GPA Calculator for PES University Students",
        description: "Welcome to MyGPA - Your comprehensive GPA calculator for PES University. Calculate CGPA and SGPA with ease and track your academic progress.",
    },
    alternates: {
        canonical: "/",
    },
};
export default function HomePage() {
    return <HomePageClient />;
}
