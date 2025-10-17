import "@/styles/globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: {
        default: "MyGPA - GPA Calculator for PES University Students",
        template: "%s | MyGPA"
    },
    description: "Calculate your CGPA and SGPA with our easy-to-use GPA calculator designed specifically for PES University students. Track your academic performance and plan your studies effectively.",
    keywords: ["GPA calculator", "CGPA calculator", "SGPA calculator", "PES University", "grade calculator", "academic performance", "student tools"],
    authors: [{ name: "MyGPA Team" }],
    creator: "MyGPA",
    publisher: "MyGPA",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        title: "MyGPA - GPA Calculator for PES University Students",
        description: "Calculate your CGPA and SGPA with our easy-to-use GPA calculator designed specifically for PES University students.",
        siteName: "MyGPA",
        images: [
            {
                url: "/icon.png",
                width: 1200,
                height: 630,
                alt: "MyGPA - GPA Calculator for PES University Students",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "MyGPA - GPA Calculator for PES University Students",
        description: "Calculate your CGPA and SGPA with our easy-to-use GPA calculator designed specifically for PES University students.",
        images: ["/icon.png"],
        creator: "@mygpa",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "MyGPA",
        "description": "Calculate your CGPA and SGPA with our easy-to-use GPA calculator designed specifically for PES University students.",
        "url": process.env.NEXT_PUBLIC_BASE_URL || 'https://mygpa.vercel.app',
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "creator": {
            "@type": "Organization",
            "name": "MyGPA Team"
        },
        "audience": {
            "@type": "EducationalAudience",
            "educationalRole": "student"
        }
    };

    return (
        <html lang="en">
            <link rel="icon" href="/icon.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#3b82f6" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="MyGPA" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <body className={`font-sans ${inter.variable}`}>{children}</body>
        </html>
    );
}
