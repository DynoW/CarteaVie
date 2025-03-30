interface UmamiTracker {
    track: (eventName: string, eventData?: Record<string, unknown>) => void;
}

declare global {
    interface Window {
        umami?: UmamiTracker;
    }
}

export { };