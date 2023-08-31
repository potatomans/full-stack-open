import { CoursePart } from "../types";

const Total = ({ array }: { array: CoursePart[] }) => {
    return (
        <p>
            Number of exercises{" "}
            { array.reduce((carry, part) => carry + part.exerciseCount, 0) }
        </p>
    )
}

export default Total