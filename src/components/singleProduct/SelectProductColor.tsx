type SelectProductColorProps = {
  colors:string[];
  currProductColor:string;
  setProductColor: React.Dispatch<React.SetStateAction<string>>;
}

const SelectProductColor = ({colors, currProductColor, setProductColor}:SelectProductColorProps) => {
  return (
    <div className="mt-6">
      <h4 className="text-md font-medium tracking-wider capitalize">
        Colors
      </h4>
      <div className="mt-2">
      {colors.map((color) => {
          return (
            <button
              key={color}
              type='button'
              className={`rounded-full w-6 h-6 mr-2 border-2  ${
                color === currProductColor && ' border-primary'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setProductColor(color)}
            ></button>
          );
        })}
      </div>
    </div>
  )
}

export default SelectProductColor