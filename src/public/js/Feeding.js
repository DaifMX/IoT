document.getElementById("scheduleForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const time = document.getElementById("time").value;
    const day = document.getElementById("day").value;

    // Create new row
    const table = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    // Add cells
    const timeCell = newRow.insertCell(0);
    const dayCell = newRow.insertCell(1);
    const actionCell = newRow.insertCell(2);

    timeCell.textContent = time;
    dayCell.textContent = day;

    // Add toggle button
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Off";
    toggleButton.className = "toggle-btn off";
    toggleButton.addEventListener("click", function () {
        if (toggleButton.textContent === "Off") {
            toggleButton.textContent = "On";
            toggleButton.classList.remove("off");
            toggleButton.classList.add("on");
        } else {
            toggleButton.textContent = "Off";
            toggleButton.classList.remove("on");
            toggleButton.classList.add("off");
        }
    });
    actionCell.appendChild(toggleButton);
});