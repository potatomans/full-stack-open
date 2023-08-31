import axios from 'axios'
import { Diary, DiaryWithComment, FullDiary } from '../types'

const baseUrl = 'http://localhost:3001/api/diaries'

export const getDiaries = async () => {
    const res = await axios.get<Diary[]>(baseUrl)
    return res.data
}

export const postDiary = async (diary: DiaryWithComment) => {
    const res = await axios.post<FullDiary>(baseUrl, diary)
    return res.data
}