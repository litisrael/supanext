declare module '@supabase/supabase-js' {
    interface SupabaseClient {
      rpc<ResponseType, ParamsType>(
        fn: string,
        params?: ParamsType
      ): PostgrestBuilder<ResponseType>;
    }
  }
  