// hàm nhân
export function multiplyStrings(num1, num2) {
    let isNegative = false;
    if (num1.charAt(0) === '-' && num2.charAt(0) !== '-') {
        isNegative = true;
        num1 = num1.slice(1);
    } else if (num1.charAt(0) !== '-' && num2.charAt(0) === '-') {
        isNegative = true;
        num2 = num2.slice(1);
    }

    const bigInt1 = num1.length;
    const bigInt2 = num2.length;

    const result = new Array(bigInt1 + bigInt2).fill(0);

    for (let i = bigInt1 - 1; i >= 0; i--) {
        for (let j = bigInt2 - 1; j >= 0; j--) {
            const mul_result = Number(num1[i]) * Number(num2[j]);
            const temp = result[i + j + 1] + mul_result;
            result[i + j + 1] = temp % 10;
            result[i + j] += Math.floor(temp / 10);
        }
    }

    let startIndex = 0;
    while (result[startIndex] === 0 && startIndex < result.length - 1) {
        startIndex++;
    }

    if (isNegative && result.length > startIndex) {
        return '-' + result.slice(startIndex).join('');
    } else {
        return result.length === startIndex
            ? '0'
            : result.slice(startIndex).join('');
    }
}
