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

  const floatgpa = parseFloat(gpa);
  let message = <div></div>;

  switch (true) {
    case floatgpa > 9:
      message = (
        <>
          <p className={`text-lg text-white ${spectral.className} text-center`}>
            Congratulations!
          </p>
          <p
            className={`text-center text-white text-lg ${spectral.className} mt-1`}
          >
            You have achieved an outstanding academic performance!
          </p>
        </>
      );
      break;
    case floatgpa > 8:
      message = (
        <p
          className={`text-center text-white text-lg ${spectral.className} mt-1`}
        >
          Congratulations on achieving an impressive GPA! Your hard work has truly paid off.
        </p>
      );
      break;
    case floatgpa > 6:
      message = (
        <p
          className={`text-center text-white text-lg ${spectral.className} mt-1`}
        >
          Impressive! Your academic progress is noteworthy. Keep aiming higher!
        </p>
      );
      break;
    default:
      message = (
        <p
          className={`text-center text-white text-lg ${spectral.className} mt-1`}
        >
          Challenges shape champions. Keep striving forward — success awaits!
        </p>
      );
  }

  const closeModal = () => toggle();

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
        className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isOpen ? "z-40 opacity-100" : "-z-10 opacity-0"
        }`}
      >
        {/* Background Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isOpen ? "opacity-70" : "opacity-0"
          }`}
        ></div>

        {/* Modal */}
        {isOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            data-aos="zoom-in"
            data-aos-duration="800"
            className="relative z-50 flex flex-col items-center justify-center w-11/12 max-w-sm gap-y-4 rounded-3xl px-6 py-8 
            bg-gradient-to-b from-indigo-700 via-indigo-800 to-violet-800 shadow-2xl"
          >
            {/* Title */}
            <h1
              className={`text-center text-3xl md:text-4xl text-white font-semibold ${spectral.className}`}
            >
              Your {gpaType} is:
            </h1>

            {/* GPA Value in Circle */}
            <div className="flex items-center justify-center w-40 h-40 rounded-full border-4 border-white text-white">
              <p
                className={`text-5xl md:text-6xl font-bold ${spectral.className}`}
              >
                {gpa}
              </p>
            </div>

            {/* Message */}
            <div
              className={`text-center transition-opacity duration-1000 ${
                isOpen ? "opacity-100 delay-500" : "opacity-0"
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
