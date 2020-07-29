import styles from '../styles/Question.module.scss'
import { dbClient, analyticsClient } from '../firebase'
import { firestore } from 'firebase/app'

export default ({
  question,
}: {
  question: { text: string; id: string; created: firestore.Timestamp }
}): JSX.Element => {
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

  return (
    <li className={styles.question}>
      <span onClick={triggerDelete} className={styles.delete}>
        ❌
      </span>
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
