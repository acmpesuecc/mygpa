"use client";
import { useForm, SubmitHandler, useFieldArray, UseFormRegister, FieldValues, Path, Control } from "react-hook-form";
import { poppins } from "../../app/fonts";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAnimate } from "motion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Modal from "@/components/modal/modal";

type FieldArrayItem = Record<string, unknown> & { id: string };

interface ColumnConfig<T extends FieldValues> {
    title: string;
    headerAosDelay?: string;
    renderField: (field: FieldArrayItem, index: number, register: UseFormRegister<T>, isFirst: boolean) => ReactNode;
    renderButton?: (
        ref: ReturnType<typeof useAnimate>[0],
        handlers: {
            handleCalcClick?: () => Promise<void>;
            addItem?: () => Promise<void>;
            removeItem?: () => Promise<void>;
        },
    ) => ReactNode;
}

interface GpaFormProps<T extends FieldValues> {
    gpaType: "CGPA" | "SGPA";
    itemName: string;
    itemNamePlural: string;
    defaultValues: T;
    fieldArrayName: string;
    columns: ColumnConfig<T>[];
    onCalculate: (data: T) => { result: string; error?: { index: number; message: string } };
    maxItems?: number;
}

export default function GpaForm<T extends FieldValues>({
    gpaType,
    defaultValues,
    fieldArrayName,
    columns,
    onCalculate,
    maxItems = 8,
}: GpaFormProps<T>) {
    const itemRef = useRef<HTMLSpanElement>(null);
    const [calcscope, calcanimate] = useAnimate();
    const [addscope, addanimate] = useAnimate();
    const [rmscope, rmanimate] = useAnimate();

    // Call useAutoAnimate at the top level for each column

    // 3 separate refs (columnRef0, columnRef1, columnRef2) are to allow independent auto-animations for each column’s content when items are added or removed.
    const [columnRef0] = useAutoAnimate<HTMLDivElement>();
    const [columnRef1] = useAutoAnimate<HTMLDivElement>();
    const [columnRef2] = useAutoAnimate<HTMLDivElement>();

    type FormData = Record<string, unknown>;
    const { register, handleSubmit, control, setError } = useForm<FormData>({
        defaultValues: defaultValues as FormData,
    });

    const [itemNumber, setItemNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [gpaResult, setGpaResult] = useState("");
    const { fields, append, remove } = useFieldArray({
        control: control as unknown as Control<T>,
        name: fieldArrayName as unknown as never,
    });

    const handleCalcClick = async () => {
        await calcanimate([
            [".calcbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".calcbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const addItem = async () => {
        if (fields.length < maxItems) {
            const defaultItem = (defaultValues as Record<string, unknown>)[fieldArrayName];
            const itemToAppend = Array.isArray(defaultItem) ? defaultItem[0] : {};
            (append as (value: unknown) => void)(itemToAppend);
            setItemNumber(itemNumber + 1);
        }
        await addanimate([
            [".addbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".addbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const removeItem = async () => {
        if (fields.length > 1) {
            remove(fields.length - 1);
            setItemNumber(itemNumber - 1);
        }
        await rmanimate([
            [".rmbutton", { scale: 0.9 }, { duration: 0.2 }],
            [".rmbutton", { scale: 1 }, { duration: 0.2 }],
        ]);
    };

    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };

    const onCalc: SubmitHandler<FormData> = (data: FormData) => {
        const result = onCalculate(data as T);

        if (result.error) {
            const errorPath = `${fieldArrayName}.${result.error.index}.title`;
            setError(errorPath as Path<FormData>, {
                type: "manual",
                message: result.error.message,
            });
            return;
        }

        toggleModal();
        setGpaResult(result.result);
    };

    useEffect(() => {
        AOS.init({
            easing: "ease",
            once: true,
        });
    }, []);

    const handlers = { handleCalcClick, addItem, removeItem };
    const columnRefs = [columnRef0, columnRef1, columnRef2];

    return (
        <div
            className="relative mt-12 flex h-full w-full justify-center lg:mt-14"
            style={{
                height: "90%",
                width: "95%",
                backgroundColor: "transparent",
            }}
        >
            <Modal toggle={toggleModal} isOpen={modalIsOpen} gpaType={gpaType} gpa={gpaResult} />
            <form onSubmit={handleSubmit(onCalc)} className="flex h-full w-full justify-center">
                <span className="flex w-full flex-wrap justify-between">
                    {columns.map((column, colIndex) => {
                        const columnRef = columnRefs[colIndex]!;
                        const isFirstColumn = colIndex === 0;
                        const isLastColumn = colIndex === columns.length - 1;

                        return (
                            <div key={colIndex} ref={columnRef} className={`mb-4 ${isFirstColumn ? "" : "max-w-[30%]"}`}>
                                <span className={isFirstColumn ? "" : "flex justify-center"} ref={itemRef}>
                                    <h1
                                        className={`${isFirstColumn ? "" : ""} text-2xl text-white lg:text-5xl ${
                                            poppins.className
                                        } ${isFirstColumn && gpaType === "SGPA" ? "ml-1 lg:ml-6" : ""}`}
                                        data-aos="fade-down"
                                        data-aos-duration="1800"
                                    >
                                        {column.title}
                                    </h1>
                                </span>

                                {fields[0] &&
                                    column.renderField(
                                        fields[0] as FieldArrayItem,
                                        0,
                                        register as unknown as UseFormRegister<T>,
                                        true,
                                    )}
                                {fields
                                    .slice(1, itemNumber)
                                    .map((field, index) =>
                                        column.renderField(
                                            field as FieldArrayItem,
                                            index + 1,
                                            register as unknown as UseFormRegister<T>,
                                            false,
                                        ),
                                    )}

                                {column.renderButton &&
                                    column.renderButton(
                                        isFirstColumn ? calcscope : isLastColumn ? rmscope : addscope,
                                        handlers,
                                    )}
                            </div>
                        );
                    })}
                </span>
            </form>
        </div>
    );
}
