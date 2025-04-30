import { Button, Dialog, DialogPanel } from "@tremor/react";

function DeleteModal({ isModalOpen, setIsModalOpen, label, title = "Data", isLoading, onDelete = () => {} }) {
    return (
        <Dialog open={isModalOpen} onClose={(val) => setIsModalOpen(val)}>
            <DialogPanel className="text-center">
                <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    Delete this {title}?
                </h3>
                <p className="mt-2 text-tremor-title text-tremor-content dark:text-dark-tremor-content">{label}</p>
                <p className="mt-2 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                    The deleted {title} cannot be restored.
                </p>
                <div className="flex justify-between gap-5 mt-8">
                    <Button variant="secondary" className="flex-1" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button className="flex-1" onClick={onDelete} disabled={isLoading}>
                        Delete
                    </Button>
                </div>
            </DialogPanel>
        </Dialog>
    );
}

export default DeleteModal;
