export interface VideoClass {
  id: number;
  title: string;
  description: string;
  tags: string;
  userName: number;
  thumbnail_url: string;
  likeCount?: number;
  dislikeCount?: number;
  viewCount: number;
  uploadDate: Date;
  pictureUrl: string;
}

