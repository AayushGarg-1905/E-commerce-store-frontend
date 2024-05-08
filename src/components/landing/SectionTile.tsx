import { Separator } from "../ui/separator"

const SectionTile = ({text}:{text:string}) => {
  return (
    <div>
      <h2 className="text-3xl font-medium tracking-wider capitalize mb-8">
        {text}
      </h2>
      <Separator/>
    </div>
  )
}

export default SectionTile