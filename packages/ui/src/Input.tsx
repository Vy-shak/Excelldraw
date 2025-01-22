

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
            {title && <label className="block mb-2 text-sm font-normal text-gray-700 ">{title}</label>}
            <input ref={reference} type="password" id="first_name" className={`${Constants.size[Size]} bg-neutral-900 text-white border border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} placeholder={"write here"} required />
        </div>
    )
}

export default Input