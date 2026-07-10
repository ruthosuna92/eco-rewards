import { MapPin, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { MATERIAL_LABELS } from "@/lib/materialLabels";
import type { DropOffPoint } from "@/types/dropoffPoint";

type CentreCardProps = {
  centre: DropOffPoint;
};

export function CentreCard({ centre }: CentreCardProps) {
  return (
    <>
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
          <Badge variant={centre.isOpen ? "success" : "neutral"}>
            {centre.isOpen ? "Abierto" : "Cerrado"}
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
      {centre.materials && centre.materials.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border">
          {centre.materials.map((materialType) => {
            const info = MATERIAL_LABELS[materialType];
            return (
              <span
                key={materialType}
                className="inline-flex items-center gap-1 text-xs bg-[rgb(var(--primary))]/8 text-[rgb(var(--primary))] px-2 py-1 rounded-lg font-medium"
              >
                {info?.emoji} {info?.label ?? materialType}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
}
