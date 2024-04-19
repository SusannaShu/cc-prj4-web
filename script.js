document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const birthdate = document.getElementById('birthdate').value;
        if (!birthdate) {
            alert('Please enter a valid birthdate.');
            return;
        }

        const apiKey = 'ZY5p0cAgJhPXW962Uv2nEC1gaL0QrKavID633ClD';
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${birthdate}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.media_type === 'image') {
                    displayResults(data.url, data.explanation);
                } else {
                    displayResults('', 'No image available for this date, possibly a video. Check the website for more!');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Failed to fetch the image. Please try again.');
            });
    });

    function displayResults(imageUrl, description) {
        let resultsHtml = `<h2>Result</h2>`;

        if (imageUrl) {
            resultsHtml += `<img src="${imageUrl}" alt="Astronomy Picture of the Day" style="max-width:100%;">`;
        }

        resultsHtml += `<p>${description}</p>`;

        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = resultsHtml;
        document.querySelector('.container').appendChild(resultDiv);
    }
});
