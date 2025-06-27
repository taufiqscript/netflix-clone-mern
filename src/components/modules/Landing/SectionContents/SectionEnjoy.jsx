import React from 'react'
import SectionLayout from '../../../layouts/SectionLayout'
import EachUtils from '../../../../utils/EachUtils'
import { LIST_CONTENT_1_EN, LIST_CONTENT_1_ID } from '../../../../constans/listContent'
import { ENJOY_TV_IMAGE, ENJOY_TV_VIDEO } from '../../../../constans/listAsset'
import { languageAtom } from '../../../../jotai/atoms'
import { useAtom } from 'jotai'

const SectionEnjoy = () => {
    const [language] = useAtom(languageAtom)

    return (
        <SectionLayout>
            <EachUtils
                of={language == "en" ? LIST_CONTENT_1_EN : LIST_CONTENT_1_ID}
                render={(item, index) => (
                    <div
                        className='text-white'
                        key={index}>
                        <h3 className='text-xl sm:text-5xl font-black'>{item.title}</h3>
                        <p className='text-sm sm:text-xl mt-1 sm:mt-4'>{item.desc}</p>
                    </div>

                )}
            />
            <div className='relative max-w-xl mx-auto'>
                <img src={ENJOY_TV_IMAGE} className='relative z-10' />
                <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[80%]'>
                    <video autoPlay loop muted>
                        <source src={ENJOY_TV_VIDEO} />
                    </video>
                </div>
            </div>
        </SectionLayout>
    )
}

export default SectionEnjoy