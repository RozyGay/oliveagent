export function getSeasonalEffect() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  if (month === 12 && day === 1) {
    return {
      name: "Winter Wonderland",
      emoji: "❄️",
      gradient: "from-blue-400 via-cyan-400 to-blue-600",
      message: "Welcome to the first day of winter! ⛄",
      effect: "snow"
    };
  }

  if (month === 12 && day >= 24 && day <= 26) {
    return {
      name: "Holiday Season",
      emoji: "🎄",
      gradient: "from-red-500 via-green-500 to-red-600",
      message: "Happy Holidays! 🎅",
      effect: "snow"
    };
  }

  if (month === 1 && day === 1) {
    return {
      name: "New Year",
      emoji: "🎆",
      gradient: "from-yellow-400 via-pink-500 to-purple-600",
      message: "Happy New Year! 🎉",
      effect: "confetti"
    };
  }

  if (month === 10 && day === 31) {
    return {
      name: "Halloween",
      emoji: "🎃",
      gradient: "from-orange-500 via-purple-600 to-black",
      message: "Happy Halloween! 👻",
      effect: "spooky"
    };
  }

  if (month === 2 && day === 14) {
    return {
      name: "Valentine's Day",
      emoji: "💝",
      gradient: "from-pink-400 via-rose-500 to-red-500",
      message: "Happy Valentine's Day! ❤️",
      effect: "hearts"
    };
  }

  if (month === 7 && day === 4) {
    return {
      name: "Independence Day",
      emoji: "🇺🇸",
      gradient: "from-blue-600 via-white to-red-600",
      message: "Happy Independence Day! 🎆",
      effect: "fireworks"
    };
  }

  return null;
}
