export interface Database {
  public: {
    Tables: {
      user_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          is_active: boolean;
          subscription_start: string;
          subscription_end: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          is_active?: boolean;
          subscription_start?: string;
          subscription_end?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          is_active?: boolean;
          subscription_start?: string;
          subscription_end?: string;
          created_at?: string;
        };
      };
    };
  };
}