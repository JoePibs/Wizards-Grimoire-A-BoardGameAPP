export interface CardData {
  long_description: string;
  id: string;
  name: string;
  short_description: string;
  image: string;
  editors: { name: string }[];
  illustrators: { name: string }[];
  themes: { name: string }[];
  mechanics: { name: string }[];
  min_age: number;
  min_player: number;
  max_player: number;
  video_link: string;
  price: number;
} 