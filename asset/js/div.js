// Hàm so sánh hai mảng chữ số
function compareNumbers(arr1, arr2) {
    if (arr1.length > arr2.length) {
        return 1;
    } else if (arr1.length < arr2.length) {
        return -1;
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] > arr2[i]) {
                return 1;
            } else if (arr1[i] < arr2[i]) {
                return -1;
            }
        }
        return 0;
    }
}
// Hàm trừ hai mảng chữ số
function subtractNumbers(arr1, arr2) {
    let result = [];
    let borrow = 0;

    for (let i = arr1.length - 1; i >= 0; i--) {
        let difference = arr1[i] - borrow;

        if (i < arr2.length) {
            difference -= arr2[i];
        }

        if (difference < 0) {
            difference += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }

        result.unshift(difference);
    }

    // Xóa các chữ số 0 không cần thiết ở đầu
    while (result.length > 1 && result[0] === 0) {
        result.shift();
    }

    return result;
}

// hàm chia
export function divideLargeNumbers(dividend, divisor) {
    // Kiểm tra trường hợp đặc biệt khi số chia là 0
    if (divisor === '0') {
        throw new Error('Divisor cannot be zero.');
    }

    // Kiểm tra trường hợp đặc biệt khi số bị chia là 0
    if (dividend === '0') {
        return '0';
    }

    // Xác định dấu của kết quả
    const isNegative =
        (dividend[0] === '-' && divisor[0] !== '-') ||
        (dividend[0] !== '-' && divisor[0] === '-');
    dividend = dividend.replace('-', '');
    divisor = divisor.replace('-', '');

    // Chuyển chuỗi số thành mảng chữ số
    const dividendArray = dividend.split('').map(Number);
    const divisorArray = divisor.split('').map(Number);

    // Xác định kết quả và phần dư ban đầu
    let quotient = [];
    let remainder = [];

    for (let i = 0; i < dividendArray.length; i++) {
        const digit = dividendArray[i];

        // Thêm chữ số vào phần dư
        remainder.push(digit);

        // Kiểm tra xem phần dư có lớn hơn số chia không
        if (compareNumbers(remainder, divisorArray) >= 0) {
            let count = 0;

            // Thực hiện phép nhân liên tiếp để tìm chữ số của phần nguyên
            while (compareNumbers(remainder, divisorArray) >= 0) {
                remainder = subtractNumbers(remainder, divisorArray);
                count++;
            }

            // Thêm chữ số vào phần nguyên
            quotient.push(count);
        } else {
            // Nếu phần dư nhỏ hơn số chia, thêm 0 vào phần nguyên
            quotient.push(0);
        }
    }

    // Xóa các chữ số 0 không cần thiết ở đầu phần nguyên
    while (quotient.length > 1 && quotient[0] === 0) {
        quotient.shift();
    }

    // Chuyển kết quả thành chuỗi và thêm dấu nếu cần
    let result = quotient.join('');

    if (isNegative) {
        result = '-' + result;
    }

    return result;
}
