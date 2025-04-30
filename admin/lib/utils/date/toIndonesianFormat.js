const idnDaysName = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
];
const idnMonthName = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

function twoPadStart(num) {
    return `${num}`.length === 1 ? `0${num}` : num;
}

function toIndonesanFormat(timeString, options) {
    const time = new Date(timeString);
    const day = idnDaysName[time.getDay()];
    const date = twoPadStart(time.getDate());
    const month = idnMonthName[time.getMonth()];
    const year = time.getFullYear();
    const hourMinute =
        twoPadStart(time.getHours()) + ':' + twoPadStart(time.getMinutes());

    if (options?.dmy) {
        return `${date} ${month} ${year}`;
    }
    return `${day}, ${date} ${month} ${year} ${hourMinute}`;
}

export default toIndonesanFormat;
