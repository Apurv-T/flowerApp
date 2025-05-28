export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface Photos {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: Photo[];
}

export interface PhotoAPI {
  photos: Photos;
  stat: string;
}