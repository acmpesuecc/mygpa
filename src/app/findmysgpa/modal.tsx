"use client";
import Portal from "./portal";
import AOS from "aos";
import "aos/dist/aos.css";
import { spectral } from "../fonts";
import GPAProgress from "./progress";
import { useEffect } from "react";

type ModalProps = {
    toggle: () => void;
    isOpen: boolean;
    gpaType: string;
    gpa: string;
};
export default function Modal(props: ModalProps) {
    const { toggle, isOpen, gpaType, gpa } = props;

    let message = <div></div>;
    const floatgpa = parseFloat(gpa);

    switch (true) {
        case floatgpa > 9:
            message = (
                <>
                    <p className={` text-lg text-white ${spectral.className} text-center`}>Congratulations!</p>
                    <p className={`text-center text-lg text-white ${spectral.className} mx-auto `}>
                        You have achieved an outstanding academic performance!
                    </p>
                </>
            );
            break;
        case floatgpa > 8:
            message = (
                <>
                    <p className={` text-lg text-white ${spectral.className} text-center`}>
                        Congratulations on achieving an impressive GPA! Your hard work has truly paid off. Well done!
                    </p>
                </>
            );
            break;
        case floatgpa > 6:
            message = (
                <>
                    <p className={` text-lg text-white ${spectral.className} text-center  `}>
                        Impressive! Your academic progress is noteworthy, and there is potential for excellence in future
                        endeavors.
                    </p>
                </>
            );
            break;
        case floatgpa <= 6:
            message = (
                <>
                    <p className={` text-lg text-white ${spectral.className} text-center  `}>
                        Amid challenges, your dedication stands strong. Each hurdle is a stepping stone to your future success.
                        Keep going!
                    </p>
                </>
            );
    }
    const closeModal = () => {
        toggle();
    };

    useEffect(() => {
        AOS.init({
            easing: "ease",
            once: false,
        });
    }, [isOpen]);

    return (
        <Portal newDomNode="modal-portal">
            <div
                onClick={closeModal}
                className={`absolute left-0 top-0 flex h-full w-full touch-pan-x items-center justify-center overflow-hidden
         ${isOpen ? "z-[99999999999]" : "-z-[99999]  "}`}
            >
                <div
                    className={`delay-400 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black opacity-0 transition-opacity duration-[1400ms]
       ${isOpen ? "z-[9999999999] opacity-70" : "-z-[99999]  "}`}
                ></div>

                {isOpen && (
                    <>
                        <div
                            data-aos="flip-left"
                            data-aos-duration="2000"
                            data-aos-delay="1800"
                            className=" absolute z-[99999999999999999] flex h-2/3 
            w-2/3 justify-center rounded-3xl
              bg-radial-[ellipse_at_top_left] from-indigo-800 via-indigo-700 to-violet-700"
                        >
                            <h1
                                className={` mx-auto mt-8 text-3xl text-white  lg:text-5xl ${spectral.className}`}
                                style={{ fontWeight: 600 }}
                            >
                                Your {gpaType} is:
                            </h1>
                            <GPAProgress gpa={gpa} openProgress={isOpen} />

                            <span
                                className={`absolute mx-auto mt-[120%] flex w-3/4 flex-wrap justify-center  lg:invisible  
              ${
                  isOpen
                      ? "ease opacity-100 transition-opacity delay-1000 duration-1000"
                      : "ease opacity-0 transition-opacity delay-1000 duration-1000"
              }`}
                            >
                                {message}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </Portal>
    );
}
