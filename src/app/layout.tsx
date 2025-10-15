import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "MyGPA",
    description: "A GPA calculator for students of PES University",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <link rel="icon" href="/icon.png" />
            <body className={`font-sans ${inter.variable}`}>{children}</body>
        </html>
    );
}
