import React from "react"

export default function Button({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
    return (
        <button className="rounded-xl py-2 w-28 bg-red-600" onClick={onClick}>
            {children}
        </button>
    )
}