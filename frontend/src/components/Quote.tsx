import image from '../assets/editor.png'

export const Quote = () => {
    return (
        <div className="h-screen flex flex-col">
            <div className="bg-[#e5e5e5] h-full flex justify-center flex-col rounded-xl m-3 overflow-hidden relative">
                <div className='absolute top-16 left-24 text-balance p-4 ml-2'>
                    <div className='mb-2 text-3xl/9 font-semibold '>
                        Frictionless Writing with Powerful Editing Suite
                    </div>
                    <div className="text-gray-700 font-extralight">
                        Enter your credentials to start blloging!
                    </div>
                </div>
                <div className='absolute bottom-0 left-40 w-[1000px] h-[800px] translate-y-72 -translate-x-10 border-black border-[25px] rounded-3xl bg-black'>
                    <img src={image} className='w-full h-full object-cover rounded-xl' alt="Editor" />
                </div>
            </div>
        </div>
    )
}