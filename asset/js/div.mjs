// // Hàm so sánh hai mảng chữ số
// function compareNumbers(arr1, arr2) {
//     if (arr1.length > arr2.length) {
//         return 1;
//     } else if (arr1.length < arr2.length) {
//         return -1;
//     } else {
//         for (let i = 0; i < arr1.length; i++) {
//             if (arr1[i] > arr2[i]) {
//                 return 1;
//             } else if (arr1[i] < arr2[i]) {
//                 return -1;
//             }
//         }
//         return 0;
//     }
// }
// // Hàm trừ hai mảng chữ số
// function subtractNumbers(arr1, arr2) {
//     let result = [];
//     let borrow = 0;

//     for (let i = arr1.length - 1; i >= 0; i--) {
//         let difference = arr1[i] - borrow;

//         if (i < arr2.length) {
//             difference -= arr2[i];
//         }

//         if (difference < 0) {
//             difference += 10;
//             borrow = 1;
//         } else {
//             borrow = 0;
//         }

//         result.unshift(difference);
//     }

//     // Xóa các chữ số 0 không cần thiết ở đầu
//     while (result.length > 1 && result[0] === 0) {
//         result.shift();
//     }

//     return result;
// }

// // hàm chia
// export function divideLargeNumbers(dividend, divisor) {
//     // Kiểm tra trường hợp đặc biệt khi số chia là 0
//     if (divisor === '0') {
//         throw new Error('Divisor cannot be zero.');
//     }

//     // Kiểm tra trường hợp đặc biệt khi số bị chia là 0
//     if (dividend === '0') {
//         return '0';
//     }

//     // Xác định dấu của kết quả
//     const isNegative =
//         (dividend[0] === '-' && divisor[0] !== '-') ||
//         (dividend[0] !== '-' && divisor[0] === '-');
//     dividend = dividend.replace('-', '');
//     divisor = divisor.replace('-', '');

//     // Chuyển chuỗi số thành mảng chữ số
//     const dividendArray = dividend.split('').map(Number);
//     const divisorArray = divisor.split('').map(Number);

//     // Xác định kết quả và phần dư ban đầu
//     let quotient = [];
//     let remainder = [];

//     for (let i = 0; i < dividendArray.length; i++) {
//         const digit = dividendArray[i];

//         // Thêm chữ số vào phần dư
//         remainder.push(digit);

//         // Kiểm tra xem phần dư có lớn hơn số chia không
//         if (compareNumbers(remainder, divisorArray) >= 0) {
//             let count = 0;

//             // Thực hiện phép nhân liên tiếp để tìm chữ số của phần nguyên
//             while (compareNumbers(remainder, divisorArray) >= 0) {
//                 remainder = subtractNumbers(remainder, divisorArray);
//                 count++;
//             }

//             // Thêm chữ số vào phần nguyên
//             quotient.push(count);
//         } else {
//             // Nếu phần dư nhỏ hơn số chia, thêm 0 vào phần nguyên
//             quotient.push(0);
//         }
//     }

//     // Xóa các chữ số 0 không cần thiết ở đầu phần nguyên
//     while (quotient.length > 1 && quotient[0] === 0) {
//         quotient.shift();
//     }

//     // Chuyển kết quả thành chuỗi và thêm dấu nếu cần
//     let result = quotient.join('');

//     if (isNegative) {
//         result = '-' + result;
//     }

//     return result;
// }
export function divideLargeIntegers(dividend, divisor) {
    // Chuyển đổi chuỗi thành mảng chữ số
    const dividendDigits = dividend.split('').map(Number);
    const divisorDigits = divisor.split('').map(Number);

    // Kiểm tra số chia có phải là 0 hay không
    if (divisorDigits.length === 1 && divisorDigits[0] === 0) {
        throw new Error('Không thể chia cho 0');
    }

    // Kiểm tra nếu số bị chia nhỏ hơn số chia
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
