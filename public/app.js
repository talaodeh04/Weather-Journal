// مفتاح API الخاص بـ OpenWeatherMap
const apiKey = '2d4906b8c6c8fb231ccbfbb73b57864c'; 
const generateWeather = async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (zip && feelings) {
        try {
            // جلب البيانات من OpenWeatherMap
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`);
            const weatherData = await weatherResponse.json();

            if (weatherData.main) {
                const temp = weatherData.main.temp;
                const date = new Date().toLocaleDateString('en-CA'); 
                console.log(date);  


                // إرسال البيانات إلى السيرفر باستخدام POST
                await fetch('/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ date, temp, feel: feelings })
                });

                // تحديث واجهة المستخدم
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

// إضافة مستمع للأحداث عند النقر على الزر
document.getElementById('generate').addEventListener('click', generateWeather);
