CREATE MIGRATION m1qyu3etae6v42gl5omvxyui7iukzjk3hepj7o42bkiyn6afinec7q
    ONTO m16mfmcs6pjssgvka5hqu55wcdk357nozku3sqawpk62dnm47a7djq
{
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      default::User {
          id,
          email,
          name,
          userRole
      }
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
