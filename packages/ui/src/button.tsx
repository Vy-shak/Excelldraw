"use client"
interface buttonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size: 'sm' | 'md' | 'lg' | 'full';
  defaultCss?: string,
  text: string;
  startIcon?: any;
  endIcon?: any;
};


const constants = {
  variant: {
    primary: 'bg-blue-500  font-normal text-white hover:bg-blue-500',
    secondary: 'border-2 border-Breen-700  text-white opacity-80 font-Montserrat',
    tertiary: 'bg-gray-50 w-fit focus:outline-0 outline outline-blue-100 outline-1 text-gray-900 text-sm '
  },
  size: {
    sm: 'px-2 py-1 text-sm w-fit rounded-sm ',
    md: 'px-6 font-Kanit py-2 text-base w-fit rounded-sm',
    lg: 'px-6 py-3 text-lg w-fit',
    full: 'text-sm w-full h-10'
  },
}



const Button = (props: buttonProps) => {

  return (
    <>
      <button className={` ${props.defaultCss} ${constants.variant[props.variant]} ${constants.size[props.size]}`}>
        <div className="flex w-fit  h-fit justify-center items-center leading-3">
          {props.startIcon}
          <span className="text-xs">{props.text}</span>
          {props.endIcon}
        </div>
      </button>
    </>
  )
}

export default Button