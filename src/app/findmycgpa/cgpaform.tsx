"use client";
import React from "react";
import GpaForm from "@/components/gpa/form";
import { spectral, lato } from "../fonts";
import "react-toastify/dist/ReactToastify.css";

type CgpaFields = {
    semesters: {
        credits: number | null;
        sgpa: number | null;
    }[];
};

export default function CgpaForm() {
    const defaultValues: CgpaFields = {
        semesters: [
            {
                credits: null,
                sgpa: null,
            },
        ],
    };

    const onCalculate = (data: CgpaFields) => {
        let totalcredits = 0;
        let numerator = 0;

        data.semesters.forEach((sem) => {
            if (sem.credits !== null) {
                totalcredits += sem.credits * 1;
            }
        });

        data.semesters.forEach((sem) => {
            if (sem.credits !== null && sem.sgpa !== null) {
                numerator += sem.credits * sem.sgpa;
            }
        });

        return { result: (numerator / totalcredits).toFixed(2) };
    };

    return (
        <GpaForm<CgpaFields>
            gpaType="CGPA"
            itemName="semester"
            itemNamePlural="semesters"
            defaultValues={defaultValues}
            fieldArrayName="semesters"
            maxItems={8}
            onCalculate={onCalculate}
            columns={[
                {
                    title: "SEMESTER",
                    renderField: (field, index, register, isFirst) => (
                        <span key={index}>
                            <h2
                                className={`text-xl text-center text-white lg:text-4xl ${spectral.className} ${
                                    isFirst ? "mb-5 mt-7 lg:mb-9 lg:mt-9" : "mb-5 lg:mb-8"
                                }`}
                                {...(isFirst && {
                                    "data-aos": "fade-right",
                                    "data-aos-duration": "1800",
                                    "data-aos-delay": "1400",
                                })}
                            >
                                Semester {index + 1}
                            </h2>
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
                                type="submit"
                                className="calcbutton hover:cursor-pointer flex justify-center rounded-full bg-gradient-to-br from-purple-800 to-pink-500 shadow-2xl w-[90%]"
                                onClick={handlers.handleCalcClick}
                            >
                                <span className={` text-sm font-extrabold text-white ${lato.className} p-2 lg:text-lg`}>
                                    Calculate CGPA
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
                            <input
                                {...(isFirst && {
                                    "data-aos": "flip-down",
                                    "data-aos-duration": "2000",
                                    "data-aos-delay": "1400",
                                })}
                                type="number"
                                placeholder="Total credits"
                                min="0"
                                step="1"
                                {...register(`semesters.${index}.credits` as const, {
                                    required: "Please enter semester credits",
                                })}
                                className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                            />
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
                                    className={` text-center text-sm font-extrabold text-white lg:flex lg:flex-row ${lato.className} p-2 lg:text-lg`}
                                >
                                    <p>Add&nbsp;</p>
                                    <p>semester</p>
                                </span>
                            </button>
                        </div>
                    ),
                },
                {
                    title: "SGPA",
                    renderField: (field, index, register, isFirst) => (
                        <span
                            key={index}
                            className={`relative ${isFirst ? "mt-6 lg:mt-8" : "mt-4 lg:mt-8"} flex w-full justify-center`}
                        >
                            <input
                                {...(isFirst && {
                                    "data-aos": "flip-down",
                                    "data-aos-duration": "2000",
                                    "data-aos-delay": "1400",
                                })}
                                type="number"
                                placeholder="SGPA"
                                min="0"
                                max="10"
                                step="0.001"
                                {...register(`semesters.${index}.sgpa` as const, {
                                    required: "Please enter SGPA",
                                })}
                                className={`h-8 w-4/5 lg:h-10 lg:w-full ${spectral.className} relative rounded-xl text-center bg-white`}
                            />
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
                                className="rmbutton hover:cursor-pointer mt-5 flex w-[110%] justify-center rounded-full bg-gradient-to-br from-red-600 from-30% to-rose-500 lg:mt-9"
                                onClick={handlers.removeItem}
                            >
                                <span className={`text-sm font-extrabold text-white ${lato.className} p-2 lg:text-lg`}>
                                    Remove semester
                                </span>
                            </button>
                        </div>
                    ),
                },
            ]}
        />
    );
}
