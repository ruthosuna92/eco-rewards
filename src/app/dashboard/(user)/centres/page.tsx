import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { mapCentreRow, type RecyclingCentreRow } from '@/lib/centres'
import { CentresView } from './CentresView'

export default async function CentresPage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('recycling_centres')
    .select(`
      *,
      centre_materials (material_type)
    `)
    .order('verified', { ascending: false })
    .order('name')

  if (error) {
    console.error(error)
  }

  const centres = (data ?? []).map((row) => mapCentreRow(row as RecyclingCentreRow))

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Suspense fallback={null}>
        <CentresView centres={centres} />
      </Suspense>
    </main>
  )
}
