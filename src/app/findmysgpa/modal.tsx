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
    const floatgpa = parseFloat(gpa) || 0;

    let message = <div></div>;
    switch (true) {
        case floatgpa > 9:
            message = (
                <>
                    <p className={`text-lg text-white ${spectral.className} text-center`}>Congratulations!</p>
                    <p className={`text-center text-lg text-white ${spectral.className} mx-auto`}>
                        You have achieved an outstanding academic performance!
                    </p>
                </>
            );
            break;
        case floatgpa > 8:
            message = (
                <>
                    <p className={`text-lg text-white ${spectral.className} text-center`}>
                        Congratulations on achieving an impressive GPA! Your hard work has truly paid off. Well done!
                    </p>
                </>
            );
            break;
        case floatgpa > 6:
            message = (
                <>
                    <p className={`text-lg text-white ${spectral.className} text-center`}>
                        Impressive! Your academic progress is noteworthy, and there is potential for excellence in future
                        endeavors.
                    </p>
                </>
            );
            break;
        default:
            message = (
                <>
                    <p className={`text-lg text-white ${spectral.className} text-center`}>
                        Amid challenges, your dedication stands strong. Each hurdle is a stepping stone to your future success.
                        Keep going!
                    </p>
                </>
            );
            break;
    }

    const closeModal = () => {
        toggle();
    };

    useEffect(() => {
        AOS.init({
            easing: "ease",
            once: false,
        });
        if (isOpen) {
            AOS.refresh();
        }
    }, [isOpen]);

    return (
        <Portal newDomNode="modal-portal">
            <div
                onClick={closeModal}
                className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isOpen ? "z-[99999999999]" : "-z-[99999] opacity-0"
                }`}
                aria-modal="true"
                role="dialog"
            >
                <div
                    className={`delay-400 absolute inset-0 bg-black opacity-0 transition-opacity duration-[1400ms] ${
                        isOpen ? "z-[9999999999] opacity-70" : "-z-[99999]"
                    }`}
                    aria-hidden="true"
                ></div>

                {isOpen && (
                    <div
                        data-aos="flip-left"
                        data-aos-duration="2000"
                        data-aos-delay="1800"
                        className="relative z-[99999999999999999] flex  max-w-xs w-full flex-col items-center justify-center gap-y-2 rounded-3xl p-6 pt-8 shadow-xl bg-radial-[ellipse_at_top_left] from-indigo-800 via-indigo-700 to-violet-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1
                            className={`text-center mx-auto mt-2 text-3xl text-white lg:text-5xl ${spectral.className}`}
                            style={{ fontWeight: 600 }}
                        >
                            Your {gpaType} is:
                        </h1>
                        <GPAProgress gpa={gpa} openProgress={isOpen} />
                        <div
                            className={`text-center ${
                                isOpen
                                    ? "ease opacity-100 transition-opacity delay-1000 duration-1000"
                                    : "ease opacity-0 transition-opacity delay-1000 duration-1000"
                            }`}
                        >
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </Portal>
    );
}
