// Set up the Chart.js charts
const ctxPlastic = document.getElementById('recycledPlasticChart').getContext('2d');
const ctxTrees = document.getElementById('plantedTreesChart').getContext('2d');
const ctxCountry = document.getElementById('countryDistributionChart').getContext('2d');

// Generate dynamic data for recycled plastic and planted trees with variability
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Function to generate data with random fluctuations
function generateData(startValue, fluctuation) {
    let data = [];
    let currentValue = startValue;
    for (let i = 0; i < 12; i++) {
        const change = Math.floor(Math.random() * fluctuation * 2) - fluctuation;
        currentValue += change;
        if (currentValue < 0) currentValue = 0; // Ensure non-negative values
        data.push(currentValue);
    }
    return data;
}

const recycledPlasticData = generateData(100, 50); // Start at 100 kg, with a fluctuation of ±50 kg
const plantedTreesData = generateData(50, 25); // Start at 50 trees, with a fluctuation of ±25 trees

// Create the Recycled Plastic line chart
const recycledPlasticChart = new Chart(ctxPlastic, {
    type: 'line',
    data: {
        labels: months,
        datasets: [{
            label: 'Recycled Plastic (kg)',
            data: recycledPlasticData, // Data for each month
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true // Fill the area under the line
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Amount (kg)'
                }
            }
        }
    }
});

// Create the Planted Trees bar chart
const plantedTreesChart = new Chart(ctxTrees, {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            label: 'Planted Trees',
            data: plantedTreesData, // Data for each month
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Trees'
                }
            }
        }
    }
});

// Create the pie chart for country distribution
const countryDistributionChart = new Chart(ctxCountry, {
    type: 'pie',
    data: {
        labels: ['USA', 'Canada', 'Germany', 'UK', 'France', 'Italy', 'Spain', 'Australia', 'Brazil', 'India', 'China', 'Russia', 'Philippines'],
        datasets: [{
            label: 'Members by Country',
            data: [10, 8, 7, 6, 5, 4, 3, 2, 1, 12, 15, 11], // Example data
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(199, 199, 199, 0.2)',
                'rgba(83, 102, 255, 0.2)',
                'rgba(255, 107, 107, 0.2)',
                'rgba(107, 255, 107, 0.2)',
                'rgba(107, 107, 255, 0.2)',
                'rgba(255, 255, 107, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)',
                'rgba(255, 107, 107, 1)',
                'rgba(107, 255, 107, 1)',
                'rgba(107, 107, 255, 1)',
                'rgba(255, 255, 107, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        }
    }
});

// Function to update the pie chart data in real-time
function updatePieChart() {
    const newData = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
    countryDistributionChart.data.datasets[0].data = newData;
    countryDistributionChart.update();
}

// Update the pie chart every second
setInterval(updatePieChart, 1000); // Update every 1000 milliseconds (1 second)

// Initial data update for pie chart
updatePieChart();
