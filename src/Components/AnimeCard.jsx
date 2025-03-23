import React from 'react'

function AnimeCard({
    name,
    index,
    img
}) {
    return (
        <div className='w-56 h-64  flex justify-end'>
            <div className='w-8 h-64 flex flex-col-reverse items-center gap-2'>
                <span className="text-lg font-bold text-[#e60076]">{index}</span>
                <span
                    className="text-lg font-bold text-white"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                    {name}
                </span>

            </div>
            <div className='w-48 h-64'>
                <img src={img} className="w-full h-full object-cover" alt="" />
            </div>
        </div>
    )
}

export default AnimeCard
