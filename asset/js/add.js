// hàm cộng
export function addLargeIntegers(str1, str2) {
    // Đảm bảo str1 là chuỗi dài hơn (nếu không, hoán đổi)
    if (str1.length < str2.length) {
        [str1, str2] = [str2, str1];
    }

    // Bổ sung số 0 vào đầu chuỗi ngắn hơn
    while (str2.length < str1.length) {
        str2 = '0' + str2;
    }

    // Đặt biến lưu kết quả và biến nhớ
    let result = '';
    let carry = 0;

    // Thực hiện phép cộng từ cuối lên đầu
    for (let i = str1.length - 1; i >= 0; i--) {
        const digit1 = parseInt(str1[i], 10);
        const digit2 = parseInt(str2[i], 10);

        const sum = digit1 + digit2 + carry;
        const digitSum = sum % 10;
        carry = Math.floor(sum / 10);

        result = digitSum.toString() + result;
    }

    // Nếu còn phần nhớ cuối cùng, thêm vào kết quả
    if (carry > 0) {
        result = carry.toString() + result;
    }

    return result;
}
