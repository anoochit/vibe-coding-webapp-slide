export interface Link {
  id: string;
  title: string;
  url: string;
  clicks: number;
}

export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: "glassmorphism" | "cyberpunk" | "pastel" | "brutalism";
  links: Link[];
  createdAt: any; // Firebase Timestamp or string
  updatedAt: any;
}

export interface UsernameReservation {
  uid: string;
  reservedAt: any;
}

export interface ClickByDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface LinkAnalytics {
  linkId: string;
  clicksByDay: ClickByDay[];
}
