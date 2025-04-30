import { ArrowPathIcon } from '@heroicons/react/20/solid'

function LoadingOverlay() {
    return (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center cursor-progress">
            <ArrowPathIcon className="animate-spin h-10 w-10 text-white" />
        </div>
    )
}

export default LoadingOverlay