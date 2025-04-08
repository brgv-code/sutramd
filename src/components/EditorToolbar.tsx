import React from "react";
import { Editor } from "@tiptap/react";

type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  isActive,
  disabled,
  children,
  title,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`toolbar-button ${isActive ? "active" : ""} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

type EditorToolbarProps = {
  editor: Editor | null;
};

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const Divider = () => <div className="toolbar-divider" />;

  const applyHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().setHeading({ level }).run();
  };

  const applyBulletList = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const applyOrderedList = () => {
    editor.chain().focus().toggleOrderedList().run();
  };

  const applyTaskList = () => {
    editor.chain().focus().toggleTaskList().run();
  };

  return (
    <div className="editor-toolbar">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold (Ctrl+B)"
      >
        <span className="font-bold">B</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic (Ctrl+I)"
      >
        <span className="italic">I</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <span className="line-through">S</span>
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline (Ctrl+U)"
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={() => applyHeading(1)}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        H1
      </ToolbarButton>

      <ToolbarButton
        onClick={() => applyHeading(2)}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        H2
      </ToolbarButton>

      <ToolbarButton
        onClick={() => applyHeading(3)}
        isActive={editor.isActive("heading", { level: 3 })}
        title="Heading 3"
      >
        H3
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={applyBulletList}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        •
      </ToolbarButton>

      <ToolbarButton
        onClick={applyOrderedList}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        1.
      </ToolbarButton>

      <ToolbarButton
        onClick={applyTaskList}
        isActive={editor.isActive("taskList")}
        title="Task List"
      >
        ☑
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Quote"
      >
        "
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive("codeBlock")}
        title="Code Block"
      >
        &lt;&gt;
      </ToolbarButton>

      <Divider />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        ↩
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        ↪
      </ToolbarButton>
    </div>
  );
};

export default EditorToolbar;
