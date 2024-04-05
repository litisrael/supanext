
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()


  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('main_orders').select()
      

      const user = await supabase.auth.getUser();
      console.log("supabase.auth",supabase.auth)
// console.log(supabase) // Outputs the user's UUID

    
      
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}