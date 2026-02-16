"use client";

import { useEditorState, type Editor } from "@tiptap/react";
import { LuBold, LuList } from "react-icons/lu";

type ToolbarProps = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: ToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      };
    },
  });
  if (!editor) return null;
  return (
    <div className="toolbar-text-editor">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editorState?.isBold
            ? "text-amber-300 cursor-pointer"
            : "cursor-pointer"
        }
      >
        <LuBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editorState?.isBulletList
            ? "text-amber-300 cursor-pointer"
            : "cursor-pointer"
        }
      >
        <LuList />
      </button>
    </div>
  );
}
