"use client"
interface buttonProps {
    variant: 'primary' | 'secondary',
    size: 'default' | 'md' | 'xs',
    defaultCss?: string,
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    handleClick?: () => void;
};


const constants = {
    variant: {
        primary: ' hover:bg-primaryGreen-600  bg-primaryGreen-500 text-neutral-900  font-medium  ',
        secondary: 'border-2 rounded-md bg-primaryGreen-100 hover:bg-primaryGreen-200 text-xs border-primaryGreen-500  text-neutral-700 font-medium',
    },
    size: {
        default: 'xl:px-4 py-2  px-2  xl:py-2 text-xs xl:text-sm  w-fit lg:rounded-md rounded ',
        md: 'xl:px-3 py-2  px-2  xl:py-1 text-xs xl:text-xs  w-fit lg:rounded-md rounded',
        xs: 'py-2 px-1 rounded'
    },
}



const Button = (props: buttonProps) => {

    return (
        <>
            <button onClick={props.handleClick} className={` ${props.defaultCss} ${constants.variant[props.variant]} ${constants.size[props.size]}`}>
                <div className="flex  space-x-1 w-fit h-fit justify-center items-center leading-3">
                    {props.startIcon}
                    <span className="text-xs whitespace-nowrap">{props.text}</span>
                    {props.endIcon}
                </div>
            </button>
        </>
    )
}

export default Button