import React from 'react'
import { FOOTER_TITLE_EN, FOOTER_TITLE_ID, LIST_FOOTER_EN, LIST_FOOTER_ID } from '../../../../constans/listFooter'
import EachUtils from '../../../../utils/EachUtils'
import OptionLanguage from '../../Landing/OptionLanguage'
import { languageAtom } from '../../../../jotai/atoms'
import { useAtom } from 'jotai'

const Footer = () => {
    const [language] = useAtom(languageAtom)

    return (
        <footer className='bg-black w-full p-8'>
            <div className='max-w-6xl mx-auto'>
                <div>
                    {language == "en" ? FOOTER_TITLE_EN : FOOTER_TITLE_ID}
                    <a href='/' className='underline hover:text-white'>0813-2823-3697</a>
                </div>
                <ul className='grid grid-cols-2 sm:grid-cols-4 gap-4 py-12'>
                    <EachUtils
                        of={language == "en" ? LIST_FOOTER_EN : LIST_FOOTER_ID}
                        render={(item, index) => (
                            <li key={index}>
                                <a
                                    href={item.url}
                                    className='underline hover:text-white transition-all'
                                >
                                    {item.title}
                                </a>
                            </li>
                        )}
                    />
                </ul>
                <OptionLanguage />
                <p className='mt-8'>Netflix Indonesia</p>
            </div>
        </footer>
    )
}

export default Footer