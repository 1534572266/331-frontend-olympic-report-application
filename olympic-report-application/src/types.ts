export interface MedalDetail {
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface Country {
  index: number;
  itemIndex: number;
  flag: string;
  name: string;
  abbreviation: string;
  totalMedals: number;
  gold: number;
  silver: number;
  bronze: number;
  medalDetails: MedalDetail[];
}

export interface OlympicData {
  country: Country;
}

export interface MessageState {
  message: string
  componentID: string
  comments: Record<number, string[]>
}

export interface CountryState {
  countries: Country[]
  currentCountry: Country | null
  totalCountries: number
}
