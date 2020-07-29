import styles from '../styles/Question.module.scss'
import { useState } from 'react'
import classNames from 'classnames'
import { dbClient, analyticsClient } from '../firebase'
import { isTimestampToday } from '../utils'
import { firestore } from 'firebase/app'

export default ({
  question,
}: {
  question: { text: string; id: string; created: firestore.Timestamp }
}): JSX.Element => {
  const [hovered, setHovered] = useState(false)

  async function triggerDelete() {
    if (confirm(`Are you sure you want to delete "${question.text}"?`)) {
      await dbClient.collection('questions').doc(question.id).delete()
      analyticsClient.logEvent('delete_question')
    }
  }

  async function triggerUpdate(text: string) {
    // if text hasn't been changed, don't do anything
    if (text === question.text) return
    const ref = dbClient.collection('questions').doc(question.id)
    // delete if the question is blank
    if (!text.trim()) return await ref.delete()
    // otherwise just change the text!
    await ref.update({ text: text.trim() })
  }

  const DeleteButton = () => (
    <span onClick={triggerDelete} className={styles.delete}>
      ❌
    </span>
  )

  return (
    <li
      className={classNames(styles.question, {
        [styles.hovered]: hovered,
        [styles.today]: isTimestampToday(question.created),
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <DeleteButton />
      <span
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => triggerUpdate(e.currentTarget.textContent)}
        onKeyDown={(e) => {
          // hitting enter doesn't do anything
          if (e.keyCode === 13 || e.which === 13) {
            e.preventDefault()
            triggerUpdate(e.currentTarget.textContent)
          }
        }}
      >
        {question.text}
      </span>
    </li>
  )
}
