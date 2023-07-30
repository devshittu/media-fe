export type Setting = {
  id: string;
  user_id: string;
  theme: string;
  language: string;
  account_details: {
    display_name: string;
    email: string;
  };
  notifications: {
    email: {
      account: number; // email about the user's account
      marketing: number; // email about the marketing, products and promotions
      updates: number; // newly on-boarded features/announcements
    };
  };
  favorite_categories: string[];
  last_updated: number;
  created_at: number;
  updated_at: number;
};
