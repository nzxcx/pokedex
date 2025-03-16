interface ErrorDisplayProps {
  message?: string
}

export function ErrorDisplay({ message = "An error occurred" }: ErrorDisplayProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-destructive">{message}</p>
    </div>
  )
} 
