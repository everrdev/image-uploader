export default function Button({ onClick, text }) {
    return <div className="button" onClick={onClick}>{text}</div>
}