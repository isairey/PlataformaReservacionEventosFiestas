"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateToMMDDYY = formatDateToMMDDYY;
function formatDateToMMDDYY(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-4); // Get last two digits of the year
    return `${month}/${day}/${year}`;
}
