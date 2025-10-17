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

type Fields = {
    courses: {
        title: string | null;
        credits: number;
        grade: string;
    }[];
};

export default function SgpaForm() {
    const courseRef = useRef<HTMLSpanElement>(null);
    const [calcscope, calcanimate] = useAnimate();
    const [addscope, addanimate] = useAnimate();
    const [rmscope, rmanimate] = useAnimate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [sgpa, setSGPA] = useState("");
    const handleCalcClick = async () => {
        await calcanimate([
            [".calcbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".calcbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const gradeObjects: Record<string, number> = {
        S: 10,
        A: 9,
        B: 8,
        C: 7,
        D: 6,
        E: 5,
        F: 0,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setError,
        setValue,
        watch,
        reset,
    } = useForm<Fields>({
        defaultValues: {
            courses: [
                {
                    title: null,
                    credits: 1,
                    grade: Object.keys(gradeObjects)[0],
                },
            ],
        },
    });

    const formValues = watch();

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const onCalc: SubmitHandler<Fields> = (data) => {
        let totalcredits = 0;
        let numerator = 0;

        data.courses.map((course) => {
            if (course.credits !== null) {
                totalcredits += course.credits * 1;
            }
        });
        data.courses.forEach((course) => {
            if (course.credits && course.grade && gradeObjects?.[course.grade]) {
                numerator += course.credits * (gradeObjects[course.grade] ?? 0);
            }
        });

        const titlesSet = new Set();

        const hasDuplicates = data.courses.some((course, index) => {
            const { title } = course;
            const lowerCaseTitle = title?.toLowerCase();
            if (lowerCaseTitle && titlesSet.has(lowerCaseTitle)) {
                setError(`courses.${index}.title`, {
                    type: "manual",
                    message: "Duplicate title found. Please fix before submitting.",
                });

                toast.error(`Course '${title}' was entered multiple times. Please change before submitting.`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    className: `w-3/4 h-24 lg:h-32 lg:w-96 mx-auto text-md lg:text-2xl rounded-full ${spectral.className} `,
                });
                return true;
            }
            titlesSet.add(lowerCaseTitle);

            return false;
        });

        if (!hasDuplicates) {
            toggleModal();
            console.log((numerator / totalcredits).toFixed(2));

            setSGPA((numerator / totalcredits).toFixed(2));
            return;
        } else {
            return;
        }
    };

    const [courseNumber, setCourseNumber] = useState(1);
    const [courseTitles] = useAutoAnimate<HTMLDivElement>();
    const [creditsFields] = useAutoAnimate<HTMLDivElement>();
    const [gradeFields] = useAutoAnimate<HTMLDivElement>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "courses",
    });

    const addCourse = async () => {
        if (fields.length < 8) {
            append({ title: null, credits: 1, grade: Object.keys(gradeObjects)[0]! });
            setCourseNumber(courseNumber + 1);
        }
        await addanimate([
            [".addbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".addbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const removeCourse = async () => {
        if (fields.length > 1) {
            remove(fields.length - 1);
            setCourseNumber(courseNumber - 1);
        }
        await rmanimate([
            [".rmbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".rmbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    useEffect(() => {
        if (typeof window === "undefined") return;
        const savedData = localStorage.getItem("sgpaFormData");
        const savedCourseCount = localStorage.getItem("sgpaCourseCount");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                if (parsed && Array.isArray(parsed.courses)) {
                    reset({ courses: parsed.courses });
                    setCourseNumber(parsed.courses.length);
                }
            } catch {}
        } else if (savedCourseCount) {
            setCourseNumber(parseInt(savedCourseCount));
        }
    }, [reset]);

    // Save SGPA form data to localStorage
    useEffect(() => {
        if (formValues.courses && formValues.courses.length > 0) {
            localStorage.setItem("sgpaFormData", JSON.stringify(formValues));
            localStorage.setItem("sgpaCourseCount", courseNumber.toString());
        }
    }, [formValues, courseNumber]);

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
            <Modal toggle={toggleModal} isOpen={modalIsOpen} gpaType="SGPA" gpa={sgpa} />
            <form onSubmit={handleSubmit(onCalc)} className="flex h-full w-full justify-center">
                <span className="flex w-full flex-wrap justify-between">
                    <div ref={courseTitles} className="mb-4 max-w-[30%] ">
                        <span ref={courseRef}>
                            <h1
                                className={`ml-1 text-2xl text-white lg:ml-6 lg:text-5xl ${poppins.className}`}
                                data-aos="fade-down"
                                data-aos-duration="1800"
                            >
                                COURSE
                            </h1>
                        </span>
                        <span ref={courseRef} className="flex flex-row items-center">
                            <h2
                                className={`text-xl text-white lg:text-4xl ${spectral.className} mb-5 mt-7 lg:mb-8 lg:mt-8`}
                                data-aos="fade-right"
                                data-aos-duration="1800"
                                data-aos-delay="600"
                            >
                                1.&nbsp;
                            </h2>
                            <input
                                data-aos="flip-down"
                                data-aos-duration="2000"
                                data-aos-delay="1400"
                                type="text"
                                placeholder="Title"
                                {...register(`courses.0.title` as const, {
                                    required: "Please enter course title",
                                })}
                                className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative mb-3 mt-4 rounded-xl text-center lg:my-6 bg-white`}
                            />
                        </span>

                        {fields.slice(1, courseNumber).map((semester, index: number) => (
                            <span key={index} className="flex flex-row justify-center">
                                <h2 className={`text-xl text-white lg:text-4xl ${spectral.className} mb-5 lg:mb-8`} key={index}>
                                    {index + 2}.&nbsp;
                                </h2>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    {...register(`courses.${index + 1}.title` as const, {
                                        required: "Please enter course credits",
                                    })}
                                    className={`relative h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} -mt-[0.2rem] rounded-xl text-center lg:mt-0 bg-white`}
                                />
                            </span>
                        ))}
                        <div data-aos="fade-right" data-aos-duration="1400" data-aos-delay="2400" ref={calcscope}>
                            <button
                                className="calcbutton hover:cursor-pointer mx-auto flex w-[95%] justify-center rounded-full bg-gradient-to-br from-purple-800 to-pink-500 shadow-2xl lg:w-[85%]"
                                onClick={handleCalcClick}
                                type="submit"
                            >
                                <span
                                    className={` text-sm font-extrabold text-white ${lato.className} px-5 py-2 lg:p-2 lg:text-lg`}
                                >
                                    Calculate SGPA
                                </span>
                            </button>
                        </div>

                        <ToastContainer />
                    </div>
                    <div ref={creditsFields} className="mb-4 max-w-[30%]">
                        <span className="flex justify-center" ref={courseRef}>
                            <h1
                                className={`text-2xl text-white lg:text-5xl ${poppins.className}`}
                                data-aos="fade-down"
                                data-aos-duration="1800"
                            >
                                CREDITS
                            </h1>
                        </span>
                        <span className="relative mt-6 block flex w-full justify-center lg:mt-8" ref={courseRef}>
                            <select
                                data-aos="flip-down"
                                data-aos-duration="2000"
                                data-aos-delay="1400"
                                {...register(`courses.0.credits` as const, {
                                    required: "Please enter course credits",
                                })}
                                className={`h-8 w-4/5 pl-2 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </span>
                        {fields.slice(1, courseNumber).map((course, index) => (
                            <span key={index + 1} className="relative mt-4 block flex w-full justify-center lg:mt-8">
                                <select
                                    {...register(`courses.${index + 1}.credits` as const, {
                                        required: "Please enter course credits",
                                    })}
                                    className={`relative h-8 w-4/5 pl-2 lg:h-10 lg:w-full ${spectral.className} rounded-xl text-center bg-white`}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </span>
                        ))}
                        <div data-aos="fade-up" data-aos-duration="1400" data-aos-delay="2400" ref={addscope}>
                            <button
                                onClick={addCourse}
                                className="addbutton hover:cursor-pointer mt-5 flex w-full justify-center rounded-full bg-gradient-to-br from-cyan-600 from-20% to-green-400 lg:mt-9"
                            >
                                <span
                                    className={` text-center text-sm font-extrabold text-white lg:flex lg:flex-row ${lato.className} px-8 py-2 lg:px-0 lg:text-lg`}
                                >
                                    <p> Add&nbsp;</p>
                                    <p>course</p>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div ref={gradeFields} className="mb-4 max-w-[30%]">
                        <span className="flex justify-center" ref={courseRef}>
                            <h1
                                className={`text-2xl text-white lg:text-5xl ${poppins.className}`}
                                data-aos="fade-down"
                                data-aos-duration="1800"
                            >
                                GRADE
                            </h1>
                        </span>
                        <span ref={courseRef} className="relative mt-6 block flex w-full justify-center lg:mt-8">
                            <select
                                data-aos="flip-down"
                                data-aos-duration="2000"
                                data-aos-delay="1400"
                                {...register("courses.0.grade" as const, {
                                    required: "Please enter a grade",
                                })}
                                className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                            >
                                {Object.keys(gradeObjects).map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                        </span>
                        {fields.slice(1, courseNumber).map((course, index) => (
                            <span key={index + 1} className="relative mt-4 block flex w-full justify-center lg:mt-8">
                                <select
                                    {...register(`courses.${index + 1}.grade` as const, {
                                        required: "Please enter a grade",
                                    })}
                                    className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                >
                                    {Object.keys(gradeObjects).map((grade) => (
                                        <option key={grade} value={grade}>
                                            {grade}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        ))}
                        <div data-aos="fade-left" data-aos-duration="1400" data-aos-delay="2400" ref={rmscope}>
                            <button
                                onClick={removeCourse}
                                className="rmbutton hover:cursor-pointer mt-5 flex w-full justify-center rounded-full bg-gradient-to-br from-red-600 from-30% to-rose-500  lg:mt-9"
                            >
                                <span
                                    className={` px-5 py-2 text-center text-sm font-extrabold text-white lg:p-2 ${lato.className} lg:text-lg`}
                                >
                                    Remove course
                                </span>
                            </button>
                        </div>
                    </div>
                </span>
            </form>
        </div>
    );
}
