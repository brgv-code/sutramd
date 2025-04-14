CREATE MIGRATION m17sq6i7uczb6kkhvj3jigmdxt35rw7hjeemvvoanwqvfrfpca5feq
    ONTO initial
{
  CREATE FUTURE simple_scoping;
  CREATE TYPE default::Folder {
      CREATE OPTIONAL LINK parent: default::Folder;
      CREATE MULTI LINK subfolders: default::Folder;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::MarkdownFile {
      CREATE OPTIONAL LINK folder: default::Folder;
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  ALTER TYPE default::Folder {
      CREATE MULTI LINK files: default::MarkdownFile;
  };
};
