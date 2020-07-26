import { AllHistory } from '../components/QuestionHistory'
import Link from 'next/link'

export default (): JSX.Element => (
  <>
    <Link href="/" passHref>
      <a>← back to main page</a>
    </Link>
    <AllHistory />
    <Link href="/" passHref>
      <a>← back to main page</a>
    </Link>
  </>
)
