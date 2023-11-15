export function divideLargeIntegers(dividend, divisor) {
    // Chuyển đổi chuỗi thành mảng chữ số
    const dividendDigits = dividend.split('').map(Number);
    const divisorDigits = divisor.split('').map(Number);

    // Kiểm tra số chia có phải là 0 hay không
    if (divisorDigits.length === 1 && divisorDigits[0] === 0) {
        throw new Error('Không thể chia cho 0');
    }

    if (dividendDigits.length < divisorDigits.length) {
        return '0';
    }

    // Khởi tạo các biến
    let quotient = [];
    let currentDividend = [];

    // Lặp qua từng chữ số của số bị chia
    for (let i = 0; i < dividendDigits.length; i++) {
        // Chia phần tử tiếp theo của số bị chia
        currentDividend.push(dividendDigits[i]);

        // Nếu số bị chia lớn hơn hoặc bằng số chia
        if (compareNumbers(currentDividend, divisorDigits) >= 0) {
            let digit = 0;

            // Thực hiện phép chia từng chữ số
            while (compareNumbers(currentDividend, divisorDigits) >= 0) {
                currentDividend = subtractNumbers(
                    currentDividend,
                    divisorDigits
                );
                digit++;
            }

            quotient.push(digit);
        } else {
            // Nếu số bị chia nhỏ hơn số chia, thêm 0 vào thương
            quotient.push(0);
        }
    }

    // Xóa các chữ số 0 dư thừa ở đầu kết quả thương
    while (quotient[0] === 0 && quotient.length > 1) {
        quotient.shift();
    }
    let sodu = currentDividend.join('');
    if (sodu != 0) {
        // Chuyển đổi kết quả thương thành chuỗi và trả về
        return quotient.join('') + ' dư ' + sodu;
    } else {
        return quotient.join('');
    }
}

// So sánh hai mảng chữ số
function compareNumbers(a, b) {
    if (a.length !== b.length) {
        return a.length - b.length;
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return a[i] - b[i];
        }
    }

    return 0;
}

// Trừ hai mảng chữ số
function subtractNumbers(a, b) {
    // Đảm bảo a là mảng dài hơn hoặc bằng b
    if (a.length < b.length) {
        [a, b] = [b, a]; // Hoán đổi a và b
    }

    let result = [];
    let borrow = 0;

    // Lặp qua từng chữ số của mảng a
    for (let i = a.length - 1, j = b.length - 1; i >= 0; i--, j--) {
        let digit = a[i] - borrow;
        borrow = 0;

        // Nếu còn các chữ số trong b, trừ đi chữ số tương ứng của b
        if (j >= 0) {
            digit -= b[j];
        }

        // Nếu chữ số âm, mượn 10 và ghi nhớ mượn (borrow)
        if (digit < 0) {
            digit += 10;
            borrow = 1;
        }

        result.unshift(digit);
    }

    // Xóa các chữ số 0 dư thừa ở đầu kết quả
    while (result[0] === 0 && result.length > 1) {
        result.shift();
    }

    return result;
}
