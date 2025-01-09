export const UploadImage = ({ open }: { open: boolean }) => {
    return ( open && <div className=" px-12 py-2 bg-red-200">
        <div className="flex justify-between my-2">
            <button className="hover:bg-gray-200 flex justify-center p-2 rounded-md">
                Upload Image
            </button>
            <button className="hover:bg-gray-200 flex justify-center p-2 rounded-md">
                Insert URL
            </button>
        </div>
        <div className="bg-yellow-200">
            <div className="bg-gray-400">
                Drag or drop files here
            </div>
        </div>
    </div>)
}