import ROUTES from "@/config/ROUTES";
import { useAsset } from "@/lib/hooks/asset.hook";
import { Button, Dialog, DialogPanel } from "@tremor/react"

/**
 * QRModal component renders a modal dialog displaying a QR code.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {function} props.setIsOpen - Function to set the modal open state.
 * @param {string} props.qrCode - The URL of the QR code image to display.
 * @returns {JSX.Element} The QRModal component.
 */
function QRModal({ isOpen, setIsOpen, asset }) {
    const { data, isSuccess, isLoading } = useAsset(asset?._id, { withQR: true });
    if (!asset) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            static={true}
            className="z-[100]"
        >
            <DialogPanel className="max-w-xs text-slate-800">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="text-lg font-semibold">QR Code</h3>
                </div>

                {isLoading && <p>Loading...</p>}

                {isSuccess && (
                    <>
                        <div className="flex justify-center">
                            <img src={data.qrData} alt="QR Code" className="w-full h-auto" />
                        </div>

                        <div className="flex justify-center mt-5 gap-5">
                            <a download={`${asset?.name}.png`} href={data.qrData} className="outline-none focus:outline-none">
                                <Button color="emerald" type="button">Download</Button>
                            </a>
                            <a
                                href={`${ROUTES.ASSET_DETAIL_PUBLIC}/${asset?._id}`}
                                className="outline-none focus:outline-none"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button color="slate" type="button">Lihat</Button>
                            </a>
                        </div>
                    </>
                )}
            </DialogPanel>
        </Dialog>

    )
}

export default QRModal