// hàm trừ
export function subtractLargeIntegers(str1, str2) {
    let isNegative = false;
    // Đảm bảo str1 là chuỗi lớn hơn hoặc bằng str2 (nếu không, hoán đổi)
    if (
        str1.length < str2.length ||
        (str1.length === str2.length && str1 < str2)
    ) {
        isNegative = true;
        [str1, str2] = [str2, str1];
    }

    // Bổ sung số 0 vào đầu chuỗi ngắn hơn
    while (str2.length < str1.length) {
        str2 = '0' + str2;
    }

    // Đặt biến lưu kết quả và biến vay (mượn)
    let result = '';
    let borrow = 0;

    // Thực hiện phép trừ từ cuối lên đầu
    for (let i = str1.length - 1; i >= 0; i--) {
        const digit1 = parseInt(str1[i], 10);
        const digit2 = parseInt(str2[i], 10);

        // Áp dụng phép trừ và xem xét biến vay
        let diff = digit1 - digit2 - borrow;
        if (diff < 0) {
            diff += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }

        result = diff.toString() + result;
    }

    // Loại bỏ các ký tự '0' ở đầu kết quả nếu có
    while (result.charAt(0) === '0' && result.length > 1) {
        result = result.substring(1);
    }

    return isNegative ? '-' + result : result;
}
