function Information() {
    return (
        <div className="break-words text-slate-700">
            <div className="mb-5">
                <h2 className="text-md font-bold mb-2">Available Resources</h2>
                <p className="text-sm">media, admin, role</p>
            </div>
            <div className="">
                <h2 className="text-md font-bold mb-2">Descriptions</h2>
                <div className="text-sm">
                    <p className="mb-2">
                        <span className="font-medium">[resource]</span>
                        _* = can read, create, update, delete
                    </p>
                    <p className="mb-2">
                        <span className="font-medium">[resource]_read</span> = can read
                    </p>
                    <p className="mb-2">
                        <span className="font-medium">[resource]_create</span> = can create
                    </p>
                    <p className="mb-2">
                        <span className="font-medium">[resource]_update</span> = can update
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Information;
