interface ErrorDisplayProps {
    message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
    return (
        <div className="flex justify-center items-center h-64 text-red-500 bg-red-100 rounded-md border border-red-300 p-4">
            <p className="text-lg font-semibold">{message}</p>
        </div>
    );
}