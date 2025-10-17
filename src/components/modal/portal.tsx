import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const creadeNodeAndAppend = (newDomNode: string) => {
    if (!document) return null;
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", newDomNode);
    document.body.appendChild(newDiv);
    return newDiv;
};

type modalPortalProps = {
    children: React.ReactElement;
    newDomNode: string;
};

export default function Portal(props: modalPortalProps) {
    const [newNode, setNewNode] = useState<HTMLElement>();
    const { children, newDomNode } = props;
    useLayoutEffect(() => {
        let element = document.getElementById(newDomNode);
        let created = false;
        if (!element) {
            created = true;
            element = creadeNodeAndAppend(newDomNode);
        }
        setNewNode(element ?? undefined);

        return () => {
            if (created && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [newDomNode]);

    if (!newNode) return null;
    return createPortal(children, newNode);
}
