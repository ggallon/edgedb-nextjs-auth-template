CREATE MIGRATION m16mfmcs6pjssgvka5hqu55wcdk357nozku3sqawpk62dnm47a7djq
    ONTO m1x45xkh6f6etaul2exzk5hvgfwmnp5ekzcxs5hlgyoreau4npp4wa
{
  ALTER TYPE default::User {
      ALTER LINK identity {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
