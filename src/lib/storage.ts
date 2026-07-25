import type { RepairRequest } from '../types'
import { initialRequests } from '../data/mockData'

const REQUESTS_KEY = 'fixnear.requests.v1'
const FEEDBACK_KEY = 'fixnear.feedback.v1'

export function loadRequests(): RepairRequest[] {
  try {
    const value = localStorage.getItem(REQUESTS_KEY)
    return value ? JSON.parse(value) as RepairRequest[] : initialRequests
  } catch {
    return initialRequests
  }
}

export function saveRequests(requests: RepairRequest[]) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests))
}

export interface FeedbackEntry {
  id: string
  role: 'Customer' | 'Provider' | 'Other'
  score: number
  useful: string
  missing: string
  email: string
  createdAt: string
}

export function saveFeedback(entry: FeedbackEntry) {
  const current = loadFeedback()
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify([entry, ...current]))
}

export function loadFeedback(): FeedbackEntry[] {
  try {
    const value = localStorage.getItem(FEEDBACK_KEY)
    return value ? JSON.parse(value) as FeedbackEntry[] : []
  } catch {
    return []
  }
}
