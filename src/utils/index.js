export function getCount(num) {
    num = +num;
    if (num < 10000) {
        return num;
    } else {
        return `${Math.round(num / 10000)}万`;
    }
}

export function getDate(time, split = '-') {
    const date = new Date(time);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}${split}${month}${split}${day}`;
}

export function getAuthor(authors) {
    let result = '';
    for (let i = 0; i < authors.length; i++) {
        result += authors[i].name + ' / ';
    }
    return result.slice(0, -3);
}

export function getDuration(duration, unit = 'ms') {
    if (!duration) {
        return '00:00';
    }

    duration = +duration;

    let minute, second;
    if (unit === 's') {
        minute = Math.floor(duration / 60);
        second = Math.round(duration % 60);
    } else if (unit === 'ms') {
        minute = Math.floor(duration / (60 * 1000));
        second = Math.round((duration % (60 * 1000)) / 1000);
    }

    if (minute < 10) {
        minute = `0${minute}`;
    }
    if (second < 10) {
        second = `0${second}`;
    }

    return `${minute}:${second}`;
}
