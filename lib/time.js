export function sqlToClientDate(sqlDateTime) {
    if (!sqlDateTime) return null

    // Convert "2026-02-01 14:30:00" → "2026-02-01T14:30:00Z"
    return new Date(sqlDateTime.replace(' ', 'T') + 'Z')
}
  