export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      saved_content_ideas: {
        Row: {
          created_at: string | null
          hashtags: string[] | null
          id: string
          outline: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          outline?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          hashtags?: string[] | null
          id?: string
          outline?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      saved_hashtags: {
        Row: {
          created_at: string | null
          hashtag: string
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          hashtag: string
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          hashtag?: string
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      saved_niches: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          niche_name: string
          tags: string[] | null
          trendiness_score: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          niche_name: string
          tags?: string[] | null
          trendiness_score?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          niche_name?: string
          tags?: string[] | null
          trendiness_score?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      saved_titles_bios: {
        Row: {
          content: string
          created_at: string | null
          id: string
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      trend_analysis: {
        Row: {
          created_at: string | null
          id: string
          keyword: string
          momentum: string | null
          overview: string | null
          related_hashtags: string[] | null
          suggested_styles: string[] | null
          trend_data: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          keyword: string
          momentum?: string | null
          overview?: string | null
          related_hashtags?: string[] | null
          suggested_styles?: string[] | null
          trend_data?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          keyword?: string
          momentum?: string | null
          overview?: string | null
          related_hashtags?: string[] | null
          suggested_styles?: string[] | null
          trend_data?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_feedback: {
        Row: {
          created_at: string
          feedback: string | null
          id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          id?: string
          rating: number
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback?: string | null
          id?: string
          rating?: number
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
