export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_audit_log: {
        Row: {
          action: string
          admin_user_id: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      admin_invitations: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          expires_at: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          expires_at: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          expires_at?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          completed_count: number | null
          created_at: string
          id: string
          quantity: number
          service_id: string
          start_count: number | null
          status: string | null
          target_url: string
          total_cost: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_count?: number | null
          created_at?: string
          id?: string
          quantity: number
          service_id: string
          start_count?: number | null
          status?: string | null
          target_url: string
          total_cost: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_count?: number | null
          created_at?: string
          id?: string
          quantity?: number
          service_id?: string
          start_count?: number | null
          status?: string | null
          target_url?: string
          total_cost?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          admin_created_at: string | null
          balance: number | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean
          status: string | null
          total_orders: number | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          admin_created_at?: string | null
          balance?: number | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          status?: string | null
          total_orders?: number | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          admin_created_at?: string | null
          balance?: number | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean
          status?: string | null
          total_orders?: number | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string
          created_at: string
          delivery_time: string | null
          description: string | null
          features: string[] | null
          id: string
          max_quantity: number | null
          min_quantity: number | null
          name: string
          platform: string
          price_per_1000: number
          status: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          delivery_time?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          max_quantity?: number | null
          min_quantity?: number | null
          name: string
          platform: string
          price_per_1000: number
          status?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          delivery_time?: string | null
          description?: string | null
          features?: string[] | null
          id?: string
          max_quantity?: number | null
          min_quantity?: number | null
          name?: string
          platform?: string
          price_per_1000?: number
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_admin_invitation: {
        Args: { invitation_token: string }
        Returns: boolean
      }
      create_admin_invitation: {
        Args: { invitation_email: string }
        Returns: string
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          action_name: string
          resource_type: string
          resource_id?: string
          details?: Json
        }
        Returns: undefined
      }
      validate_url: {
        Args: { url: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
