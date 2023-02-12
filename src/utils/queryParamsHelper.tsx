interface FilterFields {
  priceRange: { minPrice: number; maxPrice: number };
  typeOfPlace: { entire: boolean; private: boolean; shared: boolean };
  rooms: { bathrooms: number; bedrooms: number };
  propertyType: {
    home: boolean;
    apartment: boolean;
    hotel: boolean;
    guesthouse: boolean;
  };
}

export const extractDataFromQueryParamsFilter = (query: string) => {
  const result: FilterFields = {
    priceRange: { minPrice: 0, maxPrice: 0 },
    propertyType: {
      apartment: false,
      guesthouse: false,
      home: false,
      hotel: false,
    },
    rooms: { bathrooms: 0, bedrooms: 0 },
    typeOfPlace: { entire: false, private: false, shared: false },
  };
  const searchParams = new URLSearchParams(query);

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const typeOfPlace = searchParams.get("typeOfPlace");
  const bedrooms = searchParams.get("bedrooms");
  const bathrooms = searchParams.get("bathrooms");
  const propertyType = searchParams.get("propertyType");

  if (minPrice) result.priceRange.minPrice = +minPrice;
  if (maxPrice) result.priceRange.maxPrice = +maxPrice;
  if (bedrooms) result.rooms.bedrooms = +bedrooms;
  if (bathrooms) result.rooms.bathrooms = +bathrooms;

  if (typeOfPlace) {
    const types = typeOfPlace.split(",");
    if (types.includes("Entire place")) result.typeOfPlace.entire = true;
    if (types.includes("Shared room")) result.typeOfPlace.shared = true;
    if (types.includes("Private room")) result.typeOfPlace.private = true;
  }

  if (propertyType) {
    const types = propertyType.split(",");
    if (types.includes("Apartment")) result.propertyType.apartment = true;
    if (types.includes("Guesthouse")) result.propertyType.guesthouse = true;
    if (types.includes("Home")) result.propertyType.home = true;
    if (types.includes("Hotel")) result.propertyType.hotel = true;
  }

  return result;
};

export const calculateGuestsFromParams = (query: string) => {
  const searchParams = new URLSearchParams(query);
  const adults = searchParams.get("adults");
  const children = searchParams.get("children");
  const infants = searchParams.get("infants");
  const pets = searchParams.get("pets");

  let guests = 0;
  if (adults) guests += +adults;
  if (children) guests += +children;
  if (infants) guests += +infants;
  searchParams.delete("adults");
  searchParams.delete("children");
  searchParams.delete("infants");
  searchParams.delete("pets");
  searchParams.append("guests", guests.toString());

  return searchParams.toString();
};

export const queryParamsFilterHelper = (
  query: string,
  filters: FilterFields
) => {
  const { priceRange, propertyType, rooms, typeOfPlace } = filters;
  const searchParams = new URLSearchParams(query);
  priceRange.minPrice
    ? searchParams.set("minPrice", priceRange.minPrice.toString())
    : searchParams.delete("minPrice");
  priceRange.maxPrice
    ? searchParams.set("maxPrice", priceRange.maxPrice.toString())
    : searchParams.delete("maxPrice");
  let placeTypes: string[] = [];
  typeOfPlace.entire
    ? placeTypes.push("Entire place")
    : (placeTypes = placeTypes.filter((el) => el !== "Entire place"));
  typeOfPlace.shared
    ? placeTypes.push("Shared room")
    : (placeTypes = placeTypes.filter((el) => el !== "Shared room"));
  typeOfPlace.private
    ? placeTypes.push("Private room")
    : (placeTypes = placeTypes.filter((el) => el !== "Private room"));
  placeTypes.length
    ? searchParams.set("typeOfPlace", placeTypes.toString())
    : searchParams.delete("typeOfPlace");
  rooms.bathrooms
    ? searchParams.set("bathrooms", rooms.bathrooms.toString())
    : searchParams.delete("bathrooms");
  rooms.bedrooms
    ? searchParams.set("bedrooms", rooms.bedrooms.toString())
    : searchParams.delete("bedrooms");
  let propertyTypes: string[] = [];
  propertyType.apartment
    ? propertyTypes.push("Apartment")
    : (propertyTypes = propertyTypes.filter((el) => el != "Apartment"));
  propertyType.guesthouse
    ? propertyTypes.push("Guesthouse")
    : (propertyTypes = propertyTypes.filter((el) => el != "Guesthouse"));
  propertyType.home
    ? propertyTypes.push("Home")
    : (propertyTypes = propertyTypes.filter((el) => el != "Home"));
  propertyType.hotel
    ? propertyTypes.push("Hotel")
    : (propertyTypes = propertyTypes.filter((el) => el != "Hotel"));
  propertyTypes.length
    ? searchParams.set("propertyType", propertyTypes.toString())
    : searchParams.delete("propertyType");

  return searchParams.toString();
};
