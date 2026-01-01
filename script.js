alert("JS IS now RUNNING");
fetch("dashboard_data.json")
  .then(response => response.json())
  .then(data => {
    const cleanData = data.filter(row => row.Gender);

    showKPIs(cleanData);
    drawGenderChart(cleanData);
    drawAgeChart(cleanData);
    drawStatusChart(cleanData);
  })
  .catch(error => {
    console.error("DATA LOAD ERROR:", error);
  });

function showKPIs(data) {
  document.getElementById("totalClients").innerHTML =
    `Total Clients Served: <strong>${data.length}</strong>`;
}

function drawGenderChart(data) {
  const counts = {};
  data.forEach(d => {
    counts[d.Gender] = (counts[d.Gender] || 0) + 1;
  });

  new Chart(document.getElementById("genderChart"), {
    type: "pie",
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts) }]
    }
  });
}

function drawAgeChart(data) {
  const groups = {};
  data.forEach(d => {
    groups[d["age_group"]] = (groups[d["age_group"]] || 0) + 1;
  });

  new Chart(document.getElementById("ageChart"), {
    type: "bar",
    data: {
      labels: Object.keys(groups),
      datasets: [{ data: Object.values(groups) }]
    }
  });
}

function drawStatusChart(data) {
  const status = {};
  data.forEach(d => {
    status[d["status_in_canada"]] =
      (status[d["Status in Canada"]] || 0) + 1;
  });

  new Chart(document.getElementById("statusChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(status),
      datasets: [{ data: Object.values(status) }]
    }
  });
}
