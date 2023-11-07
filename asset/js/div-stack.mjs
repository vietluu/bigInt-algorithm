export function divideLargeIntegersStack(dividend, divisor) {
    const dividendDigits = dividend.toString().split('').map(Number);
    const divisorDigits = divisor.toString().split('').map(Number);

    if (divisorDigits.length === 1 && divisorDigits[0] === 0) {
        throw new Error('Divisor cannot be zero.');
    }

    if (compareNumbers(dividendDigits, divisorDigits) < 0) {
        return '0';
    }

    var quotientStack = [];
    var remainderStack = [];

    for (let i = 0; i < dividendDigits.length; i++) {
        remainderStack.push(dividendDigits[i]);

        if (compareNumbers(remainderStack, divisorDigits) >= 0) {
            let digit = 0;

            while (compareNumbers(remainderStack, divisorDigits) >= 0) {
                remainderStack = subtractNumbers(remainderStack, divisorDigits);
                digit++;
            }

            quotientStack.push(digit);
        } else {
            quotientStack.push(0);
        }
    }

    // Xóa các chữ số 0 dư thừa ở đầu kết quả
    while (quotientStack[0] === 0 && quotientStack.length > 1) {
        quotientStack.shift();
    }
    let sodu = remainderStack.join('');
    if (sodu != 0) {
        // Chuyển đổi kết quả thương thành chuỗi và trả về
        return quotientStack.join('') + ' dư ' + sodu;
    } else {
        return quotientStack.join('');
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
    if (a.length < b.length) {
        [a, b] = [b, a];
    }

    let result = [];
    let borrow = 0;

    for (let i = a.length - 1, j = b.length - 1; i >= 0; i--, j--) {
        let digit = a[i] - borrow;
        borrow = 0;

        if (j >= 0) {
            digit -= b[j];
        }

        if (digit < 0) {
            digit += 10;
            borrow = 1;
        }

        result.unshift(digit);
    }

    while (result[0] === 0 && result.length > 1) {
        result.shift();
    }

    return result;
}
