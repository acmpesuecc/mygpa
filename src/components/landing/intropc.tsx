import React from "react";
import IntroShared from "./intro-shared";

export default function IntroPC({ welcome }: { welcome: string }) {
    return (
        <IntroShared
            welcome={welcome}
            imageSrc="/85327.jpg"
            textSize="text-6xl"
            containerClassName="flex min-h-screen items-center justify-center overflow-hidden"
            useExtraWrapper={true}
            buttonMarginClass="mt-16"
            applySecondGroupMargin={false}
        />
    );
}
