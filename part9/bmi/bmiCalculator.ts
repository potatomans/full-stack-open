interface Bmi {
    height: number,
    weight: number
}

export const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / Math.pow((height / 100), 2)

    if (bmi < 18.5) {
        return "Abnormal (underweight)"
    }
    else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal (healthy weight)"
    }
    else if (bmi > 24.9 && bmi <= 29.9) {
        return "Abnormal (overweight)"
    }
    else {
        return "Abnormal (obese)"
    }
}

const parseArguments = (args: string[]): Bmi => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}

try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
}  
catch (error: unknown) {
    let errorMessage = 'something bad happened. '
    if (error instanceof Error) {
        errorMessage += 'error: ' + error.message
    }
    console.log(errorMessage)
}

