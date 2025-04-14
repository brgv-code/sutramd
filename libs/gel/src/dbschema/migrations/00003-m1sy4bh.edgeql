CREATE MIGRATION m1sy4bhh5vsjc3ajvpdzxcriulifopu2qxcpsujlq2l6dbxriqrwvq
    ONTO m15ztwijjrudun3ug42fubdotz3eum27zcmpbpq5byyyuofo4z753a
{
  CREATE TYPE default::User {
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY password: std::str;
  };
};
