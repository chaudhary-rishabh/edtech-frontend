type Props = {
    value: number // 0..100
    "aria-label"?: string
    className?: string
}

export function ProgressBar({ value, className, ...rest }: Props) {
    const clamped = Math.max(0, Math.min(100, value))
    return (
        <div
            className={["h-2 w-full rounded-full bg-muted", className].filter(Boolean).join(" ")}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(clamped)}
            {...rest}
        >
            <div className="h-2 rounded-full bg-teal-500" style={{ width: `${clamped}%` }} />
        </div>
    )
}
