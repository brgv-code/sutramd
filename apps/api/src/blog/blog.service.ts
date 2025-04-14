// src/blog/blog.service.ts
import { Inject, Injectable } from '@nestjs/common';
import e from '../dbschema/edgeql-js';
import { gel } from '../dbschema/edgeql-js/imports';
import { CreateFileDto } from './dto/create-file.dto';
import { GEL_CLIENT } from '../geldata/gel.constants';
import { CreateFolderDto } from './dto/create-folder.dto';
const fields = {
  id: true,
  title: true,
  content: true,
  created_at: true,
};

@Injectable()
export class BlogService {
  constructor(@Inject(GEL_CLIENT) private readonly gelClient: gel.Client) {}
  async getMarkdownFiles() {
    const query = e.select(e.default.MarkdownFile, () => ({
      ...fields,
    }));
    console.log(query, 'query');
    const result = await query.run(this.gelClient);
    console.log(result, 'result');
    return result;
  }

  async getMarkdownFileById(id: string) {
    const query = e.select(e.default.MarkdownFile, (m) => ({
      ...fields,
      filter_single: e.op(m.id, '=', e.uuid(id)),
    }));
    const result = await query.run(this.gelClient);
    if (result === null) {
      return null;
    }
    return result;
  }

  async createMarkdownFile(markdownFile: CreateFileDto) {
    const query = e.insert(e.default.MarkdownFile, {
      ...markdownFile,
    });
    const result = await query.run(this.gelClient);
    return result;
  }

  async updateMarkdownFile(
    id: string,
    data: { title?: string; content?: string; folderId?: string }
  ) {
    const setFields: any = {};

    if (data.title) setFields.title = data.title;
    if (data.content) setFields.content = data.content;
    if (data.folderId) {
      setFields.folder = e.select(e.default.Folder, (f) => ({
        filter_single: e.op(f.id, '=', e.uuid(data.folderId || '')),
      }));
    }

    const query = e.update(e.default.MarkdownFile, (mf) => ({
      filter_single: e.op(mf.id, '=', e.uuid(id)),
      set: setFields,
    }));

    await query.run(this.gelClient);

    return this.getMarkdownFileById(id);
  }
  async getFolderById(id: string) {
    const query = e.select(e.default.Folder, (f) => ({
      filter_single: e.op(f.id, '=', e.uuid(id)),
    }));
    const result = await query.run(this.gelClient);
    return result;
  }
  async createFolder(folder: CreateFolderDto) {
    const setFields: any = {};
    if (folder.parent) {
      const parent = await this.getFolderById(folder.parent);
      setFields.parent = parent;
    }
    if (folder.files) {
      setFields.files = folder.files.map((id) => e.uuid(id));
    }
    if (folder.subFolders) {
      setFields.subfolders = folder.subFolders.map((id) => e.uuid(id));
    }
    const query = e.insert(e.default.Folder, {
      name: folder.name,
      parent: setFields.parent,
      files: setFields.files,
      subfolders: setFields.subfolders,
    });

    const result = await query.run(this.gelClient);
    return result;
  }

  async deleteMarkdownFile(id: string) {
    const query = e.delete(e.default.MarkdownFile, (m) => ({
      filter_single: e.op(m.id, '=', e.uuid(id)),
    }));
    const result = await query.run(this.gelClient);
    return result;
  }
}
