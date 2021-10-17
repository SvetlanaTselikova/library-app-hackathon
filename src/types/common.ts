export interface IBook {
  id: number;
  title: string;
  author: string;
  year: number;
  annotation: string;
  age_resctriction: number;
  volume: number;
  rubric: string;
  keyword: string;
}

export enum ContentMode {
  recommendations = "recommendations",
  populdar = "popular",
}
