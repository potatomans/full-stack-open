interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

interface Exercises {
    target: number,
    arr: number[]
}

export const calculateExercises = (target: number, arr: number[]): Result => {
    const trainingDays = arr.filter(n => n > 0).length
    const average = arr.reduce((a, b) => a + b) / arr.length

    let rating = 0
    let ratingDescription = ''

    if (average >= target) {
        rating = 3
        ratingDescription = "hit target hours, well done!"
    }
    else if (average < target && (target - average <= 1)) {
        rating = 2
        ratingDescription = "almost there!"
    }
    else {
        rating = 1
        ratingDescription = "you exercised too little!"
    }

    const result = {
        periodLength: arr.length,
        trainingDays: trainingDays,
        success: average >= target ? true : false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }

    return result
}

const parseForExercises = (args: string[]): Exercises => {
    if (args.length < 4) throw new Error('too few arguments')

    // need to have condition for checking every element in string is a number
    const onlyNum = (arr: any[]): boolean => {
        return arr.every(element => {
            return !isNaN(element)
        })
    }

    const argsNum = args.map(n => Number(n))

    if (onlyNum(argsNum.slice(2, args.length)))
        return {
            target: Number(args[2]),
            arr: argsNum.slice(3, args.length)
        }
    else throw new Error('provided values were not numbers.')
}

try {
    const { target, arr } = parseForExercises(process.argv)
    console.log(calculateExercises(target, arr))
}
catch (error: unknown) {
    let errorMessage = 'something bad happened.'
    if (error instanceof Error) {
        errorMessage += 'error: ' + error.message
    }
    console.log(errorMessage)
}
