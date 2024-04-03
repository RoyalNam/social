export const formatNumber = (number: number) => {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1000000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return (number / 1000000).toFixed(1) + 'M';
    }
};
export const applyFilters = (imgUrl: string, filters: any) => {
    const filterString = `brightness(${filters.brightness / 100 + 0.5}) contrast(${
        filters.contrast / 100 + 0.5
    }) saturate(${filters.saturate}%) hue-rotate(${(filters.hue_rotate - 50) * 3.6}deg) sepia(${filters.sepia}%)`;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        const img = new Image();
        img.src = imgUrl;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.filter = filterString;
            ctx.drawImage(img, 0, 0);

            const filteredImgUrl = canvas.toDataURL();
            return filteredImgUrl;
        };
    }
    return '';
};
export const timeAgoFromPast = (pastTime: Date) => {
    var currentTime = new Date();
    var timeDifference = currentTime.getTime() - pastTime.getTime();

    var secondsAgo = Math.floor(timeDifference / 1000);
    var minutesAgo = Math.floor(secondsAgo / 60);
    var hoursAgo = Math.floor(minutesAgo / 60);
    var daysAgo = Math.floor(hoursAgo / 24);
    var monthsAgo = Math.floor(daysAgo / 30);
    var yearsAgo = Math.floor(monthsAgo / 12);

    if (yearsAgo > 0) {
        return yearsAgo + ' year' + (yearsAgo > 1 ? 's' : '') + ' ago';
    } else if (monthsAgo > 0) {
        return monthsAgo + ' month' + (monthsAgo > 1 ? 's' : '') + ' ago';
    } else if (daysAgo > 0) {
        return daysAgo + ' day' + (daysAgo > 1 ? 's' : '') + ' ago';
    } else if (hoursAgo > 0) {
        return hoursAgo + ' hour' + (hoursAgo > 1 ? 's' : '') + ' ago';
    } else if (minutesAgo > 0) {
        return minutesAgo + ' min' + (minutesAgo > 1 ? 's' : '') + ' ago';
    } else {
        return secondsAgo + ' second' + (secondsAgo > 1 ? 's' : '') + ' ago';
    }
};
