import styles from '../styles/Question.module.scss'
import { dbClient, analyticsClient } from '../firebase'
import { firestore } from 'firebase/app'
import EditableSpan from './EditableSpan'

export default ({
  question,
}: {
  question: {
    text: string
    answer: string
    id: string
    created: firestore.Timestamp
  }
}): JSX.Element => {
  async function triggerDelete() {
    if (confirm(`Are you sure you want to delete "${question.text}"?`)) {
      await dbClient.collection('questions').doc(question.id).delete()
      analyticsClient.logEvent('delete_question')
    }
  }

  async function updateText(text: string) {
    // if text hasn't been changed, don't do anything
    if (text === question.text) return
    const ref = dbClient.collection('questions').doc(question.id)
    // delete if the question is blank
    if (!text.trim()) return await ref.delete()
    // otherwise just change the text!
    await ref.update({ text: text.trim() })
  }

  async function updateAnswer(answer: string) {
    if (answer === question.answer) return
    const ref = dbClient.collection('questions').doc(question.id)
    if (!answer.trim())
      return await ref.update({ answer: firestore.FieldValue.delete() })
    await ref.update({ answer: answer.trim() })
  }

  return (
    <li>
      <div className={styles.question}>
        <span onClick={triggerDelete} className={styles.delete}>
          ❌
        </span>
        <EditableSpan text={question.text} setText={updateText} />
      </div>
      <div className={styles.answer}>
        <EditableSpan text={question.answer} setText={updateAnswer} />
      </div>
    </li>
  )
}
