"use client";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { poppins, spectral, lato } from "../fonts";
import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAnimate } from "motion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Modal from "./modal";
// ** STEP 1: Import the new grade scales data
import { gradeScales } from "../../lib/gradingScales"; // Adjust path if needed

type Fields = {
    courses: {
        title: string | null;
        credits: number;
        grade: string;
    }[];
};

export default function SgpaForm() {
    // ** STEP 2: Add state for the selected scale
    const [selectedScale, setSelectedScale] = useState("10.0");

    const courseRef = useRef<HTMLSpanElement>(null);
    const [calcscope, calcanimate] = useAnimate();
    const [addscope, addanimate] = useAnimate();
    const [rmscope, rmanimate] = useAnimate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sgpa, setSGPA] = useState("");

    // ** STEP 3: Get the active scale data dynamically
    const activeScaleData = gradeScales[selectedScale as keyof typeof gradeScales] || [];

    const handleCalcClick = async () => {
        await calcanimate([
            [".calcbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".calcbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setError,
        reset,
    } = useForm<Fields>({
        defaultValues: {
            courses: [{ title: null, credits: 1, grade: activeScaleData[0]?.grade || "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "courses",
    });

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    // ** STEP 4: Make the calculation logic dynamic
    const onCalc: SubmitHandler<Fields> = (data) => {
        let totalcredits = 0;
        let numerator = 0;

        data.courses.forEach((course) => {
            if (course.credits) {
                totalcredits += Number(course.credits);
            }
        });

        data.courses.forEach((course) => {
            if (course.credits && course.grade) {
                // DYNAMIC LOOKUP: Find the grade object in the active scale
                const gradeInfo = activeScaleData.find(g => g.grade === course.grade);
                if (gradeInfo) {
                    numerator += Number(course.credits) * gradeInfo.points;
                }
            }
        });

        const titlesSet = new Set();
        const hasDuplicates = data.courses.some((course, index) => {
            const lowerCaseTitle = course.title?.toLowerCase();
            if (lowerCaseTitle && titlesSet.has(lowerCaseTitle)) {
                setError(`courses.${index}.title`, { type: "manual", message: "Duplicate title." });
                toast.error(`Course '${course.title}' was entered multiple times.`, { position: "top-center" });
                return true;
            }
            if (lowerCaseTitle) titlesSet.add(lowerCaseTitle);
            return false;
        });

        if (!hasDuplicates) {
            toggleModal();
            setSGPA((numerator / totalcredits).toFixed(2));
        }
    };

    // ** STEP 5: Make the "add course" logic dynamic
    const addCourse = async () => {
        if (fields.length < 8) {
            // Use the first grade from the active scale as the default
            append({ title: null, credits: 1, grade: activeScaleData[0]?.grade || "" });
        }
        await addanimate([
            [".addbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".addbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const removeCourse = async () => {
        if (fields.length > 1) {
            remove(fields.length - 1);
        }
        await rmanimate([
            [".rmbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".rmbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    // ** STEP 6: Add useEffect to reset the form when the scale changes
    useEffect(() => {
        const firstGrade = gradeScales[selectedScale as keyof typeof gradeScales]?.[0]?.grade || "";
        reset({
            courses: [{ title: null, credits: 1, grade: firstGrade }],
        });
    }, [selectedScale, reset]);
    
    useEffect(() => {
        AOS.init({ easing: "ease", once: true });
    }, []);

    return (
        <div className="relative mt-12 flex h-full w-full justify-center lg:mt-14" style={{ height: "90%", width: "95%", backgroundColor: "transparent" }}>
            <Modal toggle={toggleModal} isOpen={modalIsOpen} gpaType="SGPA" gpa={sgpa} />
            <form onSubmit={handleSubmit(onCalc)} className="flex h-full w-full flex-col items-center">
                
                {/* ** STEP 7: Add the scale selector dropdown UI ** */}
                <div className="mb-8 w-full max-w-sm" data-aos="fade-down">
                    <label htmlFor="grade-scale" className={`block text-white text-lg mb-2 ${poppins.className}`}>
                        Grading Scale
                    </label>
                    <select
                        id="grade-scale"
                        value={selectedScale}
                        onChange={(e) => setSelectedScale(e.target.value)}
                        className="block w-full bg-white rounded-lg p-2 text-center"
                    >
                        {Object.keys(gradeScales).map((scale) => (
                            <option key={scale} value={scale}>
                                {scale} Point Scale
                            </option>
                        ))}
                    </select>
                </div>

                <span className="flex w-full flex-wrap justify-between">
                    <div className="mb-4 max-w-[30%]">
                        {/* COURSE Column */}
                        <h1 className={`ml-1 text-2xl text-white lg:ml-6 lg:text-5xl ${poppins.className}`} data-aos="fade-down">
                            COURSE
                        </h1>
                        {fields.map((field, index) => (
                            <span key={field.id} className="flex flex-row items-center mt-7">
                                <h2 className={`text-xl text-white lg:text-4xl ${spectral.className}`}>
                                    {index + 1}.&nbsp;
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    {...register(`courses.${index}.title` as const, { required: "Please enter course title" })}
                                    className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                />
                            </span>
                        ))}
                    </div>

                    <div className="mb-4 max-w-[30%]">
                        {/* CREDITS Column */}
                        <h1 className={`text-2xl text-white lg:text-5xl ${poppins.className}`} data-aos="fade-down">
                            CREDITS
                        </h1>
                        {fields.map((field, index) => (
                            <span key={field.id} className="relative mt-6 block flex w-full justify-center lg:mt-8">
                                <select
                                    {...register(`courses.${index}.credits` as const, { required: "Please enter course credits" })}
                                    className={`h-8 w-4/5 pl-2 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                >
                                    {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                                </select>
                            </span>
                        ))}
                    </div>

                    <div className="mb-4 max-w-[30%]">
                        {/* GRADE Column */}
                        <h1 className={`text-2xl text-white lg:text-5xl ${poppins.className}`} data-aos="fade-down">
                            GRADE
                        </h1>
                        {/* ** STEP 8: Make grade dropdowns dynamic ** */}
                        {fields.map((field, index) => (
                            <span key={field.id} className="relative mt-6 block flex w-full justify-center lg:mt-8">
                                <select
                                    {...register(`courses.${index}.grade` as const, { required: "Please enter a grade" })}
                                    className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                >
                                    {activeScaleData.map((gradeInfo) => (
                                        <option key={gradeInfo.grade} value={gradeInfo.grade}>
                                            {gradeInfo.grade}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        ))}
                    </div>

                    {/* Buttons Section */}
                    <div className="w-full mt-8 flex justify-center items-center gap-4">
                        <button type="button" onClick={addCourse} className="addbutton ...">Add Course</button>
                        <button type="submit" onClick={handleCalcClick} className="calcbutton ...">Calculate SGPA</button>
                        <button type="button" onClick={removeCourse} className="rmbutton ...">Remove Course</button>
                    </div>
                </span>
                <ToastContainer />
            </form>
        </div>
    );
}