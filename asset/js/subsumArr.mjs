function add(arr1, arr2) {
    if (arr1.length < arr2.length) {
        [arr1, arr2] = [arr2, arr1];
    }

    // Bổ sung số 0 vào đầu mảng ngắn hơn
    while (arr2.length < arr1.length) {
        arr2.unshift(0);
    }

    // Đặt biến lưu kết quả và biến nhớ
    let result = [];
    let carry = 0;

    // Thực hiện phép cộng từ cuối lên đầu
    for (let i = arr1.length - 1; i >= 0; i--) {
        const digit1 = arr1[i];
        const digit2 = arr2[i];

        const sum = digit1 + digit2 + carry;
        const digitSum = sum % 10;
        carry = Math.floor(sum / 10);

        result.unshift(digitSum);
    }

    // Nếu còn phần nhớ cuối cùng, thêm vào kết quả
    if (carry > 0) {
        result.unshift(carry);
    }

    return result;
}

const sub = (arr1, arr2) => {
    let isNegative = false;
    // Đảm bảo arr1 là mảng lớn hơn hoặc bằng arr2 (nếu không, hoán đổi)
    if (
        arr1.length < arr2.length ||
        (arr1.length === arr2.length && arr1.join('') < arr2.join(''))
    ) {
        isNegative = true;
        [arr1, arr2] = [arr2, arr1];
    }

    // Bổ sung số 0 vào đầu mảng ngắn hơn
    while (arr2.length < arr1.length) {
        arr2.unshift(0);
    }

    // Đặt biến lưu kết quả và biến vay (mượn)
    let result = [];
    let borrow = 0;

    // Thực hiện phép trừ từ cuối lên đầu
    for (let i = arr1.length - 1; i >= 0; i--) {
        const digit1 = arr1[i];
        const digit2 = arr2[i];

        // Áp dụng phép trừ và xem xét biến vay
        let diff = digit1 - digit2 - borrow;
        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }

        result.unshift(diff);
    }

    // Loại bỏ các số 0 không cần thiết ở đầu kết quả
    while (result[0] === 0 && result.length > 1) {
        result.shift();
    }

    return isNegative ? ['-', ...result] : result;
};

export function addLargeIntegersArr(arr1, arr2) {
    if (arr1[0] === '-' && arr2[0] === '-') {
        arr1.shift();
        arr2.shift();
        return '-' + add(arr1, arr2).join('');
    } else if (arr1[0] === '-') {
        arr1.shift();
        return sub(arr1, arr2).join('');
    } else if (arr2[0] === '-') {
        arr2.shift();
        return sub(arr1, arr2).join('');
    }
    return add(arr1, arr2);
}

// hàm trừ
export function subtractLargeIntegersArr(arr1, arr2) {
    if (arr1[0] === '-' && arr2[0] === '-') {
        arr1.shift();
        arr2.shift();
        return sub(arr2, arr1).join('');
    } else if (arr2[0] === '-') {
        arr2.shift();
        return add(arr1, arr2).join('');
    } else if (arr1[0] === '-') {
        arr1.shift();
        return '-' + add(arr1, arr2).join('');
    }
    return sub(arr1, arr2);
}

// console.log(addLargeIntegersArr('-12', '349'));
