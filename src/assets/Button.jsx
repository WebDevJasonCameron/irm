export default function Button({ onClick, btnStyle, btnType = "button", children }) {
  return (
    <button className={ btnStyle ? btnStyle : 'button' }
            type={btnType}
            onClick={onClick}>
      {children}
    </button>
  )
}