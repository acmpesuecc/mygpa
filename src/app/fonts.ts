import { Spectral, Lato, Poppins } from "next/font/google";

export const spectral = Spectral({
    style: ["normal"],
    subsets: ["latin"],
    weight: ["400", "600"],
});

export const lato = Lato({
    style: ["normal"],
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const poppins = Poppins({
    style: ["normal"],
    subsets: ["latin"],
    weight: ["600"],
});
