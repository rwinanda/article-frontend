'use client'; // For App Router or dynamic import for SSR safety

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { useState } from 'react';

export default function TextEditor() {
    const [wordCount, setWordCount] = useState(0);

    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: '',
        onUpdate: ({ editor }) => {
            setWordCount(editor.storage.characterCount.words());
        },
    });

    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('Enter image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="w-full mx-auto mt-6 p-4 border rounded bg-white shadow">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
                <button onClick={() => editor.chain().focus().undo().run()}>↶</button>
                <button onClick={() => editor.chain().focus().redo().run()}>↷</button>
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'font-bold' : ''}>B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'italic' : ''}>I</button>
                <button onClick={addImage}>🖼️</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="w-full h-[500px] overflow-y-auto p-4 outline-none bg-gray-50 rounded px-4"
                placeholder='Type a content....'
            />

            {/* Word Count */}
            <div className="mt-2 text-sm text-gray-600">{wordCount} Words</div>
        </div>
    );
}
