let apiKey = '';

const fetchApiKey = async () => {
    try {
        const response = await fetch('/apiKey');
        const data = await response.json();
        apiKey = `${data.apiKey}&units=imperial`;
    } catch (error) {
        console.error('Error fetching API key:', error);
    }
};

fetchApiKey();

const generateWeather = async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zip && feelings) {
        try {
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();

            if (weatherData.main) {
                const temp = weatherData.main.temp;
                const date = new Date().toLocaleDateString('en-CA');

                // إرسال البيانات إلى السيرفر باستخدام POST
                await fetch('/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date, temp, feel: feelings })
                });

                document.getElementById('date').innerText = `Date: ${date}`;
                document.getElementById('temp').innerText = `Temperature: ${temp}°F`;
                document.getElementById('content').innerText = `Feeling: ${feelings}`;
            } else {
                console.error('Error: Unable to fetch weather data');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    } else {
        console.log('Please enter a zip code and feelings');
    }
};

document.getElementById('generate').addEventListener('click', generateWeather);
