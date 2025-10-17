"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { poppins, spectral, lato } from "../fonts";
import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAnimate } from "motion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Modal from "../findmysgpa/modal";

type Fields = {
    semesters: {
        credits: number | null;
        sgpa: number | null;
    }[];
};

export default function CgpaForm() {
    const semesterRef = useRef<HTMLSpanElement>(null);
    const [calcscope, calcanimate] = useAnimate();
    const [addscope, addanimate] = useAnimate();
    const [rmscope, rmanimate] = useAnimate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
        reset,
    } = useForm<Fields>({
        defaultValues: { semesters: [{ credits: null, sgpa: null }] },
    });

    const [semesterNumber, setSemesterNumber] = useState(1);
    const [semesterTitles] = useAutoAnimate<HTMLDivElement>();
    const [creditsFields] = useAutoAnimate<HTMLDivElement>();
    const [sgpaFields] = useAutoAnimate<HTMLDivElement>();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cgpa, setCGPA] = useState("");
    const { fields, append, remove } = useFieldArray({
        control,
        name: "semesters",
    });

    // Watch form values to save to localStorage
    const formValues = watch();

    const handleCalcClick = async () => {
        await calcanimate([
            [".calcbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".calcbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const addSemester = async () => {
        if (fields.length < 8) {
            append({ credits: null, sgpa: null });
            setSemesterNumber(semesterNumber + 1);
        }
        await addanimate([
            [".addbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".addbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const removeSemester = async () => {
        if (fields.length > 1) {
            remove(fields.length - 1);
            setSemesterNumber(semesterNumber - 1);
        }
        await rmanimate([
            [".rmbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".rmbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    const onCalc: SubmitHandler<Fields> = (data) => {
        let totalcredits = 0;
        let numerator = 0;
        data.semesters.map((sem) => {
            if (sem.credits !== null) {
                totalcredits += sem.credits * 1;
            }
        });
        data.semesters.map((sem) => {
            if (sem.credits !== null && sem.sgpa !== null) {
                numerator += sem.credits * sem.sgpa;
            }
        });
        toggleModal();
        setCGPA((numerator / totalcredits).toFixed(2));
    };

    useEffect(() => {
        if (typeof window === "undefined") return;
        const savedData = localStorage.getItem("cgpaFormData");
        const savedSemesterCount = localStorage.getItem("cgpaSemesterCount");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed && Array.isArray(parsed.semesters)) {
                    reset({ semesters: parsed.semesters });
                    setSemesterNumber(parsed.courses.length);
                }
            } catch {}
        }
        if (savedSemesterCount) {
            setSemesterNumber(parseInt(savedSemesterCount));
        }
    }, [reset]);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        if (formValues.semesters && formValues.semesters.length > 0) {
            localStorage.setItem("cgpaFormData", JSON.stringify(formValues));
            localStorage.setItem("cgpaSemesterCount", semesterNumber.toString());
        }
    }, [formValues, semesterNumber]);

    useEffect(() => {
        AOS.init({
            easing: "ease",
            once: true,
        });
    }, []);

    return (
        <div
            className="relative mt-12 flex h-full w-full justify-center lg:mt-14"
            style={{
                height: "90%",
                width: "95%",
                backgroundColor: "transparent",
            }}
        >
            <Modal toggle={toggleModal} isOpen={modalIsOpen} gpaType="CGPA" gpa={cgpa} />
            <form onSubmit={handleSubmit(onCalc)} className="flex h-full w-full justify-center">
                <span className="flex w-full flex-wrap justify-between">
                    <div ref={semesterTitles} className="mb-4 ">
                        <span ref={semesterRef}>
                            <h1
                                className={`text-2xl text-white lg:text-5xl ${poppins.className}`}
                                data-aos="fade-down"
                                data-aos-duration="1800"
                            >
                                SEMESTER
                            </h1>
                        </span>
                        <span ref={semesterRef}>
                            <h2
                                className={`text-xl text-center text-white lg:text-4xl ${spectral.className} mb-5 mt-7 lg:mb-9 lg:mt-9`}
                                data-aos="fade-right"
                                data-aos-duration="1800"
                                data-aos-delay="1400"
                            >
                                Semester 1
                            </h2>
                        </span>

                        {fields.slice(1, semesterNumber).map((semester, index: number) => (
                            <React.Fragment key={index}>
                                <h2
                                    className={`text-xl text-center text-white lg:text-4xl ${spectral.className} mb-5 lg:mb-8`}
                                    key={index}
                                >
                                    Semester {index + 2}
                                </h2>
                            </React.Fragment>
                        ))}
                        <div data-aos="fade-right" data-aos-duration="1400" data-aos-delay="2400" ref={calcscope}>
                            <button
                                type="submit"
                                className="calcbutton hover:cursor-pointer flex justify-center rounded-full bg-gradient-to-br from-purple-800 to-pink-500 shadow-2xl w-[90%]"
                                onClick={handleCalcClick}
                            >
                                <span className={` text-sm font-extrabold text-white ${lato.className} p-2 lg:text-lg`}>
                                    Calculate CGPA
                                </span>
                            </button>
                        </div>
                    </div>

                    <div ref={creditsFields} className="mb-4 max-w-[30%]">
                        <span className="flex justify-center" ref={semesterRef}>
                            <h1
                                className={`text-2xl text-white lg:text-5xl ${poppins.className}`}
                                data-aos="fade-down"
                                data-aos-duration="1800"
                            >
                                CREDITS
                            </h1>
                        </span>
                        <span className="relative mt-6 block flex w-full justify-center lg:mt-8" ref={semesterRef}>
                            <input
                                data-aos="flip-down"
                                data-aos-duration="2000"
                                data-aos-delay="1400"
                                type="number"
                                placeholder="Total credits"
                                min="0"
                                step="1"
                                {...register(`semesters.0.credits` as const, {
                                    required: "Please enter semester credits",
                                })}
                                className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                            />
                        </span>
                        {fields.slice(1, semesterNumber).map((semester, index) => (
                            <span key={index + 1} className="relative mt-4 block flex w-full justify-center lg:mt-8">
                                <input
                                    type="number"
                                    placeholder="Total credits"
                                    min="0"
                                    step="1"
                                    {...register(`semesters.${index + 1}.credits` as const, {
                                        required: "Please enter semester credits",
                                    })}
                                    className={`relative h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} rounded-xl text-center bg-white`}
                                />
                            </span>
                        ))}
                        <div data-aos="fade-up" data-aos-duration="1400" data-aos-delay="2400" ref={addscope}>
                            <button
                                onClick={addSemester}
                                className="addbutton hover:cursor-pointer mt-5 flex w-full justify-center rounded-full bg-gradient-to-br from-cyan-600 from-20% to-green-400 lg:mt-9"
                            >
                                <span
                                    className={` text-center text-sm font-extrabold text-white lg:flex lg:flex-row ${lato.className} p-2 lg:text-lg`}
                                >
                                    <p>Add&nbsp;</p>
                                    <p>semester</p>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div ref={sgpaFields} className="mb-4 max-w-[30%]">
                        <span className="flex justify-center" ref={semesterRef}>
                            <h1
                                className={`text-2xl text-white lg:text-5xl ${poppins.className}`}
                                data-aos="fade-down"
                                data-aos-duration="1800"
                            >
                                SGPA
                            </h1>
                        </span>
                        <span ref={semesterRef} className="relative mt-6 block flex w-full justify-center lg:mt-8">
                            <input
                                data-aos="flip-down"
                                data-aos-duration="2000"
                                data-aos-delay="1400"
                                type="number"
                                placeholder="SGPA"
                                min="0"
                                max="10"
                                step="0.001"
                                {...register("semesters.0.sgpa" as const, {
                                    required: "Please enter SGPA",
                                })}
                                className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                            />
                        </span>
                        {fields.slice(1, semesterNumber).map((semester, index) => (
                            <span key={index + 1} className="relative mt-4 block flex w-full justify-center lg:mt-8">
                                <input
                                    type="number"
                                    placeholder="SGPA"
                                    min="0"
                                    max="10"
                                    step="0.001"
                                    {...register(`semesters.${index + 1}.sgpa` as const, {
                                        required: "Please enter SGPA",
                                    })}
                                    className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                />
                            </span>
                        ))}
                        <div data-aos="fade-left" data-aos-duration="1400" data-aos-delay="2400" ref={rmscope}>
                            <button
                                onClick={removeSemester}
                                className="rmbutton hover:cursor-pointer mt-5 flex w-[110%] justify-center rounded-full bg-gradient-to-br from-red-600 from-30% to-rose-500 lg:mt-9"
                            >
                                <span className={`text-sm font-extrabold text-white ${lato.className} p-2 lg:text-lg`}>
                                    Remove semester
                                </span>
                            </button>
                        </div>
                    </div>
                </span>
            </form>
        </div>
    );
}
