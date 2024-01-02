// types.ts
export interface GridItemData {
  // id: number;
  media_url: string;
  caption: string;
  location: {
    region: string;
    label: string;
  };
  price: number;
  reservationDate?: string;
}
