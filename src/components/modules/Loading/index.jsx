const Loading = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2 text-center">
            <span className='loading loading-spinner w-28'></span>
            <p>Loading...</p>
        </div>
    )
}

export default Loading