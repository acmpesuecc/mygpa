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
                className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300
        ${isOpen ? "z-40 opacity-100" : "opacity-0 -z-10"}`}
            >
                {/* Dark Overlay */}
                <div
                    className={`absolute inset-0 bg-black transition-opacity duration-500
    ${isOpen ? "opacity-70" : "opacity-0"}`}
                ></div>

                {/* Modal Content */}
                {isOpen && (
                    <div
                        // Prevent clicks inside the modal from closing it
                        onClick={(e) => e.stopPropagation()}
                        data-aos="flip-left"
                        data-aos-duration="1200"
                        data-aos-delay="500"
                        // --- RESPONSIVE REFACTOR ---
                        className="relative z-50 flex w-11/12 max-w-md flex-col items-center justify-center gap-y-6 rounded-3xl p-8
            bg-radial-[ellipse_at_top_left] from-indigo-800 via-indigo-700 to-violet-700"
                    >
                        <h1
                            className={`text-center text-3xl text-white md:text-4xl ${spectral.className}`}
                            style={{ fontWeight: 600 }}
                        >
                            Your {gpaType} is:
                        </h1>

                        <GPAProgress gpa={gpa} openProgress={isOpen} />

                        <div
                            className={`flex flex-wrap justify-center text-center 
            ${
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
