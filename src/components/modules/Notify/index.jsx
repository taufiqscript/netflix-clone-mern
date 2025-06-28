import { useEffect } from "react"

const Notify = ({ message, style, onClose }) => {
    useEffect(() => {
        if (message && onClose) {
            const timer = setTimeout(() => {
                onClose()
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [message, onClose])

    if (!message) return null

    return (
        <div className="relative z-50 ">
            <div className={`toast toast-center ${style}`}>
                <div className="alert bg-black text-white text-xs text-center">
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}

export default Notify