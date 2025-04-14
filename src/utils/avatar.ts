export function getAvatarUrl(seed: string, size: number = 40) {
  // Use UI Avatars as it's more reliable
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(seed)}&background=7136D1&color=fff&size=${size}&bold=true&format=svg`;
} 