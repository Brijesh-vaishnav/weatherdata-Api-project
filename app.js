const express = require('express')
const https = require('https')
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/data', (req, res) => {

    var city = req.body.city

    const apiKey = "7a51886966b5ea618e3745279e57fdb4"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    https.get(url, (response) => {

        response.on("data", (data) => {


            const weatherData = JSON.parse(data)

            if (weatherData.cod == "200") {
                const temp = weatherData.main.temp
                const weatherDescription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`


                res.write(`<h1>${city} temp is : ${temp} C`)

                res.write(`<h1>description : ${weatherDescription}</h1>`)

                res.write(`<img src = "${iconUrl}" alt = "iconPng"/>`)
                res.send()
            }

            else {
                res.send(`<h3> Error code : ${weatherData.cod}</h3> <br>
                <h3>Error Description: ${weatherData.message}</h3>`)
            }


        })

    })
})


app.listen(3000, () => {
    console.log("server is running on port 3000");
})