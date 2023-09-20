export const countries = {
  España: "ES",
  Alemania: "DE",
  Francia: "FR",
  Italia: "IT",
  Austria: "AT",
  Belgica: "BE",
  Bulgaria: "BG",
  Andorra: "AD",
  Lituania: "LT",
  Estonia: "EE",
  Finlandia: "FI",
  San_Marino: "SM",
  Eslovaquia: "SK",
  Eslovenia: "SI",
  Dinamarca: "DK",
  Suecia: "SE",
  Portugal: "PT",
  Ciudad_del_Vaticano: "VA",
  Luxemburgo: "LU",
  Chipre: "CY",
  Malta: "MT",
};

const countryKeyMapper = (item) => {
  return countries[item.country];
};

export default countryKeyMapper;
