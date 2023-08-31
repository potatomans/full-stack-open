import { CoursePart } from "../types"

const Part = ({ obj }: { obj: CoursePart }) => {
    switch(obj.kind) {
        case "basic":
            return (
                <div>
                    <strong>{obj.name} {obj.exerciseCount}</strong> <br />
                    <em>{obj.description}</em>
                </div>
            )
        case "group":
            return (<div>
                <strong>{obj.name} {obj.exerciseCount}</strong> <br />
                <div>project exercises {obj.groupProjectCount}</div>
            </div>)
        case "background":
            return (
                <div>
                    <strong>{obj.name} {obj.exerciseCount}</strong> <br />
                    <em>{obj.description}</em> <br />
                    submit to {obj.backgroundMaterial}
                </div>
            )
        case "special":
            return (<div>
                <strong>{obj.name} {obj.exerciseCount}</strong> <br />
                <em>{obj.description}</em> <br />
                required skills: {obj.requirements.map(n => obj.requirements[obj.requirements.length - 1] === n ? <div>{n}</div> : <div>{n}, </div>)}
            </div>)
        default: assertNever(obj)
    }
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

export default Part