interface ErrorDisplayProps {
    message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className="text-center p-4 bg-red-100 text-red-800 rounded-md text-sm sm:text-base">
            <p>{message}</p>
        </div>
    );
}