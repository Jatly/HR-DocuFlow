document.addEventListener("DOMContentLoaded", function () {
    const checklistItems = [
        "Company Application Form",
        "Candidate Profile",
        "Interview Evaluation Form",
        "Family Particulars Form",
        "Joining Report",
        "Nomination Form",
        "ESI Form (if Applicable)",
        "PF Form (3 Sets)",
        "Gratuity Form",
        "Superannuation Form (if Applicable)",
        "10th Mark Sheet / 12th Mark Sheet",
        "UG/PG Mark Sheets / Degree Certificate",
        "Medical Report",
        "Passport Size Photos - 4",
        "Previous Company Relieving Letter",
        "Previous Company Experience Certificate",
        "Salary Breakup Slip - Previous Company",
        "Salary Workout Sheet / Mail Approval Copy",
        "Appointment Letter Acknowledgment Copy",
        "RC Book",
        "License",
        "Progress Chart",
        "Confirmation Order",
        "Service Register",
        "Absorption Order - TASL",
        "Transfer Order - TASL",
        "Posting Order - For Trainees",
        "Aadhar Card",      // Added item
        "PAN Card"          // Added item
    ];

    const checklistContainer = document.getElementById("checklistItems");

    // Populate the checklist dynamically
    checklistItems.forEach((item) => {
        const row = document.createElement("div");
        row.classList.add("checklist-row");

        const actionCell = document.createElement("span");
        actionCell.textContent = item;

        const availableCell = document.createElement("span");
        const availableInput = document.createElement("input");
        availableInput.type = "radio";
        availableInput.name = item;
        availableInput.value = "✓";
        availableInput.id = `${item}-available`;
        const availableLabel = document.createElement("label");
        availableLabel.htmlFor = `${item}-available`;
        availableLabel.textContent = "Available";
        availableCell.appendChild(availableInput);
        availableCell.appendChild(availableLabel);

        const notAvailableCell = document.createElement("span");
        const notAvailableInput = document.createElement("input");
        notAvailableInput.type = "radio";
        notAvailableInput.name = item;
        notAvailableInput.value = " ";
        notAvailableInput.id = `${item}-notAvailable`;
        const notAvailableLabel = document.createElement("label");
        notAvailableLabel.htmlFor = `${item}-notAvailable`;
        notAvailableLabel.textContent = "Not Available";
        notAvailableCell.appendChild(notAvailableInput);
        notAvailableCell.appendChild(notAvailableLabel);

        const remarksCell = document.createElement("span");
        const remarksInput = document.createElement("input");
        remarksInput.type = "text";
        remarksInput.name = `${item}-remarks`;
        remarksInput.placeholder = "Remarks (optional)";
        remarksCell.appendChild(remarksInput);

        row.appendChild(actionCell);
        row.appendChild(availableCell);
        row.appendChild(notAvailableCell);
        row.appendChild(remarksCell);

        checklistContainer.appendChild(row);
    });

    // Handle form submission
    document.getElementById("checklistForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const location = document.getElementById("location").value;
        const designation = document.getElementById("designation").value;
        const department = document.getElementById("department").value;
        const doj = document.getElementById("doj").value;
        const ecode = document.getElementById("ecode").value;

        // Validate checklist
        const allValid = checklistItems.every((item) => {
            return document.querySelector(`input[name="${item}"]:checked`);
        });

        if (!allValid) {
            alert("Please select 'Available' or 'Not Available' for all checklist items.");
            return;
        }

        // Collecting checklist data
        const checklistData = checklistItems.map((item) => {
            const status = document.querySelector(`input[name="${item}"]:checked`)?.value || " ";
            const remarks = document.querySelector(`input[name="${item}-remarks"]`).value || "";
            return {
                action: item,
                status,
                remarks
            };
        });

        // Create the summary HTML
        let summaryHtml = `
          <h3>Personal Information</h3>
          <table>
            <tr><th>Name</th><td>${name}</td></tr>
            <tr><th>Location</th><td>${location}</td></tr>
            <tr><th>Designation</th><td>${designation}</td></tr>
            <tr><th>Department</th><td>${department}</td></tr>
            <tr><th>Date of Joining</th><td>${doj}</td></tr>
            <tr><th>E-Code</th><td>${ecode}</td></tr>
          </table>
          <br>
          <h3>Checklist</h3>
          <table>
            <tr><th>Action</th><th>Status</th><th>Remarks</th></tr>
        `;

        checklistData.forEach(item => {
            summaryHtml += `
              <tr>
                <td>${item.action}</td>
                <td>${item.status}</td>
                <td>${item.remarks}</td>
              </tr>
            `;
        });

        summaryHtml += `</table>`;

        // Display the summary
        const summaryContainer = document.getElementById("summary");
        summaryContainer.innerHTML = summaryHtml;
        document.getElementById("submittedData").style.display = "block";
    });

    // Print button functionality
    document.getElementById("printButton").addEventListener("click", function () {
        const contentToPrint = document.getElementById("submittedData").innerHTML;

        // Create a print window with the summary content
        const printWindow = window.open("", "", "width=600,height=400");
        printWindow.document.write(`
          <html>
          <head>
                <title>Personal File Check List</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #fff;
      }
      
      table {
        width: 100%;
        border-collapse: collapse;
      }

      th, td {
        padding: 10px;
        border: 1px solid #000;
        text-align: left;
      }

      th {
        background-color: #fff;
        color: black;
      }

      /* Print styles */
      @media print {
        #printButton {
          display: none; /* Hide the print button when printing */
        }
      }
    </style>

          </head>
          <body>${contentToPrint}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });
});
