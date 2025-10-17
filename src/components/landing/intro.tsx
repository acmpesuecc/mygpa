import React from "react";
import IntroShared from "./intro-shared";

export default function Intro({ welcome }: { welcome: string }) {
    return (
        <IntroShared
            welcome={welcome}
            imageSrc="/introbg.jpg"
            textSize="text-4xl"
            containerClassName="min-h-full min-w-full touch-pan-x overflow-hidden"
            marginTopClass="mt-[7rem]"
            buttonMarginClass="mt-12"
            applySecondGroupMargin={true}
        />
    );
}
