export class CreateFolderDto {
  name: string;
  parent?: string;
  files?: string[];
  subFolders?: string[];
}
