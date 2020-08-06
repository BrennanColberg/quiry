import styles from '../styles/RandomImage.module.scss'
import { useState, useEffect } from 'react'

export default (): JSX.Element => {
  const [src, setSrc] = useState('')

  useEffect(() => {
    newImage()
  }, [])

  async function newImage() {
    const res = await fetch('/api/wikimedia-image')
    const url = await res.text()
    setSrc(url)
  }

  return (
    <div
      className={styles.randomImage}
      style={{ backgroundImage: `url(${src})` }}
    >
      <button onClick={newImage}>🔄</button>
    </div>
  )
}
