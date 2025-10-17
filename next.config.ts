import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Performance optimizations
    experimental: {
        optimizePackageImports: ["aos", "react-toastify", "framer-motion"],
    },

    // Image optimization
    images: {
        formats: ["image/webp", "image/avif"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Compression
    compress: true,

    // Headers for better caching and security
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
            {
                source: "/static/(.*)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },

    // Redirects for SEO
    async redirects() {
        return [
            {
                source: "/cgpa",
                destination: "/findmycgpa",
                permanent: true,
            },
            {
                source: "/sgpa",
                destination: "/findmysgpa",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
