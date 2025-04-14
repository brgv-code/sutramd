import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';
import EditorToolbar from './EditorToolbar';

interface MarkdownEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  autosaveIntervalMs?: number;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialContent = '',
  onChange,
  autosaveIntervalMs = 1000,
}) => {
  const [content, setContent] = useState(initialContent);
  const [showPreview, setShowPreview] = useState(false);
  const [showRawMarkdown, setShowRawMarkdown] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState(initialContent);
  const isInitialized = useRef(false);
  const lastSavedContent = useRef(initialContent);
  //TODO: content is not saved once navigating to another page currently there's a timeout,check ASAP.
  //TODO: either push to localstorage or save in db

  const handleSave = async () => {
    console.log('Saving...');
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TaskList,
      TaskItem,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      Markdown.configure({
        html: false,
        tightLists: true,
        bulletListMarker: '-',
        linkify: true,
        breaks: true,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown();
      setContent(markdown);
      setRawMarkdown(markdown);
    },
  });

  useEffect(() => {
    if (editor && initialContent && !isInitialized.current) {
      editor.commands.setContent(initialContent);
      isInitialized.current = true;
    }
  }, [editor, initialContent]);

  useEffect(() => {
    if (editor) {
      editor.setEditable(!showPreview);
    }
  }, [showPreview, editor]);

  useEffect(() => {
    if (
      !autosaveIntervalMs ||
      !onChange ||
      content === lastSavedContent.current
    ) {
      return;
    }

    const timer = setTimeout(() => {
      onChange(content);
      lastSavedContent.current = content;
    }, autosaveIntervalMs);

    return () => clearTimeout(timer);
  }, [content, onChange, autosaveIntervalMs]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <EditorToolbar editor={editor} />
        <div className="flex items-center space-x-2">
          <button onClick={handleSave}>Save</button>

          <button
            onClick={() => {
              const template = `# Template Title

## Section 1
- Point 1
- Point 2

## Section 2
1. First item
2. Second item

## Section 3
- [ ] Task 1
- [ ] Task 2

> A blockquote example

\`\`\`code
// Code example
const hello = "world";
console.log(hello);
\`\`\``;
              editor?.commands.setContent(template);
            }}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Template
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="editor-content">
          <EditorContent editor={editor} />
        </div>
      </div>

      <div className="">
        <button
          onClick={() => setShowRawMarkdown(!showRawMarkdown)}
          className="w-full px-3 py-2 text-sm bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          {showRawMarkdown ? 'Hide Raw Markdown' : 'Show Raw Markdown'}
        </button>
        {showRawMarkdown && (
          <div className=" p-4 bg-gray-800 rounded">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
              {rawMarkdown}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
