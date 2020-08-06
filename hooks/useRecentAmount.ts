import useWindowDimensions from './useWindowDimensions'
import { questionsInDimensions } from '../utils'

export default function useRecentAmount(): number {
  const { height, width } = useWindowDimensions()
  return questionsInDimensions(width, height / 2 - 100)
}

// more height => more questions
// BUT less width => questions are taller => fewer questions per height
// height, with less width, acts like MORE height, SO NEEDS TO BE DISCOUNTED
// less width = more compression = fewer questions

// relationship between width -> compression = inverse
// relationship between compression -> questions = inverse
// relationship between width -> questions = direct (to a point)
