import React from 'react';
import { useState, useEffect } from 'react'
import { getDiaries, postDiary } from './services/diaryService';
import { Diary, DiaryWithComment, ValidationError } from './types';
import axios from 'axios'

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [message, setMessage] = useState<React.ReactNode>(null)

  useEffect(() => {
    getDiaries().then(data => setDiaries(data))
}, [])

const handleSubmit = async (event: React.SyntheticEvent) => {
  event.preventDefault()
  const newDiary: DiaryWithComment = {
    //id: Math.floor(Math.random() * 1000),
    date: date,
    visibility: visibility,
    weather: weather,
    comment: comment
  }
  try {
    console.log(newDiary)
    const data = await postDiary(newDiary)
    const parsedData: Diary = { 
      id: data.id,
      date: data.date,
      visibility: data.visibility,
      weather: data.comment
    }
    setDiaries(diaries.concat(parsedData))
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setMessage(error?.response?.data)
    }
  }
}

  const style: React.CSSProperties = {
    color: "red"
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <div style={style}>{message}</div>
      <form onSubmit={handleSubmit}>
        <div>date <input type='date' name='date' value={date} min="2018-01-01" max="2023-12-31" onChange={({ target }) => setDate(target.value)}/></div>
        <div>
          visibility
          <input type='radio' name='visibility' value='great' onChange={({ target }) => setVisibility(target.value)} />
          <label htmlFor='great'>great</label>
          <input type='radio' name='visibility' value='good' onChange={({ target }) => setVisibility(target.value)} />
          <label htmlFor='good'>good</label>
          <input type='radio' name='visibility' value='ok' onChange={({ target }) => setVisibility(target.value)} />
          <label htmlFor='ok'>ok</label>
          <input type='radio' name='visibility' value='poor' onChange={({ target }) => setVisibility(target.value)} />
          <label htmlFor='poor'>poor</label>        
        </div>
        <div>
          weather
          <input type='radio' name='weather' value='sunny' onChange={({ target }) => setWeather(target.value)} />
          <label htmlFor='sunny'>sunny</label>
          <input type='radio' name='weather' value='rainy' onChange={({ target }) => setWeather(target.value)} />
          <label htmlFor='rainy'>rainy</label>
          <input type='radio' name='weather' value='cloudy' onChange={({ target }) => setWeather(target.value)} />
          <label htmlFor='cloudy'>cloudy</label>
          <input type='radio' name='weather' value='stormy' onChange={({ target }) => setWeather(target.value)} />
          <label htmlFor='stormy'>stormy</label>  
          <input type='radio' name='weather' value='windy' onChange={({ target }) => setWeather(target.value)} />
          <label htmlFor='windy'>windy</label>   
        </div>
        <div>comment <input name='comment' value={comment} onChange={({ target }) => setComment(target.value)}/></div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map(diary => {
        return(
        <div>
          <strong>{diary.date}</strong><br />
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )})}
    </div>
  )
}

export default App;
