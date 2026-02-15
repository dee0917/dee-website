import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import {
    Bold, Italic, List, ListOrdered, Quote,
    Heading1, Heading2, Link as LinkIcon, Image as ImageIcon,
    Undo, Redo
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const MenuButton = ({
    onClick,
    isActive,
    children
}: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`p-2 rounded hover:bg-white/10 transition-colors ${isActive ? 'bg-google-blue text-white' : 'text-zinc-400'
            }`}
    >
        {children}
    </button>
);

const RichTextEditor = ({ content, onChange, placeholder = '開始撰寫文章...' }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt('輸入連結網址:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('輸入圖片網址:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#111]">
            {/* 工具列 */}
            <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-[#0a0a0a]">
                <MenuButton onClick={() => editor.chain().focus().undo().run()}>
                    <Undo size={18} />
                </MenuButton>
                <MenuButton onClick={() => editor.chain().focus().redo().run()}>
                    <Redo size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                >
                    <Heading1 size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                >
                    <Heading2 size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                >
                    <Bold size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                >
                    <Italic size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                >
                    <List size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                >
                    <ListOrdered size={18} />
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                >
                    <Quote size={18} />
                </MenuButton>

                <div className="w-px h-6 bg-white/10 mx-1 self-center" />

                <MenuButton onClick={addLink} isActive={editor.isActive('link')}>
                    <LinkIcon size={18} />
                </MenuButton>
                <MenuButton onClick={addImage}>
                    <ImageIcon size={18} />
                </MenuButton>
            </div>

            {/* 編輯區域 */}
            <EditorContent
                editor={editor}
                className="prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none
                    [&_.ProseMirror]:outline-none
                    [&_.ProseMirror_p]:my-3
                    [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h1]:text-white
                    [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h2]:text-white
                    [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6
                    [&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6
                    [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-google-blue [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:italic
                    [&_.ProseMirror_a]:text-google-blue [&_.ProseMirror_a]:underline
                    [&_.ProseMirror_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_.is-editor-empty:first-child::before]:text-zinc-600 [&_.ProseMirror_.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_.is-editor-empty:first-child::before]:pointer-events-none
                "
            />
        </div>
    );
};

export default RichTextEditor;
