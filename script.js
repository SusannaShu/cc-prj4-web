document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('birthdateForm');
    const submitButton = document.getElementById('submitBtn');
    const resultsContainer = document.querySelector('.results');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const birthdate = document.getElementById('birthdate').value;

        if (!birthdate) {
            alert('Please enter a valid birthdate.');
            return;
        }

        const birthDateObj = new Date(birthdate);
        const month = birthDateObj.getMonth() + 1; // JavaScript months are 0-based.
        const day = birthDateObj.getDate();
        const year = birthDateObj.getFullYear();

        const apiKey = 'ZY5p0cAgJhPXW962Uv2nEC1gaL0QrKavID633ClD';
        const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${year}-${month}-${day}`;
        const numbersUrl = `http://numbersapi.com/${month}/${day}/date`;

        Promise.all([
            fetch(apodUrl).then(response => response.json()),
            fetch(numbersUrl).then(response => response.text())
        ])
        .then(([apodData, numberFact]) => {
            displayResults(apodData.url, apodData.explanation, numberFact, apodData.media_type);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });

        submitButton.textContent = 'Try Again';
    });

    function displayResults(imageUrl, apodDescription, dateFact, mediaType) {
        let resultsHtml = '<h2>Results</h2>';

        if (mediaType === 'image') {
            resultsHtml += `<img src="${imageUrl}" alt="Astronomy Picture of the Day" style="height:200px">`;
        } else {
            resultsHtml += '<p>No image available for this date, possibly a video. Check the website for more!</p>';
        }

        resultsHtml += `<p>${apodDescription || 'No description available.'}</p>`;
        resultsHtml += `<p style="color:blue"><strong>Interesting Date Fact:</strong> ${dateFact}</p>`;

        resultsContainer.innerHTML = resultsHtml; // Ensure this element is correctly referenced and exists.
    }
});
