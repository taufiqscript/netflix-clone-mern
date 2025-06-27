import React from 'react'
import SectionLayout from '../../../layouts/SectionLayout'
import { PROFILE_KIDS_IMAGE } from '../../../../constans/listAsset'
import { LIST_CONTENT_4_EN, LIST_CONTENT_4_ID } from '../../../../constans/listContent'
import EachUtils from '../../../../utils/EachUtils'
import { languageAtom } from '../../../../jotai/atoms'
import { useAtom } from 'jotai'


const SectionProfile = () => {
    const [language] = useAtom(languageAtom)

    return (
        <SectionLayout>
            <img
                src={PROFILE_KIDS_IMAGE}
            />
            <EachUtils
                of={language == "en" ? LIST_CONTENT_4_EN : LIST_CONTENT_4_ID}
                render={(item, index) => (
                    <div
                        key={index}
                        className='relative text-white'
                    >
                        <h3 className='text-xl sm:text-5xl font-black'>{item.title}</h3>
                        <p className='text-sm sm:text-xl mt-1 sm:mt-4'>{item.desc}</p>
                    </div>
                )}
            />
        </SectionLayout>
    )
}

export default SectionProfile