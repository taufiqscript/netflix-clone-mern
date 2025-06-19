import EachUtils from '../../../../utils/EachUtils'
import { LIST_CTA_EN, LIST_CTA_ID } from '../../../../constans/listCTA'
import DefaultButton from '../DefaultButton'
import { useAtom } from 'jotai'
import { emailAtom, languageAtom } from '../../../../jotai/atoms'
import { useNavigate } from 'react-router-dom'

const InputMembersip = () => {
    const navigate = useNavigate()

    const [language] = useAtom(languageAtom)
    const [, setEmail] = useAtom(emailAtom)

    const handleEmail = (e) => {
        e.preventDefault()
        navigate("/register")
    }

    return (
        <form className='relative mt-2 px-8'>
            <EachUtils
                of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID}
                render={(item, index) => (
                    <div
                        key={index}
                        className='flex flex-col gap-3'
                    >
                        <h3 className='text-xl'>{item.title}</h3>
                        <div className='relative sm:flex gap-2 justify-center w-full max-w-2xl mx-auto'>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={item.labelInput}
                                className='bg-black/50 p-3 rounded-md w-full peer placeholder-transparent border border-white/50 z-10'
                            />
                            <label
                                className='absolute top-0 left-3 peer-placeholder-shown:top-4 peer-focus:top-[1px] peer-focus:text-sm transition-all duration-200 ease-in-out -z-10'
                            >
                                {item.labelInput}
                            </label>
                            <DefaultButton text={item.btnSubmit} styles={"w-[220px] flex justify-center items-center text-xl py-4 px-2 mt-2 sm:mt-0 m-auto"} isArrowIcon={true}
                                onClick={handleEmail}
                            />
                        </div>
                    </div>
                )}
            />
        </form>
    )
}

export default InputMembersip