import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ array }: { array: CoursePart[] }): JSX.Element => {
    return (
        array.map(part => <p><Part obj={part} /></p>)
    )
}

export default Content