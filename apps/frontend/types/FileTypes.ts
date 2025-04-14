export interface FileItem {
  id: string;
  name: string;
  type: "file";
  content?: string;
}

export interface FolderItem {
  id: string;
  name: string;
  type: "folder";
  children: (FileItem | FolderItem)[];
  isOpen: boolean;
}

export type FileSystemItem = FileItem | FolderItem;
