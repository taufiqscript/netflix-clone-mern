import { JUMBOTRON_IMAGE } from '../../../../constans/listAsset'
import EachUtils from '../../../../utils/EachUtils'
import { LIST_JUMBOTRON_EN, LIST_JUMBOTRON_ID } from '../../../../constans/listJumbotron'
import { useAtom } from 'jotai'
import { languageAtom } from '../../../../jotai/atoms'
import InputMembersip from '../InputMembership'

const Jumbotron = () => {
    const [language] = useAtom(languageAtom)

    return (
        <div className='relative w-full'>
            <img src={JUMBOTRON_IMAGE} alt=''
                className='absolute inset-0 w-full h-[700px] max-h-[700px] object-cover opacity-60'
            />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col text-center w-full max-w-4xl px-8'>
                <EachUtils
                    of={language == "en" ? LIST_JUMBOTRON_EN : LIST_JUMBOTRON_ID}
                    render={(item, index) => (
                        <div
                            key={index}
                            className='flex flex-col gap-4 text-white'
                        >
                            <h3 className='text-5xl font-black'>{item.title}</h3>
                            <p className='text-lg'>{item.desc}</p>
                        </div>
                    )}
                />
                <InputMembersip />
            </div>
            <div className='w-full h-[700px]' />
        </div>
    )
}

export default Jumbotron