import React, { useState, useRef } from "react";
import {
  FolderIcon,
  FileIcon,
  PlusIcon,
  FolderPlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "../icons/Icons";
import { FileItem, FolderItem, FileSystemItem } from "../types/FileTypes";

interface FileExplorerProps {
  onFileSelect: (file: FileItem) => void;
  onRenameFile?: (fileId: string, newName: string) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  onFileSelect,
  onRenameFile,
}) => {
  const [renamingItemId, setRenamingItemId] = useState<string | null>(null);
  const [renamingValue, setRenamingValue] = useState<string>("");
  const renameInputRef = useRef<HTMLInputElement>(null);

  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>([
    {
      id: "folder1",
      name: "My Notes",
      type: "folder",
      isOpen: true,
      children: [
        {
          id: "file1",
          name: "Welcome.md",
          type: "file",
          content: "# Welcome to SutraMD\n\nThis is your first note.",
        },
        {
          id: "file2",
          name: "Todo.md",
          type: "file",
          content: "# Todo List\n\n- [ ] First task\n- [x] Completed task",
        },
        {
          id: "folder2",
          name: "Projects",
          type: "folder",
          isOpen: false,
          children: [
            { id: "file3", name: "Project A.md", type: "file" },
            { id: "file4", name: "Project B.md", type: "file" },
          ],
        },
      ],
    },
  ]);

  const toggleFolder = (id: string) => {
    setFileSystem((prev) => {
      const updateItems = (items: FileSystemItem[]): FileSystemItem[] => {
        return items.map((item) => {
          if (item.type === "folder") {
            if (item.id === id) {
              return { ...item, isOpen: !item.isOpen };
            } else if (item.children) {
              return { ...item, children: updateItems(item.children) };
            }
          }
          return item;
        });
      };

      return updateItems(prev);
    });
  };

  const startRenaming = (item: FileSystemItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setRenamingItemId(item.id);
    setRenamingValue(item.name);
    setTimeout(() => {
      if (renameInputRef.current) {
        renameInputRef.current.focus();
        renameInputRef.current.select();
      }
    }, 10);
  };

  const extractTitleFromContent = (content: string): string => {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }
    return "Untitled";
  };

  const displayFileName = (fileName: string): string => {
    return fileName.replace(/\.md$/, "");
  };

  const completeRenaming = () => {
    if (!renamingItemId) {
      setRenamingItemId(null);
      return;
    }

    let newName = renamingValue.trim();

    if (newName === "") {
      const findItem = (items: FileSystemItem[]): FileItem | null => {
        for (const item of items) {
          if (item.id === renamingItemId && item.type === "file") {
            return item;
          } else if (item.type === "folder") {
            const found = findItem(item.children);
            if (found) return found;
          }
        }
        return null;
      };

      const item = findItem(fileSystem);
      if (item && item.content) {
        newName = extractTitleFromContent(item.content);
      } else {
        newName = "Untitled";
      }
    }

    if (newName && !newName.endsWith(".md")) {
      const findItem = (items: FileSystemItem[]): FileSystemItem | null => {
        for (const item of items) {
          if (item.id === renamingItemId) {
            return item;
          } else if (item.type === "folder") {
            const found = findItem(item.children);
            if (found) return found;
          }
        }
        return null;
      };

      const item = findItem(fileSystem);
      if (item && item.type === "file") {
        newName = `${newName}.md`;
      }
    }

    setFileSystem((prev) => {
      const updateItems = (items: FileSystemItem[]): FileSystemItem[] => {
        return items.map((item) => {
          if (item.id === renamingItemId) {
            if (item.type === "file" && onRenameFile) {
              onRenameFile(item.id, newName);
            }
            return { ...item, name: newName };
          } else if (item.type === "folder" && item.children) {
            return { ...item, children: updateItems(item.children) };
          }
          return item;
        });
      };

      return updateItems(prev);
    });

    setRenamingItemId(null);
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      completeRenaming();
    } else if (e.key === "Escape") {
      setRenamingItemId(null);
    }
  };

  const collapseAll = () => {
    setFileSystem((prev) => {
      const collapseItems = (items: FileSystemItem[]): FileSystemItem[] => {
        return items.map((item) => {
          if (item.type === "folder") {
            return {
              ...item,
              isOpen: false,
              children: collapseItems(item.children),
            };
          }
          return item;
        });
      };

      return collapseItems(prev);
    });
  };

  const createNewFile = () => {
    const newFile: FileItem = {
      id: `file${Date.now()}`,
      name: "New Note.md",
      type: "file",
      content: "# New Note\n\nStart writing...",
    };

    setFileSystem((prev) => [...prev, newFile]);
    onFileSelect(newFile);

    startRenaming(newFile);
  };

  const createNewFolder = () => {
    const newFolder: FolderItem = {
      id: `folder${Date.now()}`,
      name: "New Folder",
      type: "folder",
      children: [],
      isOpen: true,
    };

    setFileSystem((prev) => [...prev, newFolder]);

    startRenaming(newFolder);
  };

  const renderItem = (item: FileSystemItem, level = 0) => {
    const paddingLeft = `${level * 16 + 8}px`;
    const isRenaming = item.id === renamingItemId;

    const displayName =
      item.type === "file" ? displayFileName(item.name) : item.name;

    if (item.type === "folder") {
      return (
        <div key={item.id}>
          <div
            className="flex items-center py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded"
            onClick={() => toggleFolder(item.id)}
            onDoubleClick={(e) => startRenaming(item, e)}
            style={{ paddingLeft }}
          >
            <span className="mr-1">
              {item.isOpen ? (
                <ChevronDownIcon className="w-4 h-4" />
              ) : (
                <ChevronRightIcon className="w-4 h-4" />
              )}
            </span>
            <FolderIcon className="w-4 h-4 mr-2" />

            {isRenaming ? (
              <input
                ref={renameInputRef}
                className="bg-white dark:bg-gray-700 text-sm px-1 py-0 rounded w-full"
                value={renamingValue}
                onChange={(e) => setRenamingValue(e.target.value)}
                onBlur={completeRenaming}
                onKeyDown={handleRenameKeyDown}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="text-sm truncate">{displayName}</span>
            )}
          </div>

          {item.isOpen && (
            <div>
              {item.children.map((child) => renderItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={item.id}
          className="flex items-center py-1 px-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer rounded"
          onClick={() => onFileSelect(item)}
          onDoubleClick={(e) => startRenaming(item, e)}
          style={{ paddingLeft }}
        >
          <FileIcon className="w-4 h-4 mr-2" />

          {isRenaming ? (
            <input
              ref={renameInputRef}
              className="bg-white dark:bg-gray-700 text-sm px-1 py-0 rounded w-full"
              value={renamingValue}
              onChange={(e) => setRenamingValue(e.target.value)}
              onBlur={completeRenaming}
              onKeyDown={handleRenameKeyDown}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-sm truncate">{displayName}</span>
          )}
        </div>
      );
    }
  };

  return (
    <div className="file-explorer flex flex-col h-full border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700">
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded mr-1"
          title="New Note"
          onClick={createNewFile}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded mr-1"
          title="New Folder"
          onClick={createNewFolder}
        >
          <FolderPlusIcon className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
          title="Collapse All"
          onClick={collapseAll}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 py-2">
        {fileSystem.map((item) => renderItem(item))}
      </div>
    </div>
  );
};

export default FileExplorer;
