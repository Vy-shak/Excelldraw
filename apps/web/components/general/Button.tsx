"use client"
interface buttonProps {
    variant: 'primary' | 'secondary',
    size: 'default',
    defaultCss?: string,
    text: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    handleClick?: () => void;
};


const constants = {
    variant: {
        primary: ' hover:bg-green-900  bg-green-700  font-normal text-white ',
        secondary: 'border-2 rounded-md border-green-900 bg-neutral-600  text-white font-normal',
    },
    size: {
        default: 'xl:px-4 py-2  px-2  xl:py-2 text-xs xl:text-sm  w-fit lg:rounded-md rounded ',
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