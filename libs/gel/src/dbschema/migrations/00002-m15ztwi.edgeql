CREATE MIGRATION m15ztwijjrudun3ug42fubdotz3eum27zcmpbpq5byyyuofo4z753a
    ONTO m17sq6i7uczb6kkhvj3jigmdxt35rw7hjeemvvoanwqvfrfpca5feq
{
  CREATE ABSTRACT TYPE default::FileSystemNode {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Folder EXTENDING default::FileSystemNode LAST;
  ALTER TYPE default::MarkdownFile EXTENDING default::FileSystemNode LAST;
};
