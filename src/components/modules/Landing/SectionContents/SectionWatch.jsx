import SectionLayout from '../../../layouts/SectionLayout'
import EachUtils from '../../../../utils/EachUtils'
import { LIST_CONTENT_3_EN, LIST_CONTENT_3_ID } from '../../../../constans/listContent'
import { WATCH_DEVICE_IMAGE, WATCH_DEVICE_VIDEO } from '../../../../constans/listAsset'
import { languageAtom } from '../../../../jotai/atoms'
import { useAtom } from 'jotai'

const SectionWatch = () => {
    const [language] = useAtom(languageAtom)

    return (
        <SectionLayout>
            <EachUtils
                of={language == "en" ? LIST_CONTENT_3_EN : LIST_CONTENT_3_ID}
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
            <div className='relative max-w-xl mx-auto'>
                <img src={WATCH_DEVICE_IMAGE} className='relative z-10' />
                <div className='absolute top-10 left-1/2 -translate-x-1/2 w-[60%]'>
                    <video autoPlay muted loop>
                        <source src={WATCH_DEVICE_VIDEO} type='video/mp4' />
                    </video>
                </div>
            </div>
        </SectionLayout>
    )
}

export default SectionWatch