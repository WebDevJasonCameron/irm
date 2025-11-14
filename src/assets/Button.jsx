export default function Button({ onClick, btnStyle, children }) {
  return (
    <button className={ btnStyle ? btnStyle : 'button' }
            onClick={onClick}>
      {children}
    </button>
  )
}