import { createClient } from '@/lib/supabase/server'
import { MapPin, Clock, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

const MATERIAL_LABELS: Record<string, { label: string; emoji: string }> = {
  plastic: { label: 'Plástico', emoji: '♻️' },
  plastic_bottles: { label: 'Botellas PET', emoji: '🍶' },
  caps: { label: 'Tapas', emoji: '🔵' },
  paper: { label: 'Papel', emoji: '📄' },
  cardboard: { label: 'Cartón', emoji: '📦' },
  glass: { label: 'Vidrio', emoji: '🍾' },
  electronics: { label: 'Electrónicos', emoji: '💻' },
  phones: { label: 'Celulares', emoji: '📱' },
  computers: { label: 'Computadores', emoji: '🖥️' },
  batteries: { label: 'Pilas y baterías', emoji: '🔋' },
  cans: { label: 'Latas', emoji: '🥫' },
  cooking_oil: { label: 'Aceite usado', emoji: '🛢️' },
  clothing_good: { label: 'Ropa buen estado', emoji: '👕' },
  clothing_any: { label: 'Ropa cualquier estado', emoji: '🧥' },
  organic: { label: 'Orgánicos', emoji: '🍃' },
  compost: { label: 'Compostaje', emoji: '🌱' },
}

export default async function CentresPage() {
  const supabase = await createClient()

  const { data: centres, error } = await supabase
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

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bark tracking-tight mb-2">
          Centros de reciclaje
        </h1>
        <p className="text-bark-light">
          {centres?.length ?? 0} puntos de reciclaje en Bogotá — mucho más de lo que crees 🌱
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {centres?.map((centre) => (
          <Card
            key={centre.id}
            variant="default"
            hoverable
            className="p-5 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-bark text-base leading-tight truncate">
                  {centre.name}
                </h2>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <MapPin className="h-3.5 w-3.5 text-bark-light flex-shrink-0" />
                  <p className="text-sm text-bark-light truncate">{centre.address}</p>
                </div>
                {centre.locality && (
                  <p className="text-xs text-bark-light mt-0.5 pl-5">{centre.locality}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <Badge variant={centre.is_open ? 'success' : 'neutral'}>
                  {centre.is_open ? 'Abierto' : 'Cerrado'}
                </Badge>
                {centre.verified && (
                  <div className="flex items-center gap-1 text-xs text-forest font-medium">
                    <CheckCircle className="h-3 w-3" />
                    Verificado
                  </div>
                )}
              </div>
            </div>

            {/* Horario */}
            {centre.schedule && (
              <div className="flex items-start gap-2 text-xs text-bark-light bg-earth rounded-xl px-3 py-2">
                <Clock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-sage" />
                <span>{centre.schedule}</span>
              </div>
            )}

            {/* Notas */}
            {centre.notes && (
              <p className="text-xs text-bark-light leading-relaxed line-clamp-2">
                {centre.notes}
              </p>
            )}

            {/* Materiales */}
            {centre.centre_materials?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
                {centre.centre_materials.map((m: { material_type: string }) => {
                  const info = MATERIAL_LABELS[m.material_type]
                  return (
                    <span
                      key={m.material_type}
                      className="inline-flex items-center gap-1 text-xs bg-[rgb(var(--primary))]/8 text-[rgb(var(--primary))] px-2 py-1 rounded-lg font-medium"
                    >
                      {info?.emoji} {info?.label ?? m.material_type}
                    </span>
                  )
                })}
              </div>
            )}
          </Card>
        ))}
      </div>

      {(!centres || centres.length === 0) && (
        <div className="text-center py-20 text-bark-light">
          <p className="text-lg">No hay centros disponibles aún.</p>
        </div>
      )}
    </main>
  )
}