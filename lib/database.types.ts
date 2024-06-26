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
      gift: {
        Row: {
          fk: string
          gift_wrap_price: number | null
          gift_wrap_tax: number | null
        }
        Insert: {
          fk: string
          gift_wrap_price?: number | null
          gift_wrap_tax?: number | null
        }
        Update: {
          fk?: string
          gift_wrap_price?: number | null
          gift_wrap_tax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_gift_fk_fkey"
            columns: ["fk"]
            isOneToOne: true
            referencedRelation: "main_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      item_tax: {
        Row: {
          fk: string
          item_tax: number | null
        }
        Insert: {
          fk: string
          item_tax?: number | null
        }
        Update: {
          fk?: string
          item_tax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_item_tax_fk_fkey"
            columns: ["fk"]
            isOneToOne: true
            referencedRelation: "main_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      main_orders: {
        Row: {
          asin: string | null
          currency: Database["public"]["Enums"]["currency"] | null
          fulfillment_channel:
            | Database["public"]["Enums"]["fulfillment_channel"]
            | null
          id: string
          is_business_order: boolean | null
          item_price: number | null
          item_status: Database["public"]["Enums"]["item-status"] | null
          last_updated_date: string | null
          order_status: Database["public"]["Enums"]["order-status"] | null
          parent: string | null
          product_name: string | null
          purchase_date: string | null
          quantity: number | null
          sales_channel: Database["public"]["Enums"]["sales-channel"] | null
          ship_city: string | null
          ship_country: string | null
          ship_postal_code: string | null
          ship_service_level:
            | Database["public"]["Enums"]["ship-service-level"]
            | null
          ship_state: string | null
          signature_confirmation_recommended: boolean | null
          sku: string | null
          user_id: string | null
        }
        Insert: {
          asin?: string | null
          currency?: Database["public"]["Enums"]["currency"] | null
          fulfillment_channel?:
            | Database["public"]["Enums"]["fulfillment_channel"]
            | null
          id: string
          is_business_order?: boolean | null
          item_price?: number | null
          item_status?: Database["public"]["Enums"]["item-status"] | null
          last_updated_date?: string | null
          order_status?: Database["public"]["Enums"]["order-status"] | null
          parent?: string | null
          product_name?: string | null
          purchase_date?: string | null
          quantity?: number | null
          sales_channel?: Database["public"]["Enums"]["sales-channel"] | null
          ship_city?: string | null
          ship_country?: string | null
          ship_postal_code?: string | null
          ship_service_level?:
            | Database["public"]["Enums"]["ship-service-level"]
            | null
          ship_state?: string | null
          signature_confirmation_recommended?: boolean | null
          sku?: string | null
          user_id?: string | null
        }
        Update: {
          asin?: string | null
          currency?: Database["public"]["Enums"]["currency"] | null
          fulfillment_channel?:
            | Database["public"]["Enums"]["fulfillment_channel"]
            | null
          id?: string
          is_business_order?: boolean | null
          item_price?: number | null
          item_status?: Database["public"]["Enums"]["item-status"] | null
          last_updated_date?: string | null
          order_status?: Database["public"]["Enums"]["order-status"] | null
          parent?: string | null
          product_name?: string | null
          purchase_date?: string | null
          quantity?: number | null
          sales_channel?: Database["public"]["Enums"]["sales-channel"] | null
          ship_city?: string | null
          ship_country?: string | null
          ship_postal_code?: string | null
          ship_service_level?:
            | Database["public"]["Enums"]["ship-service-level"]
            | null
          ship_state?: string | null
          signature_confirmation_recommended?: boolean | null
          sku?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      order_channel: {
        Row: {
          fk: string
          order_channel: string | null
        }
        Insert: {
          fk: string
          order_channel?: string | null
        }
        Update: {
          fk?: string
          order_channel?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_order_channel_fk_fkey"
            columns: ["fk"]
            isOneToOne: true
            referencedRelation: "main_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      parents: {
        Row: {
          asin: string | null
          created_at: string
          isoString: string | null
          parent_id: string
          user_id: string | null
          variations: Json | null
        }
        Insert: {
          asin?: string | null
          created_at?: string
          isoString?: string | null
          parent_id: string
          user_id?: string | null
          variations?: Json | null
        }
        Update: {
          asin?: string | null
          created_at?: string
          isoString?: string | null
          parent_id?: string
          user_id?: string | null
          variations?: Json | null
        }
        Relationships: []
      }
      promotion: {
        Row: {
          fk: string
          item_promotion_discount: number | null
          promotion_ids: string | null
          ship_promotion_discount: string | null
        }
        Insert: {
          fk: string
          item_promotion_discount?: number | null
          promotion_ids?: string | null
          ship_promotion_discount?: string | null
        }
        Update: {
          fk?: string
          item_promotion_discount?: number | null
          promotion_ids?: string | null
          ship_promotion_discount?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_promotion_fk_fkey"
            columns: ["fk"]
            isOneToOne: true
            referencedRelation: "main_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_ranks_parents: {
        Row: {
          link_category: string | null
          link_sub_category: string | null
          marketplaceId: string | null
          parent_id: string
          rank_category: number | null
          rank_sub_category: number | null
          title_category: string | null
          title_sub_category: string | null
          user_id: string | null
          value_category: number | null
          value_sub_category: number | null
        }
        Insert: {
          link_category?: string | null
          link_sub_category?: string | null
          marketplaceId?: string | null
          parent_id: string
          rank_category?: number | null
          rank_sub_category?: number | null
          title_category?: string | null
          title_sub_category?: string | null
          user_id?: string | null
          value_category?: number | null
          value_sub_category?: number | null
        }
        Update: {
          link_category?: string | null
          link_sub_category?: string | null
          marketplaceId?: string | null
          parent_id?: string
          rank_category?: number | null
          rank_sub_category?: number | null
          title_category?: string | null
          title_sub_category?: string | null
          user_id?: string | null
          value_category?: number | null
          value_sub_category?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_ranks_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: true
            referencedRelation: "parents"
            referencedColumns: ["parent_id"]
          },
        ]
      }
      shipping_data: {
        Row: {
          fk: string
          price_designation: string | null
          purchase_order_number: string | null
          shipping_price: number | null
          shipping_tax: number | null
        }
        Insert: {
          fk: string
          price_designation?: string | null
          purchase_order_number?: string | null
          shipping_price?: number | null
          shipping_tax?: number | null
        }
        Update: {
          fk?: string
          price_designation?: string | null
          purchase_order_number?: string | null
          shipping_price?: number | null
          shipping_tax?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_shipping_data_fk_fkey"
            columns: ["fk"]
            isOneToOne: true
            referencedRelation: "main_orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      all_parents: {
        Args: {
          id_argumento: string
        }
        Returns: {
          asin: string
        }[]
      }
      etuniquedates: {
        Args: Record<PropertyKey, never>
        Returns: {
          fecha: string
        }[]
      }
      get_available_dates_by_id: {
        Args: {
          id_argumento: string
        }
        Returns: {
          before: string
          after: string
        }[]
      }
      get_cancelled_orders: {
        Args: {
          id_argumento: string
          asin_array: string[]
          start_date: string
          end_date: string
        }
        Returns: {
          parent_asin: string
          order_date: string
          cancelled_orders: number
        }[]
      }
      get_gross_sales_parent: {
        Args: {
          id_argumento: string
          asin_array: string[]
          start_date: string
          end_date: string
        }
        Returns: {
          parent_asin: string
          order_date: string
          total_sales: number
        }[]
      }
      get_gross_sales_parent_bigint: {
        Args: {
          id_argumento: string
          asin_array: string[]
          start_date: string
          end_date: string
        }
        Returns: {
          parent_asin: string
          order_date: string
          total_sales: number
        }[]
      }
      get_orders_parents: {
        Args: {
          id_argumento: string
          asin_array: string[]
          start_date: string
          end_date: string
        }
        Returns: {
          parent_asin: string
          order_date: string
          total_sales: number
        }[]
      }
      get_orders_parentsub: {
        Args: {
          id_argumento: string
          asin_array: string[]
          start_date: string
          end_date: string
        }
        Returns: {
          parent_asin: string
          order_date: string
          total_sales: number
        }[]
      }
      get_ranks: {
        Args: {
          id_argumento: string
          asin_array: string[]
          start_date: string
          end_date: string
        }
        Returns: {
          asin: string
          isodate: string
          daily_sum: number
        }[]
      }
      get_ranks_by_daily_sums: {
        Args: {
          user_id: string
        }
        Returns: {
          asin: string
          isodate: string
          daily_sum: number
        }[]
      }
      getuniquedates: {
        Args: Record<PropertyKey, never>
        Returns: {
          fecha: string
        }[]
      }
      labelDates: {
        Args: Record<PropertyKey, never>
        Returns: {
          fecha: string
        }[]
      }
      maxymindates: {
        Args: Record<PropertyKey, never>
        Returns: {
          mindate: string
          maxdate: string
        }[]
      }
      obtener_cantidad_ventas_por_dia: {
        Args: {
          id_usuario: string
          from_date: string
          to_date: string
        }
        Returns: {
          purchase_date: string
          sku: string
          total_quantity: number
        }[]
      }
      obtener_cantidad_ventas_state: {
        Args: {
          id_usuario: string
          from_date: string
          to_date: string
        }
        Returns: {
          ship_state: string
          sku: string
          total_quantity: number
        }[]
      }
      obtener_fechas_disponibles_por_id: {
        Args: {
          id_argumento: string
        }
        Returns: {
          fecha_minima: string
          fecha_maxima: string
        }[]
      }
      obtener_sku: {
        Args: {
          id_argumento: string
        }
        Returns: string[]
      }
      obtenercantidadporskuyfecha: {
        Args: {
          id_usuario: string
          from_date: string
          to_date: string
        }
        Returns: {
          purchase_date: string
          sku: string
          total_quantity: number
        }[]
      }
      obtenerventaspordia: {
        Args: {
          id_argumento: string
        }
        Returns: {
          fecha_compra: string
          sku: string
          cantidad_total: number
          precio_total: number
        }[]
      }
    }
    Enums: {
      currency: "CAD" | "USD" | '""'
      day:
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
      fulfillment_channel: "Amazon"
      "item-status": "Shipped" | "Unshipped" | "Cancelled" | "Shipping" | '""'
      months:
        | "January"
        | "February"
        | "March"
        | "April"
        | "May"
        | "June"
        | "July"
        | "August"
        | "September"
        | "October"
        | "November"
        | "December"
      "order-status": "Pending" | "Shipped" | "Cancelled" | "Shipping"
      "sales-channel":
        | "Amazon.ca"
        | "Non-Amazon"
        | "Amazon.com"
        | "Non-Amazon US"
      "ship-country": "CA" | "US" | '""' | "VI" | "IL" | "GB" | "MX" | "PH"
      "ship-service-level": "Standard" | "Expedited" | "SecondDay" | "NextDay"
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
