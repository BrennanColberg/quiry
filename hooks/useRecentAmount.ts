import useWindowDimensions from './useWindowDimensions'

export default function useRecentAmount(): number {
  const { height, width } = useWindowDimensions()
  const compression = Math.max(700 / width, 1)
  return Math.max(Math.floor((height - 200) / compression / 29), 1)
}

// more height => more questions
// BUT less width => questions are taller => fewer questions per height
// height, with less width, acts like MORE height, SO NEEDS TO BE DISCOUNTED
// less width = more compression = fewer questions

// relationship between width -> compression = inverse
// relationship between compression -> questions = inverse
// relationship between width -> questions = direct (to a point)
