import React from 'react'
import SectionLayout from '../../../layouts/SectionLayout'
import EachUtils from '../../../../utils/EachUtils'
import { LIST_CONTENT_2_EN, LIST_CONTENT_2_ID } from '../../../../constans/listContent'
import { DOWNLOAD_COVER_IMAGE, DOWNLOAD_PHONE_IMAGE } from '../../../../constans/listAsset'
import { useAtom } from 'jotai'
import { languageAtom } from '../../../../jotai/atoms'


const SectionDownload = () => {
    const [language] = useAtom(languageAtom)

    return (
        <SectionLayout>
            <div className='relative max-w-xl mx-auto'>
                <img
                    src={DOWNLOAD_PHONE_IMAGE}
                    className='relative'
                />
                <div className='absolute bottom-6 left-1/2 -translate-x-1/2 bg-black w-[60%] h-[60px] sm:h-[100px] flex items-center p-2 gap-2 rounded-xl border border-white/50'>
                    <img
                        src={DOWNLOAD_COVER_IMAGE}
                        className='h-[45px] sm:h-[80px] max-h-[80px]'
                    />
                    <div className='text-sm sm:text-lg text-left'>
                        <h3>Stranger Things</h3>
                        <p className='text-blue-500'>Downloading...</p>
                    </div>
                </div>
            </div>
            <EachUtils
                of={language == "en" ? LIST_CONTENT_2_EN : LIST_CONTENT_2_ID}
                render={(item, index) => (
                    <div
                        key={index}
                        className='text-white'
                    >
                        <h3 className='text-xl sm:text-5xl font-black'>{item.title}</h3>
                        <p className='text-sm sm:text-xl mt-1 sm:mt-4'>{item.desc}</p>
                    </div>
                )}
            />
        </SectionLayout>
    )
}

export default SectionDownload