import React from 'react'

const Skeleton = () => {
    return (
        <div className='w-80'>
            <div className="flex w-80 flex-col gap-4">
                <div className="skeleton h-44 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    )
}

export default Skeleton