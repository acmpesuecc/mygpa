"use client";
import React from "react";
import GpaForm from "@/components/gpa/form";
import { spectral, lato } from "@/app/fonts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SgpaFields = {
    courses: {
        title: string | null;
        credits: number;
        grade: string;
    }[];
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

export default function SgpaForm() {
    const defaultValues: SgpaFields = {
        courses: [
            {
                title: null,
                credits: 1,
                grade: Object.keys(gradeObjects)[0]!,
            },
        ],
    };

    const onCalculate = (data: SgpaFields) => {
        let totalcredits = 0;
        let numerator = 0;

        data.courses.forEach((course) => {
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
        let duplicateError: { index: number; message: string } | undefined;

        const hasDuplicates = data.courses.some((course, index) => {
            const { title } = course;
            const lowerCaseTitle = title?.toLowerCase();
            if (lowerCaseTitle && titlesSet.has(lowerCaseTitle)) {
                duplicateError = {
                    index,
                    message: "Duplicate title found. Please fix before submitting.",
                };

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

        if (hasDuplicates && duplicateError) {
            return { result: "0", error: duplicateError };
        }

        return { result: (numerator / totalcredits).toFixed(2) };
    };

    return (
        <>
            <GpaForm<SgpaFields>
                gpaType="SGPA"
                itemName="course"
                itemNamePlural="courses"
                defaultValues={defaultValues}
                fieldArrayName="courses"
                maxItems={8}
                onCalculate={onCalculate}
                columns={[
                    {
                        title: "COURSE",
                        renderField: (field, index, register, isFirst) => (
                            <span key={index} className="flex flex-row items-center">
                                <h2
                                    className={`text-xl text-white lg:text-4xl ${spectral.className} ${
                                        isFirst ? "mb-5 mt-7 lg:mb-8 lg:mt-8" : "mb-5 lg:mb-8"
                                    }`}
                                    {...(isFirst && {
                                        "data-aos": "fade-right",
                                        "data-aos-duration": "1800",
                                        "data-aos-delay": "600",
                                    })}
                                >
                                    {index + 1}.&nbsp;
                                </h2>
                                <input
                                    {...(isFirst && {
                                        "data-aos": "flip-down",
                                        "data-aos-duration": "2000",
                                        "data-aos-delay": "1400",
                                    })}
                                    type="text"
                                    placeholder="Title"
                                    {...register(`courses.${index}.title` as const, {
                                        required: "Please enter course title",
                                    })}
                                    className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative ${
                                        isFirst ? "mb-3 mt-4 lg:my-6" : "-mt-[0.2rem] lg:mt-0"
                                    } rounded-xl text-center bg-white`}
                                />
                            </span>
                        ),
                        renderButton: (ref, handlers) => (
                            <div
                                data-aos="fade-right"
                                data-aos-duration="1400"
                                data-aos-delay="2400"
                                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                            >
                                <button
                                    className="calcbutton hover:cursor-pointer mx-auto flex w-[95%] justify-center rounded-full bg-gradient-to-br from-purple-800 to-pink-500 shadow-2xl lg:w-[85%]"
                                    type="submit"
                                    onClick={handlers.handleCalcClick}
                                >
                                    <span
                                        className={` text-sm font-extrabold text-white ${lato.className} px-5 py-2 lg:p-2 lg:text-lg`}
                                    >
                                        Calculate SGPA
                                    </span>
                                </button>
                            </div>
                        ),
                    },
                    {
                        title: "CREDITS",
                        renderField: (field, index, register, isFirst) => (
                            <span
                                key={index}
                                className={`relative ${isFirst ? "mt-6 lg:mt-8" : "mt-4 lg:mt-8"} flex w-full justify-center`}
                            >
                                <select
                                    {...(isFirst && {
                                        "data-aos": "flip-down",
                                        "data-aos-duration": "2000",
                                        "data-aos-delay": "1400",
                                    })}
                                    {...register(`courses.${index}.credits` as const, {
                                        required: "Please enter course credits",
                                    })}
                                    className={`h-8 w-4/5 pl-2 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((credit) => (
                                        <option key={credit} value={credit}>
                                            {credit}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        ),
                        renderButton: (ref, handlers) => (
                            <div
                                data-aos="fade-up"
                                data-aos-duration="1400"
                                data-aos-delay="2400"
                                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                            >
                                <button
                                    type="button"
                                    className="addbutton hover:cursor-pointer mt-5 flex w-full justify-center rounded-full bg-gradient-to-br from-cyan-600 from-20% to-green-400 lg:mt-9"
                                    onClick={handlers.addItem}
                                >
                                    <span
                                        className={` text-center text-sm font-extrabold text-white lg:flex lg:flex-row ${lato.className} px-8 py-2 lg:px-0 lg:text-lg`}
                                    >
                                        <p> Add&nbsp;</p>
                                        <p>course</p>
                                    </span>
                                </button>
                            </div>
                        ),
                    },
                    {
                        title: "GRADE",
                        renderField: (field, index, register, isFirst) => (
                            <span
                                key={index}
                                className={`relative ${isFirst ? "mt-6 lg:mt-8" : "mt-4 lg:mt-8"} flex w-full justify-center`}
                            >
                                <select
                                    {...(isFirst && {
                                        "data-aos": "flip-down",
                                        "data-aos-duration": "2000",
                                        "data-aos-delay": "1400",
                                    })}
                                    {...register(`courses.${index}.grade` as const, {
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
                        ),
                        renderButton: (ref, handlers) => (
                            <div
                                data-aos="fade-left"
                                data-aos-duration="1400"
                                data-aos-delay="2400"
                                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                            >
                                <button
                                    type="button"
                                    className="rmbutton hover:cursor-pointer mt-5 flex w-full justify-center rounded-full bg-gradient-to-br from-red-600 from-30% to-rose-500  lg:mt-9"
                                    onClick={handlers.removeItem}
                                >
                                    <span
                                        className={` px-5 py-2 text-center text-sm font-extrabold text-white lg:p-2 ${lato.className} lg:text-lg`}
                                    >
                                        Remove course
                                    </span>
                                </button>
                            </div>
                        ),
                    },
                ]}
            />
            <ToastContainer />
        </>
    );
}
