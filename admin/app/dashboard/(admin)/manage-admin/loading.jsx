export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="flex items-center gap-5 mb-7 mt-3 sm:mb-10">
                <div className="bg-slate-200 rounded-full h-5 w-full max-w-xs"></div>
            </div>
            <div className="w-full h-52 bg-slate-200 rounded-lg"></div>
        </div>
    );
}
