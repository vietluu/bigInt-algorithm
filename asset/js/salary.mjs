import { addLargeIntegers } from './add.mjs';
import { divideLargeIntegers } from './div.mjs';
const form = document.querySelector('form');
let json = null;
const totalSalary = document.querySelector('#total-salary');
const averageSalary = document.querySelector('#average-salary');

form.addEventListener('change', (event) => {
    event.preventDefault();
    const file = document.querySelector('#file').files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        json = XLSX.utils.sheet_to_json(worksheet);
        const tableBody = document.querySelector('#table-body');
        const pagination = document.querySelector('#pagination');
        const rowsPerPage = 10;
        let currentPage = 1;
        let totalPages = Math.ceil(json.length / rowsPerPage);
        let currentData = json.slice(0, rowsPerPage);
        tableBody.innerHTML = '';
        currentData.forEach((row, index) => {
            const tr = document.createElement('tr');
            const indexTd = document.createElement('td');
            indexTd.textContent = row.index;
            const nameTd = document.createElement('td');
            nameTd.textContent = row.name;
            const salaryTd = document.createElement('td');
            salaryTd.textContent = String(row.salary);
            tr.appendChild(indexTd);
            tr.appendChild(nameTd);
            tr.appendChild(salaryTd);
            tableBody.appendChild(tr);
        });
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', () => {
                currentPage = i;
                currentData = json.slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                );
                tableBody.innerHTML = '';
                currentData.forEach((row, index) => {
                    const tr = document.createElement('tr');
                    const indexTd = document.createElement('td');
                    indexTd.textContent = row.index;
                    const nameTd = document.createElement('td');
                    nameTd.textContent = row.name;
                    const salaryTd = document.createElement('td');
                    salaryTd.textContent = String(row.salary);
                    tr.appendChild(indexTd);
                    tr.appendChild(nameTd);
                    tr.appendChild(salaryTd);
                    tableBody.appendChild(tr);
                });
            });
            pagination.appendChild(button);
        }
    };

    reader.readAsArrayBuffer(file);
});
form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(json);
    totalSalary.innerHTML = '';
    // const total = json.reduce((acc, row) => acc + row.salary, 0);
    let total = '';
    const length = json.length;
    for (let i = 0; i < length; i++) {
        total = addLargeIntegers(total, json[i].salary.toString());
    }
    const totalSalaryText = `Tổng lương: ${total}`;
    const average = divideLargeIntegers(total, length.toString());
    totalSalary.textContent = totalSalaryText;
    averageSalary.textContent = `Trung bình lương: ${average}`;
});
