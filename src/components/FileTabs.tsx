import React from "react";
import { XMarkIcon } from "../icons/Icons";
import { FileItem } from "../types/FileTypes";

const displayFileName = (fileName: string): string => {
  return fileName.replace(/\.md$/, "");
};

interface FileTabsProps {
  openFiles: FileItem[];
  activeFileId: string | null;
  onSelectFile: (fileId: string) => void;
  onCloseFile: (fileId: string) => void;
}

const FileTabs: React.FC<FileTabsProps> = ({
  openFiles,
  activeFileId,
  onSelectFile,
  onCloseFile,
}) => {
  if (openFiles.length === 0) {
    return (
      <div className="flex h-9 items-center px-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          No files open
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-9 items-center border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 overflow-x-auto">
      {openFiles.map((file) => (
        <div
          key={file.id}
          className={`file-tab flex items-center h-full px-3 border-r border-gray-200 dark:border-gray-700 min-w-0 max-w-[200px] ${
            activeFileId === file.id
              ? "bg-white dark:bg-gray-800"
              : "bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <button
            className="flex-1 truncate text-sm text-left"
            onClick={() => onSelectFile(file.id)}
          >
            {displayFileName(file.name)}
          </button>
          <button
            className="close-button ml-2 p-0.5 rounded hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              onCloseFile(file.id);
            }}
          >
            <XMarkIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileTabs;
