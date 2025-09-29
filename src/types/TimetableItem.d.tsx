export interface TimetableItem {
  id: number;
  day: number;
  start_time: string;
  end_time: string;
  band_name: string;
  song1?: string;
  song2?: string;
  song3?: string;
}
