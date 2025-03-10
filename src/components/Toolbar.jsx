"use client";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";

const Toolbar = ({ editor, content }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full bg-[#1E1E1E] border border-[#262626]">
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap">
        {/* Bold */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Bold className="w-5 h-5"></Bold>
        </button>

        {/* Italic */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Italic className="w-5 h-5"></Italic>
        </button>

        {/* Underline */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Underline className="w-5 h-5"></Underline>
        </button>

        {/* Strikethrough */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Strikethrough className="w-5 h-5"></Strikethrough>
        </button>

        {/* Heading 2 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Heading2 className="w-5 h-5"></Heading2>
        </button>

        {/* Bullet List */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <List className="w-5 h-5"></List>
        </button>

        {/* Ordered List */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <ListOrdered className="w-5 h-5"></ListOrdered>
        </button>

        {/* Blockquote */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Quote className="w-5 h-5"></Quote>
        </button>

        {/* Code */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Code className="w-5 h-5"></Code>
        </button>

        {/* Undo */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className="text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
        >
          <Undo className="w-5 h-5"></Undo>
        </button>

        {/* Redo */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className="text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
        >
          <Redo className="w-5 h-5"></Redo>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
