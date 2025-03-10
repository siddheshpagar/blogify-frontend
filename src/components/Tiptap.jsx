"use client"

import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Toolbar from "./Toolbar"
import Underline from "@tiptap/extension-underline"

const Tiptap = ({ content, onChange }) => {

    const handleChange = (newContent) => {
        onChange(newContent);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
        ],
        content,
        editorProps: {
            attributes: {
                class:
                    "flex flex-col px-4 py-3 justify-start border border-[#262626] text-white focus:border-white bg-[#1E1E1E] items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
            },

        },
        onUpdate: ({ editor }) => {
            handleChange(editor.getHTML());
        },
    })
    return (
        <div className="">
            <Toolbar editor={editor} content={content} />
            <EditorContent 
            style={{
                whiteSpace: "pre-line",
                wordBreak: "break-word", // Break words to the next line
              }}
             editor={editor} />
        </div>)
}

export default Tiptap