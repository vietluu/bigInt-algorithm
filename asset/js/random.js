// hàm lấy số ngẫu nhiên
export function getRandomLargeIntegersInRange(minDigits, maxDigits) {
    const digits =
        Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;
    let result = '';

    // Đảm bảo rằng số đầu tiên không phải là 0
    const firstDigit = Math.floor(Math.random() * 9) + 1; // Số ngẫu nhiên từ 1 đến 9
    result += firstDigit;

    for (let i = 1; i < digits; i++) {
        const digit = Math.floor(Math.random() * 10); // Số ngẫu nhiên từ 0 đến 9
        result += digit;
    }

    return result;
}
