export interface Diary {
    id: number;
    date: string;
    weather: string;
    visibility: string
}

export interface DiaryWithComment {
    date: string;
    weather: string;
    visibility: string
    comment: string
}

export interface FullDiary extends Diary {
    comment: string
} 

export interface ValidationError {
    message: string;
    errors: Record<string, string[]>
}