

interface inputType {
    title?: string,
    type?: "default" | "password"
    Size: "medium" | "normal",
    reference: React.RefObject<HTMLInputElement>;
}

const Constants = {
    size: {
        medium: "h-16 text-start items-start flex justify-start",
        normal: "h-10"
    },
    type: {
        default: "text",
        password: "password"

    }
}

function Input({ title, type, Size, reference }: inputType) {
    return (
        <div className='flex flex-col justify-start items-start w-full m-0 p-0'>
            {title && <label className="block mb-2 text-sm font-normal text-gray-600 ">{title}</label>}
            <input ref={reference} type="password" id="first_name" className={`${Constants.size[Size]} bg-neutral-100 text-neutral-500 border border-gray-200 pl-2  text-sm rounded-sm focus:outline-none   focus:outline-neutral-300 block w-full h-8`} placeholder={"write here"} required />
        </div>
    )
}

export default Input