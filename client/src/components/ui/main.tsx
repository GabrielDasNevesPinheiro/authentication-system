import * as React from "react";

interface MainProps extends React.HTMLAttributes<HTMLDivElement> {};

const MainDiv = React.forwardRef<HTMLDivElement, MainProps>(
    ({children, className, ...props}, ref) => {
        return (
            <div className={`flex min-h-screen flex-col items-center justify-between text-4xl ${className}`} ref={ref} {...props}>
                {children}
            </div>
        )
    }
)

MainDiv.displayName = "MainDiv";

export default MainDiv;