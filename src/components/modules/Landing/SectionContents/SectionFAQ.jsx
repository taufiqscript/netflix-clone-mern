import React, { useState } from 'react'
import EachUtils from '../../../../utils/EachUtils'
import { FAQ_TITLE_EN, FAQ_TITLE_ID, LIST_FAQ_EN, LIST_FAQ_ID } from '../../../../constans/listFAQ'
import { GoPlus } from 'react-icons/go'
import { motion } from 'framer-motion'
import { languageAtom } from '../../../../jotai/atoms'
import { useAtom } from 'jotai'
import InputMembersip from '../InputMembership'

const SectionFAQ = () => {
    const [language] = useAtom(languageAtom)

    const [openContentIndex, setOpenContentIndex] = useState(null)

    return (
        <div className='relative bg-black w-full border-t-stone-800 border-t-8 p-8 text-white'>
            <div className='max-w-6xl mx-auto'>
                <h3 className='text-center text-4xl font-bold'>{language == "en" ? FAQ_TITLE_EN : FAQ_TITLE_ID}
                </h3>
                <ul className='relative flex flex-col gap-2 py-12'>
                    <EachUtils
                        of={language == "en" ? LIST_FAQ_EN : LIST_FAQ_ID}
                        render={(item, index) => (
                            <div key={index}>
                                <li className='bg-[#1e1e1e] hover:bg-[#2d2d2d] transition-all py-6 px-4 cursor-pointer'>
                                    <button
                                        onClick={() => setOpenContentIndex(openContentIndex == index ? null : index)}
                                        className='text-2xl font-semibold cursor-pointer flex justify-between w-full items-center'
                                    >
                                        {item.title}
                                        <motion.span
                                            animate={{ rotate: openContentIndex == index ? 135 : 0 }}
                                        >
                                            <GoPlus size={46} />
                                        </motion.span>
                                    </button>
                                </li>
                                <motion.div
                                    initial={{ translateY: -10 }}
                                    animate={{ translateY: openContentIndex == index ? 0 : -10 }}
                                    style={{ display: openContentIndex == index ? "block" : "none" }}
                                    className='bg-[#1e1e1e] mt-0.5 py-6 px-4 text-xl'>
                                    <p>{item.desc}</p>
                                </motion.div>
                            </div>
                        )}
                    />
                </ul>
                <div className='max-w-4xl mx-auto text-center relative z-10'>
                    <InputMembersip />
                </div>
            </div>
        </div>
    )
}

export default SectionFAQ