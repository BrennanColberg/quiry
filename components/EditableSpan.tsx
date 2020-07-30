export default ({
  text,
  setText,
}: {
  text: string
  setText: (newText: string) => void
}): JSX.Element => {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => setText(e.currentTarget.textContent.trim())}
      onKeyDown={(e) => {
        // hitting enter doesn't do anything
        if (e.keyCode === 13 || e.which === 13) {
          e.preventDefault()
          setText(e.currentTarget.textContent.trim())
        }
      }}
    >
      {text}
    </span>
  )
}
