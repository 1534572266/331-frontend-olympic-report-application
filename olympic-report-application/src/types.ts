export interface MedalDetail {
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
}

export interface Country {
  id: number;
  name: string;
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
