import React, { useState, useEffect } from "react";
import FileExplorer from "./FileExplorer";
import FileTabs from "./FileTabs";
import { MarkdownEditor } from "./MarkdownEditor";
import { FileItem } from "../types/FileTypes";

const AppLayout: React.FC = () => {
  const [openFiles, setOpenFiles] = useState<FileItem[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  const activeFile = openFiles.find((file) => file.id === activeFileId);
  const handleFileSelect = (file: FileItem) => {
    if (!openFiles.some((f) => f.id === file.id)) {
      setOpenFiles((prev) => [...prev, file]);
    }

    setActiveFileId(file.id);
  };

  const handleFileRename = (fileId: string, newName: string) => {
    setOpenFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, name: newName } : file
      )
    );
  };

  const handleFileChange = (content: string) => {
    console.log(content, "content");
    if (activeFileId) {
      setOpenFiles((prev) =>
        prev.map((file) =>
          file.id === activeFileId ? { ...file, content } : file
        )
      );
    }
  };

  const handleCloseFile = (fileId: string) => {
    setOpenFiles((prev) => prev.filter((file) => file.id !== fileId));

    if (fileId === activeFileId) {
      const remainingFiles = openFiles.filter((file) => file.id !== fileId);
      if (remainingFiles.length > 0) {
        setActiveFileId(remainingFiles[remainingFiles.length - 1].id);
      } else {
        setActiveFileId(null);
      }
    }
  };

  useEffect(() => {
    const welcomeFile: FileItem = {
      id: "file1",
      name: "Welcome.md",
      type: "file",
      content: "# Welcome to SutraMD\n\nThis is your first note.",
    };

    setOpenFiles([welcomeFile]);
    setActiveFileId(welcomeFile.id);
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-64 h-full flex-shrink-0 bg-gray-50 dark:bg-gray-950">
        <FileExplorer
          onFileSelect={handleFileSelect}
          onRenameFile={handleFileRename}
        />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <FileTabs
          openFiles={openFiles}
          activeFileId={activeFileId}
          onSelectFile={setActiveFileId}
          onCloseFile={handleCloseFile}
        />

        <div className="flex-1 overflow-hidden">
          {activeFile ? (
            <MarkdownEditor
              key={activeFileId}
              initialContent={activeFile.content || ""}
              onChange={handleFileChange}
              autosaveIntervalMs={3000}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p>
                No file selected. Open a file from the sidebar or create a new
                one.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
