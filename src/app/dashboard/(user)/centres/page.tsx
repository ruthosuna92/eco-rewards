import { createClient } from '@/lib/supabase/server'
import { mapCentreRow, type RecyclingCentreRow } from '@/lib/centres'
import { CentresGrid } from './CentresGrid'
import { CentresMapLoader } from './CentresMapLoader'

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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bark tracking-tight mb-2">
          Centros de reciclaje
        </h1>
        <p className="text-bark-light">
          {centres.length} puntos de reciclaje en Bogotá — mucho más de lo que crees 🌱
        </p>
      </div>

      <CentresMapLoader centres={centres} />

      <CentresGrid centres={centres} />

      {centres.length === 0 && (
        <div className="text-center py-20 text-bark-light">
          <p className="text-lg">No hay centros disponibles aún.</p>
        </div>
      )}
    </main>
  )
}
