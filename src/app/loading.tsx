import { lato } from "./fonts";
export default function Loading() {
    return (
        <main className="min-w-screen flex min-h-screen touch-none items-center justify-center overflow-hidden">
            <div className={`text-5xl ${lato.className}`}>Loading...</div>
        </main>
    );
}
