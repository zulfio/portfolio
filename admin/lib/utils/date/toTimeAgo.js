import { format, register } from 'timeago.js';

const localeFunc = (number, index) => {
    return [
        ['baru saja', 'right now'],
        ['%s detik yang lalu', 'in %s seconds'],
        ['1 menit yang lalu', 'in 1 minute'],
        ['%s menit yang lalu', 'in %s minutes'],
        ['1 jam yang lalu', 'in 1 hour'],
        ['%s jam yang lalu', 'in %s hours'],
        ['1 hari yang lalu', 'in 1 day'],
        ['%s hari yang lalu', 'in %s days'],
        ['1 minggu yang lalu', 'in 1 week'],
        ['%s minggu yang lalu', 'in %s weeks'],
        ['1 bulan yang lalu', 'in 1 month'],
        ['%s bulan yang lalu', 'in %s months'],
        ['1 tahun yang lalu', 'in 1 year'],
        ['%s tahun yang lalu', 'in %s years'],
    ][index];
};

function toTimeAgo(time) {
    register('idn', localeFunc);
    return format(time, 'idn');
}

export default toTimeAgo;