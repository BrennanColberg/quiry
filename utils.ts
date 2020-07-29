import { firestore } from 'firebase'

export function isTimestampToday(timestamp: firestore.Timestamp): boolean {
  const timestampDate = timestamp.toDate()
  const now = new Date()
  return timestampDate.toLocaleDateString() === now.toLocaleDateString()
}

export function getISODate(): string {
  const now = new Date()
  const yyyy = now.getFullYear()
  const m = now.getMonth() + 1
  const mm: string = (m < 10 ? '0' : '') + m
  const d = now.getDate()
  const dd: string = (d < 10 ? '0' : '') + d
  return `${yyyy}-${mm}-${dd}`
}

export function questionsInDimensions(width: number, height: number): number {
  const compression = Math.max(550 / width, 1)
  return Math.max(Math.floor(height / compression / 29), 0)
}
