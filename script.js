document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('searchInput').value.trim();
    if (!city) {
        alert('Введите название города!');
        return;
    }

    const apiKey = 'aa3f183024ff4bc581d101940251412';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&lang=ru`;  // lang=ru для русского описания

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Город не найден или ошибка API');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('results').innerHTML = '<p class="error">Ошибка: ' + error.message + '</p>';
        });
});

function displayWeather(data) {
    const resultsDiv = document.getElementById('results');
    const location = data.location;
    const current = data.current;

    resultsDiv.innerHTML = `
        <div class="weather-card">
            <h2>${location.name}, ${location.country}</h2>
            <img src="${current.condition.icon}" alt="${current.condition.text}">
            <p><strong>Температура:</strong> ${current.temp_c}°C (ощущается как ${current.feelslike_c}°C)</p>
            <p><strong>Описание:</strong> ${current.condition.text}</p>
            <p><strong>Влажность:</strong> ${current.humidity}%</p>
            <p><strong>Ветер:</strong> ${current.wind_kph} км/ч (${current.wind_dir})</p>
            <p><strong>Последнее обновление:</strong> ${current.last_updated}</p>
        </div>
    `;
}