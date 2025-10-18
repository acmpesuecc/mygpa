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
    const [selectedScale, setSelectedScale] = useState("10");
    const semesterRef = useRef<HTMLSpanElement>(null);
    const [calcscope, calcanimate] = useAnimate();
    const [addscope, addanimate] = useAnimate();
    const [rmscope, rmanimate] = useAnimate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
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

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    const onCalc: SubmitHandler<Fields> = (data) => {
        let totalcredits = 0;
        let numerator = 0;

        data.semesters.forEach((sem) => {
            if (sem.credits !== null) totalcredits += sem.credits;
        });

        data.semesters.forEach((sem) => {
            if (sem.credits !== null && sem.sgpa !== null) numerator += sem.credits * sem.sgpa;
        });

        toggleModal();
        setCGPA(totalcredits > 0 ? (numerator / totalcredits).toFixed(2) : "0.00");
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
                    setSemesterNumber(parsed.semesters.length);
                }
            } catch {}
        }
        if (savedSemesterCount) setSemesterNumber(parseInt(savedSemesterCount));
    }, [reset]);

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
        <div className="relative mt-12 flex h-full w-full justify-center lg:mt-14" style={{ height: "90%", width: "95%", backgroundColor: "transparent" }}>
            <Modal toggle={toggleModal} isOpen={modalIsOpen} gpaType="CGPA" gpa={cgpa} />
            <form onSubmit={handleSubmit(onCalc)} className="flex h-full w-full justify-center">
                {/* Grading Scale Selector */}
                <div className="mb-6 w-full max-w-xs" data-aos="fade-down">
                    <label htmlFor="grade-scale-select" className={`block text-white text-lg mb-2 ${poppins.className}`}>Grading Scale</label>
                    <select
                        id="grade-scale-select"
                        value={selectedScale}
                        onChange={(e) => setSelectedScale(e.target.value)}
                        className="block w-full bg-white border border-gray-300 rounded-lg p-2 text-center"
                    >
                        <option value="10.0">10.0 Point Scale</option>
                        <option value="5.0">5.0 Point Scale (NUS/NTU)</option>
                        <option value="4.33">4.33 Point Scale</option>
                        <option value="4.0">4.0 Point Scale</option>
                    </select>
                </div>

                <span className="flex w-full flex-wrap justify-between">
                    <div ref={semesterTitles} className="mb-4">
                        <h1 className={`text-2xl text-white lg:text-5xl ${poppins.className}`} data-aos="fade-down" data-aos-duration="1800">SEMESTER</h1>
                        {fields.map((semester, index) => (
                            <h2 key={index} className={`text-xl text-center text-white lg:text-4xl ${spectral.className} mb-5 lg:mb-8`} data-aos="fade-right" data-aos-duration="1800" data-aos-delay={1400 + index * 300}>
                                Semester {index + 1}
                            </h2>
                        ))}

                        <div data-aos="fade-right" data-aos-duration="1400" data-aos-delay="2400" ref={calcscope}>
                            <button type="submit" className="calcbutton hover:cursor-pointer flex justify-center rounded-full bg-gradient-to-br from-purple-800 to-pink-500 shadow-2xl w-[90%]" onClick={handleCalcClick}>
                                <span className={`text-sm font-extrabold text-white ${lato.className} p-2 lg:text-lg`}>Calculate CGPA</span>
                            </button>
                        </div>
                    </div>

                    {/* Credits Inputs */}
                    <div ref={creditsFields} className="mb-4 max-w-[30%]">
                        <h1 className={`text-2xl text-white lg:text-5xl ${poppins.className}`} data-aos="fade-down" data-aos-duration="1800">CREDITS</h1>
                        {fields.map((semester, index) => (
                            <span key={index} className="relative mt-6 block flex w-full justify-center lg:mt-8">
                                <input
                                    type="number"
                                    placeholder="Total credits"
                                    min={0}
                                    step={1}
                                    {...register(`semesters.${index}.credits`)}
                                    className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                    defaultValue={semester.credits ?? ""}
                                />
                            </span>
                        ))}

                        <div data-aos="fade-up" data-aos-duration="1400" data-aos-delay="2400" ref={addscope}>
                            <button onClick={addSemester} className="addbutton hover:cursor-pointer mt-5 flex w-full justify-center rounded-full bg-gradient-to-br from-cyan-600 from-20% to-green-400 lg:mt-9">
                                <span className={`text-center text-sm font-extrabold text-white lg:flex lg:flex-row ${lato.className} p-2 lg:text-lg`}>
                                    <p>Add&nbsp;</p><p>semester</p>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* SGPA Inputs */}
                    <div ref={sgpaFields} className="mb-4 max-w-[30%]">
                        <h1 className={`text-2xl text-white lg:text-5xl ${poppins.className}`} data-aos="fade-down" data-aos-duration="1800">SGPA</h1>
                        {fields.map((semester, index) => (
                            <span key={index} className="relative mt-6 block flex w-full justify-center lg:mt-8">
                                <input
                                    type="number"
                                    placeholder="SGPA"
                                    min={0}
                                    max={10}
                                    step={0.001}
                                    {...register(`semesters.${index}.sgpa`)}
                                    className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                    defaultValue={semester.sgpa ?? ""}
                                />
                            </span>
                        ))}

                        <div data-aos="fade-left" data-aos-duration="1400" data-aos-delay="2400" ref={rmscope}>
                            <button onClick={removeSemester} className="rmbutton hover:cursor-pointer mt-5 flex w-[110%] justify-center rounded-full bg-gradient-to-br from-red-600 from-30% to-rose-500 lg:mt-9">
                                <span className={`text-sm font-extrabold text-white ${lato.className} p-2 lg:text-lg`}>Remove semester</span>
                            </button>
                        </div>
                    </div>
                </span>
            </form>
        </div>
    );
}
