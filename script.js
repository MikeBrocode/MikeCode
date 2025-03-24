// Add this at the beginning of your script.js
if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = 'login.html';
}

// Add logout functionality
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", () => {
    // Add logout button to your header
    const header = document.querySelector('header');
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'logout-btn';
    logoutBtn.onclick = logout;
    header.appendChild(logoutBtn);

    const transactions = {
        SSS: [
            { text: "New member online registration – ₱200 + print", price: 200, print: true },
            { text: "Online Account Recovery – ₱100", price: 100 },
            { text: "Web Registration (online account creation) – ₱150", price: 150 },
            { text: "Maternity – ₱100", price: 100 },
            { text: "Sickness Benefit – ₱100", price: 100 },
            { text: "Unemployment Benefit – ₱100 + print", price: 100, print: true },
            { text: "Disability Claim – ₱100", price: 100 },
            { text: "Retirement Claim – ₱100", price: 100 },
            { text: "Funeral Claim – ₱100", price: 100 },
            { text: "Death Claim – ₱100", price: 100 },
            { text: "Salary Loan – ₱100 + print", price: 100, print: true },
            { text: "Calamity Loan – ₱100 + print", price: 100, print: true },
            { text: "Pension Loan – ₱100 + print", price: 100, print: true },
            { text: "Loan Penalty Condonation – ₱100 + print", price: 100, print: true },
            { text: "Disbursement Account Submission – ₱100", price: 100 },
            { text: "PRN Contribution – ₱50 + print", price: 50, print: true },
            { text: "PRN Loans – ₱50 + print", price: 50, print: true }
        ],
        PHILHEALTH: [
            { text: "Creation of PhilHealth Online Account – ₱150", price: 150 },
            { text: "Printing of Member Data Form (MDF) – print", price: 50, print: true },
            { text: "Statement of Premium Account (SPA) – print", price: 50, print: true }
        ],
        PAGIBIG: [
            { text: "Pag-Ibig New Member Registration – ₱150 + print", price: 150, print: true },
            { text: "Creation of Virtual Pag-Ibig Account – ₱200", price: 200 },
            { text: "Multi-purpose Loan – ₱100 + print", price: 100, print: true },
            { text: "Housing Loan – ₱100 + print", price: 100, print: true },
            { text: "Calamity Loan – ₱100 + print", price: 100, print: true }
        ]
    };

    function updateTransactionTypes() {
        const transactionCategory = document.getElementById("transactionCategory");
        const transactionType = document.getElementById("transactionType");
        const selectedCategory = transactionCategory.value;
        
        transactionType.innerHTML = '<option value="" disabled selected>Select transaction type</option>';

        if (transactions[selectedCategory]) {
            transactions[selectedCategory].forEach(option => {
                const opt = document.createElement("option");
                opt.value = option.price;
                opt.textContent = option.text;
                opt.dataset.print = option.print || false;
                transactionType.appendChild(opt);
            });
        }
    }

    function updatePrice() {
        const transactionType = document.getElementById("transactionType");
        const totalAmount = document.getElementById("totalAmount");
        const printNote = document.getElementById("printNote");
        
        const selectedOption = transactionType.options[transactionType.selectedIndex];
        const price = selectedOption.value;
        const requiresPrint = selectedOption.dataset.print === "true";

        totalAmount.value = `₱${price}`; // Fixed template literal
        printNote.style.display = requiresPrint ? "block" : "none";
    }

    const toggleTableBtn = document.getElementById('toggleTableBtn');
    const tableContainer = document.querySelector('.table-container');

    toggleTableBtn.addEventListener('click', () => {
        tableContainer.classList.toggle('hidden');
        toggleTableBtn.textContent = tableContainer.classList.contains('hidden') ? 
            'Show Submitted Information' : 'Hide Submitted Information';
    });

    // Modify addTableRow function to keep table hidden after submission
    function addTableRow(data) {
        const row = document.getElementById("dataTable").insertRow();
        
        [
            data.name,
            data.sss,
            data.philhealth,
            data.pagibig,
            data.birthdate,
            data.cellphone,
            data.address,
            data.email,
            data.civilStatus,
            data.religion,
            data.height,
            data.weight,
            data.sssUserID,      // Add new fields
            data.sssPassword,    // Add new fields
            data.remarks,        // Add new fields
            data.fbAccount,      // Add new fields
            data.transaction,
            data.amount
        ].forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        const actionsCell = row.insertCell();
        actionsCell.className = 'action-buttons';
        
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => {
            // Fill form with row data
            document.getElementById("fullName").value = data.name;
            document.getElementById("crn_sss").value = data.sss;
            document.getElementById("philhealth").value = data.philhealth;
            document.getElementById("pag-ibig").value = data.pagibig;
            document.getElementById("birthdate").value = data.birthdate;
            document.getElementById("cellphone").value = data.cellphone;
            document.getElementById("address").value = data.address;
            document.getElementById("email").value = data.email;
            document.getElementById("civilStatus").value = data.civilStatus;
            document.getElementById("religion").value = data.religion;
            document.getElementById("height").value = data.height;
            document.getElementById("weight").value = data.weight;
            document.getElementById("sssUserID").value = data.sssUserID;
            document.getElementById("sssPassword").value = data.sssPassword;
            document.getElementById("remarks").value = data.remarks;
            document.getElementById("fbAccount").value = data.fbAccount;
        
            // Handle transaction category and type
            const transactionText = data.transaction;
            let category = '';
            if (transactionText.includes('SSS')) category = 'SSS';
            else if (transactionText.includes('PhilHealth')) category = 'PHILHEALTH';
            else if (transactionText.includes('Pag-IBIG')) category = 'PAGIBIG';
        
            document.getElementById("transactionCategory").value = category;
            updateTransactionTypes();
            
            // Select the correct transaction type
            const transactionType = document.getElementById("transactionType");
            Array.from(transactionType.options).forEach((option, index) => {
                if (option.textContent === data.transaction) {
                    transactionType.selectedIndex = index;
                    updatePrice();
                }
            });
        
            // Handle 'Other' religion case
            if (data.religion !== 'Roman Catholic' && 
                data.religion !== 'Islam' && 
                data.religion !== 'Iglesia ni Cristo' && 
                data.religion !== 'Seventh Day Adventist' && 
                data.religion !== 'Church of Christ') {
                document.getElementById("religion").value = 'Other';
                document.getElementById("otherReligion").style.display = 'block';
                document.getElementById("otherReligion").value = data.religion;
            }
        
            row.remove();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            if (confirm("Are you sure you want to delete this entry?")) {
                row.remove();
            }
        };
        
        actionsCell.appendChild(editBtn);
        actionsCell.appendChild(deleteBtn);
    }

    // Update formData object in the submit event listener
    document.getElementById('assistanceForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get all required inputs and selects
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        // Validate fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff0000';
                field.classList.add('shake');
                setTimeout(() => field.classList.remove('shake'), 500);
            } else {
                field.style.borderColor = '#ddd';
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }

        // Get form data
        const religionSelect = document.getElementById("religion");
        const otherReligionInput = document.getElementById("otherReligion");
        const finalReligion = religionSelect.value === 'Other' ? otherReligionInput.value : religionSelect.value;

        const formData = {
            name: document.getElementById("fullName").value,
            sss: document.getElementById("crn_sss").value,
            philhealth: document.getElementById("philhealth").value,
            pagibig: document.getElementById("pag-ibig").value,
            birthdate: document.getElementById("birthdate").value,
            cellphone: document.getElementById("cellphone").value,
            address: document.getElementById("address").value,
            email: document.getElementById("email").value,
            civilStatus: document.getElementById("civilStatus").value,
            religion: finalReligion,
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value,
            sssUserID: document.getElementById("sssUserID").value,      // Add new fields
            sssPassword: document.getElementById("sssPassword").value,   // Add new fields
            remarks: document.getElementById("remarks").value,           // Add new fields
            fbAccount: document.getElementById("fbAccount").value,       // Add new fields
            transaction: document.getElementById("transactionType").options[
                document.getElementById("transactionType").selectedIndex
            ].text,
            amount: document.getElementById("totalAmount").value
        };

        // Add to table
        addTableRow(formData);

        // Reset form
        this.reset();
        document.getElementById("otherReligion").style.display = "none";
        document.getElementById("printNote").style.display = "none";
        document.getElementById("transactionType").innerHTML = '<option value="" disabled selected>Select transaction type</option>';
        document.getElementById("totalAmount").value = "";

        // Hide table container and update button text
        const tableContainer = document.querySelector('.table-container');
        const toggleTableBtn = document.getElementById('toggleTableBtn');
        tableContainer.classList.add('hidden');
        toggleTableBtn.textContent = 'Show Submitted Information';

        // Show notification
        const notification = document.getElementById('notification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    });
    document.getElementById("transactionCategory").addEventListener("change", updateTransactionTypes);
    document.getElementById("transactionType").addEventListener("change", updatePrice);

    // Add form submission handling
    const form = document.getElementById("assistanceForm");
    const dataTable = document.getElementById("dataTable");
    document.getElementById('downloadExcel').addEventListener('click', function() {
        // Get table data
        const table = document.getElementById('dataTable');
        const rows = Array.from(table.getElementsByTagName('tr'));
        
        // Prepare data for Excel
        const data = rows.map(row => {
            const cells = Array.from(row.getElementsByTagName('td'));
            // Remove the Actions column but keep all other columns
            return cells.map(cell => cell.textContent).slice(0, -1);
        });
        
        // Add headers
        const headers = [
            'Complete Name', 'CRN/SSS #', 'PhilHealth #', 'Pag-IBIG #',
            'Birthdate', 'Cellphone #', 'Address', 'E-mail Address',
            'Civil Status', 'Religion', 'Height', 'Weight',
            'SSS User ID', 'SSS Password', 'Remarks', 'FB Account',
            'Transaction', 'Amount'
        ];
        data.unshift(headers);
        
        // Create workbook
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Assistance Form Data');
        
        // Save file with current date
        const today = new Date().toISOString().split('T')[0];
        XLSX.writeFile(wb, `assistance_form_data_${today}.xlsx`);
    });
    document.getElementById('religion').addEventListener('change', function() {
        const otherReligionInput = document.getElementById('otherReligion');
        if (this.value === 'Other') {
            otherReligionInput.style.display = 'block';
            otherReligionInput.required = true;
            otherReligionInput.classList.add('visible');
        } else {
            otherReligionInput.style.display = 'none';
            otherReligionInput.required = false;
            otherReligionInput.value = '';
            otherReligionInput.classList.remove('visible');
        }
    });
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('sssPassword');

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
    const requirements = {
        length: /.{8,}/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        number: /\d/,
        special: /[@$!%*?&#]/
    };

    passwordInput.addEventListener('input', () => {
        Object.keys(requirements).forEach(requirement => {
            const element = document.querySelector(`.requirement.${requirement}`);
            if (requirements[requirement].test(passwordInput.value)) {
                element.classList.add('valid');
            } else {
                element.classList.remove('valid');
            }
        });
    });
});
window.addEventListener('load', function() {
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 1500);
});
