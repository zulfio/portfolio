export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="flex items-center gap-5 mb-7 mt-3 sm:mb-10">
                <div className="bg-slate-200 rounded-full h-5 w-full max-w-xs"></div>
            </div>
            <div className="mb-9">
                <div className="flex items-center gap-2">
                    <div className="bg-slate-200 rounded-full h-5 w-full max-w-xs"></div>
                    <div className="bg-slate-200 rounded-full h-5 w-full max-w-xs"></div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array(10)
                    .fill()
                    .map((_, i) => (
                        <div key={i} className="w-52 h-52 bg-slate-200 rounded-lg"></div>
                    ))}
            </div>
        </div>
    );
}
