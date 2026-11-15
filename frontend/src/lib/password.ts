export interface PasswordStrength {
  /** 0 (empty) to 4 (strong) */
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
}

const LABELS = ["", "Weak", "Fair", "Good", "Strong"] as const;

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: LABELS[0] };

  let points = 0;
  if (password.length >= 8) points += 1;
  if (password.length >= 12) points += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) points += 1;
  if (/\d/.test(password)) points += 1;
  if (/[^A-Za-z0-9]/.test(password)) points += 1;

  // Passwords shorter than the minimum never rate above "Weak".
  const score = password.length < 8 ? 1 : Math.min(4, Math.max(1, points - 1));
  return { score: score as PasswordStrength["score"], label: LABELS[score] };
}
