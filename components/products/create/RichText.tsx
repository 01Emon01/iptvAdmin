"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./interface/Toolbar";
import { Placeholder } from "@tiptap/extensions";
import { useEffect } from "react";

const Tiptap = ({
  content,
  onChange,
}: {
  content: string;
  onChange?: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
    content,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="rich-editor-wrapper">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
