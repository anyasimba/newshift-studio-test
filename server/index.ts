import express from 'express'
import Axios from 'axios'

const app = express()

const privateKey = '6dacddd533f0cb58f4e8f076b17eedcb'

const coordinates = {
  'Moscow': [55.751244, 37.618423],
  'Sankt-Peterburg': [59.937500, 30.308611],
  'Ufa': [54.74306, 55.96779],
  'Ekaterinburg': [56.8519, 60.6122],
  'Nizhniy Novgorod': [56.296505, 43.936058],
}

app.get("/weather", async (request, response) => {
  const city = request.query.city as string

  if (coordinates[city] == null) {
    response.send(404)
  }
  const lat = coordinates[city][0]
  const lon = coordinates[city][1]

  const {data} = await Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=3&appid=${privateKey}`)

  const temperatures: string[] = []
  for (let i = 0; i < 3; ++i) {
    temperatures[i] = (data.daily[i].temp.day - 273.15).toFixed(0)
  }
  
  response.send(temperatures)
})

app.listen(3001)