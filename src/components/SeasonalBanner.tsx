import { getSeasonalEffect } from "@/lib/seasonal-effects";

export function SeasonalBanner() {
  const effect = getSeasonalEffect();

  if (!effect) {
    return null;
  }

  return (
    <div className={`w-full max-w-2xl mx-auto mb-6 p-4 rounded-xl shadow-xl bg-gradient-to-r ${effect.gradient} border-2 border-white/30`}>
      <div className="flex items-center justify-center gap-3">
        <span className="text-4xl animate-bounce">{effect.emoji}</span>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{effect.name}</h3>
          <p className="text-white/90 text-sm">{effect.message}</p>
        </div>
        <span className="text-4xl animate-bounce">{effect.emoji}</span>
      </div>
      {effect.effect === "snow" && <SnowEffect />}
      {effect.effect === "confetti" && <ConfettiEffect />}
    </div>
  );
}

function SnowEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-white text-xl animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
}

function ConfettiEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 1}s`,
          }}
        >
          {["🎉", "🎊", "✨", "🎈"][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </div>
  );
}
