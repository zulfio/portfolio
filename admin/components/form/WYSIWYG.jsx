import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";

/**
 * A component that renders a WYSIWYG editor.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.id=""] - The ID of the editor container element.
 * @param {string} [props.className=""] - The CSS class name for the editor container element.
 * @returns {JSX.Element} The WYSIWYG component.
 */
function WYSIWYG({ id = "", className = "" }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            return;
        }

        const editor = new EditorJS({
            holder: id,
            tools: {
                header: {
                    class: Header,
                    config: {
                        placeholder: "Enter a header",
                        levels: [1, 2, 3, 4, 5],
                        defaultLevel: 2,
                    },
                    inlineToolbar: true,
                },
            },
        });

        editorRef.current = editor;
    }, [id]);

    return <div id={id} className={className}></div>;
}

export default WYSIWYG;
