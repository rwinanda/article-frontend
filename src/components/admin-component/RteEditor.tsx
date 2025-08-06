"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
// import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align'
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

import {
    FaBold,
    FaItalic
} from "react-icons/fa";
// import { Dispatch, SetStateAction, useEffect } from "react";
// import { ArticlePayload } from "@/types/articleTypes";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

// interface Props {
//     articleForm: ArticlePayload
//     setArticleForm: Dispatch<SetStateAction<ArticlePayload>>
// }

const RteEditor = (
    // { articleForm, setArticleForm }: Props
) => {
    const { setValue, watch } = useFormContext();
    const content = watch("content");
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: {
                    HTMLAttributes: {
                        class: 'mb-4',
                    },
                },
            }),
            Underline,
            TextAlign.configure({ types: ['heading', 'paragraph'] })
            // Placeholder.configure({
            //     placeholder: 'Type a content...',
            // })
        ],
        content: content || "",
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[550px]",
            },
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const data = editor.getHTML();
            setValue("content", data);

            // setArticleForm((prev) => ({
            //     ...prev,
            //     content: data
            // }));
        },
    });

    // Optional: update editor content when `content` changes externally
    useEffect(() => {
        if (editor && content && editor.getHTML() !== content) {
            editor.commands.setContent(content);
        }
    }, [editor, content]);

    if (!editor) {
        return null;
    }

    // useEffect(() => {
    //     if (editor && articleForm.content) {
    //         editor.commands.setContent(articleForm.content);
    //     }
    // }, [editor, articleForm.content]);

    return (
        <>
            <div className="flex mt-6">
                <div className="flex flex-col w-full border-1 border-slate-200 rounded-lg">
                    <div className="flex space-x-2 my-2 mx-2">
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-2 cursor-pointer hover:bg-gray-300 ${editor.isActive("bold") ? "bg-gray-300" : ""}`}
                        >
                            <FaBold />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-2 cursor-pointer hover:bg-gray-300 ${editor.isActive("italic") ? "bg-gray-300" : ""
                                }`}
                        >
                            <FaItalic />
                        </button>
                        <div className="flex gap-2" data-orientation="horizontal">
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                className={`p-2 hover:bg-gray-100 ${editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : 'text-gray-700'}`}
                            >
                                <AlignLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                className={`p-2 hover:bg-gray-100 ${editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : 'text-gray-700'}`}
                            >
                                <AlignCenter className="w-4 h-4" />

                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                className={`p-2 hover:bg-gray-100 ${editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : 'text-gray-700'}`}
                            >
                                <AlignRight className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                                className={`p-2 hover:bg-gray-100 ${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500' : 'text-gray-700'}`}
                            >
                                <AlignJustify className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <EditorContent editor={editor} className="border-t-1 border-slate-200 p-2" />
                    {/* <button
                        onClick={saveContent}
                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button> */}
                </div>
            </div>
        </>
    );
};

export default RteEditor;