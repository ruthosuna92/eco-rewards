import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Recycle,
  Sprout,
  Leaf,
  Star,
  Camera,
  Gift,
  CheckCircle,
} from "lucide-react";
import { auth } from "@clerk/nextjs/server";

export default async function LandingPage() {
  const { userId } = await auth();
  const isLoggedIn = !!userId;

  return (
    <div className="min-h-screen bg-earth">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-earth/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2.5 rounded-xl transition-colors duration-300 bg-[rgb(var(--accent))]/30 group-hover:bg-[rgb(var(--secondary))]/25">
                <Leaf className="h-6 w-6 text-forest" />
              </div>
              <span className="font-bold text-xl text-bark tracking-tight group-hover:text-forest transition-colors">
                EcoRewards
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/centres"
                className="px-4 py-2 rounded-xl text-sm font-medium text-bark-light hover:text-forest hover:bg-earth-warm transition-all duration-200"
              >
                Centros
              </Link>
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[rgb(var(--primary))] text-white hover:opacity-90 transition-opacity shadow-md shadow-[rgb(var(--primary))]/20"
                >
                  Ir a la app
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 rounded-xl text-sm font-medium text-bark-light hover:text-forest hover:bg-earth-warm transition-all duration-200"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/sign-up"
                    className="ml-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[rgb(var(--primary))] text-white hover:opacity-90 transition-opacity shadow-md shadow-[rgb(var(--primary))]/20"
                  >
                    Registrarse gratis
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 animate-float bg-[rgb(var(--accent))]/50" />
        <div className="absolute top-40 -left-24 w-80 h-80 rounded-full blur-3xl opacity-30 animate-float-delayed bg-[rgb(var(--secondary))]/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] text-xs font-bold mb-8 border border-[rgb(var(--primary))]/15">
                <Sprout className="h-3.5 w-3.5" />
                Bogotá, Colombia 🌍
              </div>
              <h1 className="text-6xl font-bold text-bark tracking-tight leading-[1.08] mb-6">
                Recicla.
                <br />
                Gana puntos.
                <br />
                <span className="text-forest">Cuida el planeta.</span>
              </h1>
              <p className="text-bark-light text-xl max-w-md mb-10 leading-relaxed">
                Encuentra los centros de reciclaje más cercanos, registra tu
                impacto con IA y acumula puntos por cada entrega.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-[rgb(var(--primary))] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-opacity shadow-lg shadow-[rgb(var(--primary))]/25"
                  >
                    Ir al dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-up"
                      className="inline-flex items-center gap-2 bg-[rgb(var(--primary))] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-opacity shadow-lg shadow-[rgb(var(--primary))]/25"
                    >
                      Empezar gratis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/centres"
                      className="inline-flex items-center gap-2 text-bark font-medium px-6 py-4 rounded-2xl border border-border hover:bg-earth-warm transition-all"
                    >
                      <MapPin className="h-4 w-4 text-[rgb(var(--primary))]" />
                      Ver centros
                    </Link>
                  </>
                )}
              </div>
              {/* Social proof */}
              <div className="mt-10 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["MG", "AL", "JR", "KP"].map((i, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-forest text-white text-xs flex items-center justify-center font-semibold border-2 border-white shadow-sm"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-bark-light">
                  <span className="font-semibold text-bark">
                    +2.400 personas
                  </span>{" "}
                  ya están reciclando en Bogotá
                </p>
              </div>
            </div>

            {/* Dashboard preview card */}
            <div className="hidden md:flex justify-end">
              <div className="relative w-[360px]">
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-[rgb(var(--accent))]/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[rgb(var(--secondary))]/20 rounded-full blur-2xl" />
                <div className="relative bg-white rounded-3xl border border-border shadow-[0_24px_60px_rgba(22,101,52,0.12),0_4px_16px_rgba(0,0,0,0.06)] p-6 space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-bark-light font-medium">
                        Bienvenida de vuelta
                      </p>
                      <p className="text-lg font-bold text-bark mt-0.5">
                        Hola, María 👋
                      </p>
                    </div>
                    <div className="h-11 w-11 rounded-2xl bg-forest text-white flex items-center justify-center font-semibold text-sm shadow-md">
                      MG
                    </div>
                  </div>
                  {/* Points */}
                  <div className="bg-earth rounded-2xl p-4">
                    <p className="text-xs text-bark-light mb-1">
                      Puntos de impacto
                    </p>
                    <p className="text-3xl font-bold text-bark">1.250</p>
                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between text-xs text-bark-light">
                        <span>Próxima recompensa</span>
                        <span className="font-semibold text-forest">75%</span>
                      </div>
                      <div className="h-2 bg-earth-warm rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-[rgb(var(--secondary))] to-[rgb(var(--primary))] rounded-full" />
                      </div>
                    </div>
                  </div>
                  {/* Stats grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "CO₂ evitado",
                        value: "12.4 kg",
                        color: "bg-[rgb(var(--secondary))]/10",
                        text: "text-[rgb(var(--primary))]",
                      },
                      {
                        label: "Ítems reciclados",
                        value: "47 ítems",
                        color: "bg-[rgb(var(--warning))]/10",
                        text: "text-bark",
                      },
                      {
                        label: "Racha actual",
                        value: "7 días 🔥",
                        color: "bg-[rgb(var(--error))]/10",
                        text: "text-bark",
                      },
                      {
                        label: "Equiv. árboles",
                        value: "0.8 🌳",
                        color: "bg-[rgb(var(--primary))]/8",
                        text: "text-[rgb(var(--primary))]",
                      },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className={`${s.color} rounded-xl p-3`}
                      >
                        <p className="text-xs text-bark-light">{s.label}</p>
                        <p className={`text-sm font-bold ${s.text} mt-0.5`}>
                          {s.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────── */}
      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {[
              {
                value: "120+",
                label: "Centros de reciclaje",
                sub: "en Bogotá",
                icon: MapPin,
              },
              {
                value: "5.2 ton",
                label: "CO₂ evitado",
                sub: "por nuestra comunidad",
                icon: Recycle,
              },
              {
                value: "2.400+",
                label: "Recicladores activos",
                sub: "y creciendo cada día",
                icon: Star,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 py-4 sm:py-0 sm:px-8 first:pl-0 last:pr-0"
              >
                <div className="w-12 h-12 rounded-2xl bg-[rgb(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="h-5 w-5 text-[rgb(var(--primary))]" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-bark tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-bark">{stat.label}</p>
                  <p className="text-xs text-bark-light">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] text-xs font-bold mb-4 border border-[rgb(var(--primary))]/15">
            Simple y rápido
          </div>
          <h2 className="text-5xl font-bold text-bark tracking-tight mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-bark-light text-lg max-w-xl mx-auto">
            Tres pasos para empezar a hacer la diferencia en tu ciudad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: MapPin,
              title: "Encuentra un centro",
              desc: "Busca el punto de reciclaje más cercano con nuestro mapa interactivo de Bogotá.",
              frame: "bg-[rgb(var(--secondary))]/10 text-[rgb(var(--primary))]",
              border: "border-[rgb(var(--secondary))]/20",
            },
            {
              step: "02",
              icon: Camera,
              title: "Registra tu entrega",
              desc: "Toma una foto y nuestra IA clasifica el material automáticamente. Sin papeleo.",
              frame: "bg-[rgb(var(--warning))]/10 text-bark",
              border: "border-[rgb(var(--warning))]/20",
            },
            {
              step: "03",
              icon: Gift,
              title: "Gana puntos",
              desc: "Acumula puntos por cada entrega, ve tu impacto real y canjéalos por beneficios.",
              frame: "bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]",
              border: "border-[rgb(var(--primary))]/20",
            },
          ].map((f, i) => (
            <div
              key={f.title}
              className="relative bg-white rounded-3xl border border-border shadow-[0_4px_24px_rgba(22,101,52,0.06)] p-8 overflow-hidden group hover:shadow-[0_8px_40px_rgba(22,101,52,0.12)] transition-shadow duration-300"
            >
              <div className="absolute top-6 right-6 text-7xl font-black text-bark/[0.04] select-none leading-none">
                {f.step}
              </div>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.frame} border ${f.border}`}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-xl text-bark mb-3">{f.title}</h3>
              <p className="text-bark-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ALTERNADAS ──────────────────── */}
      <section className="bg-white border-y border-border py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgb(var(--secondary))]/10 text-[rgb(var(--primary))] text-xs font-bold mb-6 border border-[rgb(var(--secondary))]/20">
                Mapa interactivo
              </div>
              <h2 className="text-4xl font-bold text-bark tracking-tight mb-5 leading-tight">
                Encuentra el centro más cercano a ti
              </h2>
              <p className="text-bark-light text-lg mb-8 leading-relaxed">
                Más de 120 puntos de reciclaje en Bogotá, con horarios,
                materiales aceptados y cómo llegar.
              </p>
              <ul className="space-y-3">
                {[
                  "Filtrar por tipo de material",
                  "Ver horarios en tiempo real",
                  "Obtener indicaciones paso a paso",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-bark">
                    <CheckCircle className="h-5 w-5 text-forest flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-earth rounded-3xl p-8 border border-border h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-[rgb(var(--primary))]/30 mx-auto mb-3" />
                <p className="text-bark-light text-sm">Mapa próximamente</p>
              </div>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 bg-earth rounded-3xl p-8 border border-border h-64 flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-12 w-12 text-[rgb(var(--primary))]/30 mx-auto mb-3" />
                <p className="text-bark-light text-sm">
                  IA de reconocimiento próximamente
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgb(var(--warning))]/10 text-bark text-xs font-bold mb-6 border border-[rgb(var(--warning))]/20">
                IA integrada
              </div>
              <h2 className="text-4xl font-bold text-bark tracking-tight mb-5 leading-tight">
                Clasifica materiales con una foto
              </h2>
              <p className="text-bark-light text-lg mb-8 leading-relaxed">
                Nuestra IA reconoce el tipo de material en segundos. Sin
                confusiones, sin errores.
              </p>
              <ul className="space-y-3">
                {[
                  "Reconocimiento instantáneo",
                  "Clasificación por categoría",
                  "Registro automático de puntos",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-bark">
                    <CheckCircle className="h-5 w-5 text-forest flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[rgb(var(--accent))]/25 rounded-full blur-3xl -ml-12 -mb-12" />
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-5 backdrop-blur-sm border border-white/10">
                <Sprout className="h-3 w-3 mr-1.5" />
                Únete a la comunidad
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                ¿Lista para hacer la diferencia?
              </h2>
              <p className="text-white/80 text-lg mb-10 max-w-md leading-relaxed">
                Cada material que reciclas hace nuestro planeta un poco más
                verde. Súmate a miles de personas que ya generan impacto real en
                Bogotá.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {isLoggedIn ? (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-white text-[rgb(var(--primary))] hover:bg-white/95 font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg text-base"
                  >
                    Ir al dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/sign-up"
                      className="inline-flex items-center gap-2 bg-white text-[rgb(var(--primary))] hover:bg-white/95 font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg text-base"
                    >
                      Crear cuenta gratis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <p className="text-white/60 text-sm">
                      Sin tarjeta de crédito
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-md p-7 rounded-3xl border border-white/20 w-72 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-inner">
                    <Leaf className="text-[rgb(var(--primary))] h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-2xl">1,250</p>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wider">
                      Puntos de impacto
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs text-white/80">
                    <span>Progreso hacia recompensa</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2.5 bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-white/60 to-white rounded-full" />
                  </div>
                  <p className="text-xs text-white/75 text-center pt-1">
                    ¡Lo estás haciendo increíble! 🌱
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="bg-white border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[rgb(var(--accent))]/30">
              <Leaf className="h-4 w-4 text-forest" />
            </div>
            <span className="text-sm font-bold text-bark">EcoRewards</span>
            <span className="text-sm text-bark-light">· Bogotá, Colombia</span>
          </div>
          <p className="text-xs text-bark-light">
            Hecho con 💚 para el planeta · 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
