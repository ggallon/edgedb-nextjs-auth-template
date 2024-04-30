CREATE MIGRATION m1hdppjlftdp6s2gjbyi6oev3nmqgl53babqbb45isdncegn6xbnoq
    ONTO m1qyu3etae6v42gl5omvxyui7iukzjk3hepj7o42bkiyn6afinec7q
{
  ALTER TYPE default::User {
      ALTER PROPERTY userRole {
          SET default := (default::Role.user);
      };
  };
};
