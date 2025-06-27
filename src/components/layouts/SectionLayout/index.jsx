const SectionLayout = ({ children }) => {
    return (
        <div className='relative bg-black w-full border-t-stone-800 border-t-8'>
            <div className='grid sm:grid-cols-2 px-8 py-4 items-center text-center sm:text-left gap-4 max-w-7xl mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default SectionLayout