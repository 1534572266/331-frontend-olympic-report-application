export interface MedalDetail {
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface Country {
  id: number;
  name: string;
  flag: string;
  population?: number;
  capital?: string;
  area?:string;
  region:string;
  subregion?:string;
  information?:string;
  gold: number;
  silver: number;
  bronze: number;
  totalMedals: number;
  medalDetails: MedalDetail[];
  comments?: Comment[];
}

export interface OlympicData {
  country: Country;
}

export interface MessageState {
  message: string;
  componentID: string;
}

export interface CountryState {
  country: Country | null;
}

export interface Comment {
  id: number;
  content: string;
  timestamp: string;
}
