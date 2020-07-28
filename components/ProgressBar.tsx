import styles from '../styles/ProgressBar.module.scss'
import classNames from 'classnames'

export default ({
  bars,
  className,
  style,
}: {
  bars: {
    color: string
    progress: number // in decimal
  }[]
  className?: string
  style?: React.CSSProperties
}): JSX.Element => (
  <div className={classNames(className, styles.outer)} style={style}>
    {bars.map(({ color, progress }, i) => (
      <div
        key={i}
        className={styles.inner}
        style={{
          width: `${Math.min(progress, 1) * 100}%`,
          backgroundColor: color,
        }}
      />
    ))}
  </div>
)
