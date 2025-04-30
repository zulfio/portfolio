import "@/assets/css/paper.css";
import { formatIndonesianCurrency } from "@/lib/utils/string";
import DateAndTime from "date-and-time";

async function Print({ params }) {
    const reqGetPengajuan = await fetch(`${process.env.API_URL}/api/v1/funding-application/${params.id}`, { cache: 'no-store' });
    const { success, fundingApplication } = await reqGetPengajuan.json();

    if (!success) {
        return <h1>Ooops... ada kesalahan. Langsung kasih tau tim IT plis...</h1>;
    }

    return (
        <div className="A4 print">
            <section className="sheet padding-10mm">
                <div className="border">
                    <div className="grid grid-cols-10 items-center  gap-4">
                        <img className="col-span-3 w-24" src="/static/logo_laziswaf.jpg" alt="logo" />
                        <h1 className="col-span-4 text-lg font-bold text-rose-600 text-center">
                            PERMOHONAN PENGELUARAN DANA
                        </h1>
                        <p className="col-span-3 text-xs">
                            <span className="font-medium">No PPD:</span>{" "}
                            <b className="text-[11px]">{fundingApplication.ppdNumber}</b>
                        </p>
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <b>Pemohon:</b>
                                </td>
                                <td>{fundingApplication.employee?.name}</td>
                                <td>
                                    <b>Divisi:</b> {fundingApplication.employee?.division}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Jabatan:</b>
                                </td>
                                <td>{fundingApplication.employee?.position}</td>
                                <td>
                                    <b>Tanggal: </b>
                                    {DateAndTime.format(new Date(fundingApplication.createdAt), "DD MMMM YYYY")}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Jumlah Dana:</b>
                                </td>
                                <td colSpan="2">{formatIndonesianCurrency(fundingApplication.totalAmount)}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Keterangan Pengajuan Dana:</b>
                                </td>
                                <td colSpan="2" className="normal-case">
                                    {fundingApplication?.description}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Dari Dana:</b>
                                </td>
                                <td colSpan="2">{fundingApplication.amountSource}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Dana Untuk:</b>
                                </td>
                                <td colSpan="2">{fundingApplication.program}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Dibayarkan kepada:</b>
                                </td>
                                <td colSpan="2">{fundingApplication.payTo}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Type Pembayaran:</b>
                                </td>
                                <td colSpan="2">{fundingApplication.paymentMethod}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Informasi Rekening:</b>
                                </td>
                                <td colSpan="2">{fundingApplication?.paymentCredentials}</td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Uang Muka{" "}
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={fundingApplication.applicationType === "uang_muka" ? true : false}
                                            readOnly
                                        />
                                    </b>
                                </td>
                                <td>
                                    <b>
                                        Reimbursment{" "}
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={fundingApplication.applicationType === "reimbursement" ? true : false}
                                            readOnly
                                        />
                                    </b>
                                </td>
                                <td>
                                    <b>
                                        Pembayaran{" "}
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={fundingApplication.applicationType === "pembayaran" ? true : false}
                                            readOnly
                                        />
                                    </b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Program{" "}
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={fundingApplication.applicationType === "program" ? true : false}
                                            readOnly
                                        />
                                    </b>
                                </td>
                                <td>
                                    <b>
                                        Lain-lain{" "}
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            checked={fundingApplication.applicationType == "lainnya" ? true : false}
                                            readOnly
                                        />
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <table>
                        <tbody>
                            <tr>
                                <td rowSpan="2"></td>
                                <td className="text-center" rowSpan="2">
                                    <b>Pemohon</b>
                                </td>
                                <td className="text-center" colSpan="2" rowSpan="2">
                                    <b>Disetujui Oleh</b>
                                </td>
                                <td className="text-center" colSpan="2">
                                    <b>Divisi Keuangan</b>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">
                                    <b>Pemeriksa</b>
                                </td>
                                <td className="text-center">
                                    <b>Disetujui Oleh</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Tanggal</b>
                                </td>
                                <td style={{ fontSize: "12px" }}>
                                    {DateAndTime.format(new Date(fundingApplication.createdAt), "DD MMMM YYYY")}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Tanda Tangan</b>
                                </td>
                                <td className="tanda-tangan">
                                    {fundingApplication.employee?.signature ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${fundingApplication.employee?.signature?.path}`}
                                            className="w-full"
                                            alt="tanda tangan"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td className="tanda-tangan">
                                    {fundingApplication.acceptedByManager && fundingApplication.approvedBy?.signature ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${fundingApplication.approvedBy?.signature?.path}`}
                                            className="w-full"
                                            alt="tanda tangan"
                                        />
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td className="tanda-tangan">
                                    {fundingApplication.acceptedByDirector ? (
                                        <img src="/static/ttd_direktur.jpeg" className="w-full" alt="tanda tangan" />
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td className="tanda-tangan"></td>
                                <td className="tanda-tangan"></td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Nama</b>
                                </td>
                                <td className="uppercase" style={{ fontSize: "12px" }}>
                                    {fundingApplication.employee.name}
                                </td>
                                <td className="uppercase" style={{ fontSize: "12px" }}>
                                    {fundingApplication.approvedBy.name}
                                </td>
                                <td className="uppercase" style={{ fontSize: "12px" }}>
                                    IWAN SETIAWAN
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Jabatan</b>
                                </td>
                                <td className="uppercase text-xs" style={{ fontSize: "12px" }}>
                                    {fundingApplication.employee.title}
                                </td>
                                <td>MANAGER</td>
                                <td>DIREKTUR</td>
                                <td></td>
                                <td>
                                    <b></b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-20">
                    <h1 className="text-2xl font-bold">SEMANGAT BEKERJA</h1>
                </div>
            </section>
        </div>
    )
}

export default Print;
