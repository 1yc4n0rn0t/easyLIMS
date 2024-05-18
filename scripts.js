// Sample data
        let samples = [];

        // Test data
        let tests = [];

        // Sample form submission handler
        document.getElementById('sample-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const sampleName = document.getElementById('sample-name').value;
            const sampleDescription = document.getElementById('sample-description').value;
            const sampleDate = document.getElementById('sample-date').value;
            if (sampleName) {
                samples.push({ name: sampleName, description: sampleDescription, date: sampleDate });
                displaySamples();
                document.getElementById('sample-name').value = '';
                document.getElementById('sample-description').value = '';
                document.getElementById('sample-date').value = '';
            }
        });

        // Test form submission handler
        document.getElementById('test-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const testName = document.getElementById('test-name').value;
            const testDescription = document.getElementById('test-description').value;
            const testFoodsInput = document.getElementById('test-foods').value;
            const testFoods = testFoodsInput.split(',').map(food => food.trim());
            const testAnomaliesInput = document.getElementById('test-anomalies').value;
            const testAnomalies = testAnomaliesInput.split(',').map(anomaly => anomaly.trim());
            const testDate = document.getElementById('test-date').value;
            if (testName) {
                tests.push({ name: testName, description: testDescription, foods: testFoods, anomalies: testAnomalies, date: testDate });
                displayTests();
                document.getElementById('test-name').value = '';
                document.getElementById('test-description').value = '';
                document.getElementById('test-foods').value = '';
                document.getElementById('test-anomalies').value = '';
                document.getElementById('test-date').value = '';
            }
        });

        // Function to display samples in the table
        function displaySamples() {
            const sampleTableBody = document.getElementById('sample-table').querySelector('tbody');
            sampleTableBody.innerHTML = '';
            samples.forEach(function(sample, index) {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = sample.name;
                row.appendChild(nameCell);
                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = sample.description;
                row.appendChild(descriptionCell);
                const dateCell = document.createElement('td');
                dateCell.textContent = sample.date;
                row.appendChild(dateCell);
                const actionCell = document.createElement('td');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'btn btn-danger';
                deleteBtn.addEventListener('click', function() {
                    deleteSample(index);
                });
                actionCell.appendChild(deleteBtn);
                row.appendChild(actionCell);
                sampleTableBody.appendChild(row);
            });
        }

        // Function to display tests in the table
        function displayTests() {
            const testTableBody = document.getElementById('test-table').querySelector('tbody');
            testTableBody.innerHTML = '';
            tests.forEach(function(test, index) {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = test.name;
                row.appendChild(nameCell);
                const descriptionCell = document.createElement('td');
                descriptionCell.textContent = test.description;
                row.appendChild(descriptionCell);
                const foodsCell = document.createElement('td');
                foodsCell.textContent = test.foods.join(', ');
                row.appendChild(foodsCell);
                const anomaliesCell = document.createElement('td');
                anomaliesCell.textContent = test.anomalies.join(', ');
                row.appendChild(anomaliesCell);
                const dateCell = document.createElement('td');
                dateCell.textContent = test.date;
                row.appendChild(dateCell);
                const actionCell = document.createElement('td');
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'btn btn-danger';
                deleteBtn.addEventListener('click', function() {
                    deleteTest(index);
                });
                actionCell.appendChild(deleteBtn);
                row.appendChild(actionCell);
                testTableBody.appendChild(row);
            });
        }

        // Function to delete a sample
        function deleteSample(index) {
            if (confirm('Are you sure you want to delete this sample?')) {
                samples.splice(index, 1);
                displaySamples();
            }
        }

        // Function to delete a test
        function deleteTest(index) {
            if (confirm('Are you sure you want to delete this test?')) {
                tests.splice(index, 1);
                displayTests();
            }
        }

        // Generate report button click handler
        document.getElementById('generate-report-btn').addEventListener('click', function() {
            generateReport();
        });

        // Function to generate report
        function generateReport() {
            // Prepare data for chart
            const foodLabels = [];
            const foodCounts = [];
            const anomalyLabels = [];
            const anomalyCounts = [];

            // Count occurrences of each food and anomaly
            const foodMap = {};
            const anomalyMap = {};

            tests.forEach(test => {
                test.foods.forEach(food => {
                    if (!foodMap[food]) {
                        foodMap[food] = 0;
                    }
                    foodMap[food]++;
                });
                test.anomalies.forEach(anomaly => {
                    if (!anomalyMap[anomaly]) {
                        anomalyMap[anomaly] = 0;
                    }
                    anomalyMap[anomaly]++;
                });
            });

            // Populate labels and counts arrays for foods
            for (const food in foodMap) {
                foodLabels.push(food);
                foodCounts.push(foodMap[food]);
            }

            // Populate labels and counts arrays for anomalies
            for (const anomaly in anomalyMap) {
                anomalyLabels.push(anomaly);
                anomalyCounts.push(anomalyMap[anomaly]);
            }

            // Generate Bar Chart
            const barChartCtx = document.getElementById('bar-chart').getContext('2d');
            const barChart = new Chart(barChartCtx, {
                type: 'bar',
                data: {
                    labels: foodLabels,
                    datasets: [{
                        label: 'Occurrences of Foods in Tests',
                        data: foodCounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Generate Pie Chart
            const pieChartCtx = document.getElementById('pie-chart').getContext('2d');
            const pieChart = new Chart(pieChartCtx, {
                type: 'pie',
                data: {
                    labels: anomalyLabels,
                    datasets: [{
                        label: 'Occurrences of Anomalies Detected in Tests',
                        data: anomalyCounts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Download report button click handler
        document.getElementById('download-report-btn').addEventListener('click', function() {
            // Dynamically load jsPDF library
            loadJsPDFLibrary();
        });

        // Function to load jsPDF library dynamically
        function loadJsPDFLibrary() {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js';
            script.onload = function() {
                // Once the script is loaded, call the function to generate the report
                generateReportWithJsPDF();
            };
            document.body.appendChild(script);
        }

        // Function to generate report using jsPDF
        function generateReportWithJsPDF() {
            // Prepare data for chart
            const foodLabels = [];
            const foodCounts = [];
            const anomalyLabels = [];
            const anomalyCounts = [];

            // Count occurrences of each food and anomaly
            const foodMap = {};
            const anomalyMap = {};

            tests.forEach(test => {
                test.foods.forEach(food => {
                    if (!foodMap[food]) {
                        foodMap[food] = 0;
                    }
                    foodMap[food]++;
                });
                test.anomalies.forEach(anomaly => {
                    if (!anomalyMap[anomaly]) {
                        anomalyMap[anomaly] = 0;
                    }
                    anomalyMap[anomaly]++;
                });
            });

            // Populate labels and counts arrays for foods
            for (const food in foodMap) {
                foodLabels.push(food);
                foodCounts.push(foodMap[food]);
            }

            // Populate labels and counts arrays for anomalies
            for (const anomaly in anomalyMap) {
                anomalyLabels.push(anomaly);
                anomalyCounts.push(anomalyMap[anomaly]);
            }

            // Generate Bar Chart
            const barChartCanvas = document.createElement('canvas');
            const barChartCtx = barChartCanvas.getContext('2d');
            const barChart = new Chart(barChartCtx, {
                type: 'bar',
                data: {
                    labels: foodLabels,
                    datasets: [{
                        label: 'Occurrences of Foods in Tests',
                        data: foodCounts,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Generate Pie Chart
            const pieChartCanvas = document.createElement('canvas');
            const pieChartCtx = pieChartCanvas.getContext('2d');
            const pieChart = new Chart(pieChartCtx, {
                type: 'pie',
                data: {
                    labels: anomalyLabels,
                    datasets: [{
                        label: 'Occurrences of Anomalies Detected in Tests',
                        data: anomalyCounts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Generate PDF document
            const pdf = new jsPDF();
            pdf.text('Bar Chart', 10, 10);
            pdf.addImage(barChartCanvas.toDataURL('image/jpeg'), 'JPEG', 10, 20, 180, 100);
            pdf.addPage();
            pdf.text('Pie Chart', 10, 10);
            pdf.addImage(pieChartCanvas.toDataURL('image/jpeg'), 'JPEG', 10, 20, 180, 100);
            pdf.save('report.pdf');
        }
