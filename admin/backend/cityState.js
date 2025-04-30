"use server";

export async function reqGetProvinsi() {
    const req = await fetch(`${process.env.REGION_API_URL}/provinsi`);
    return req.json();
}

export async function reqGetKabupatenKota(IDProvinsi) {
    const req = await fetch(`${process.env.REGION_API_URL}/kabupaten_kota/${IDProvinsi}`);
    return req.json();
}

export async function reqGetKecamatan(IDKabupatenKota) {
    const req = await fetch(`${process.env.REGION_API_URL}/kecamatan/${IDKabupatenKota}`);
    return req.json();
}

export async function reqGetNegara() {
    const req = await fetch(`${process.env.REGION_API_URL}/negara`);
    return req.json();
}