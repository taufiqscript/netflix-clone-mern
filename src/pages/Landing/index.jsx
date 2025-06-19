import DefaultLayout from '../../components/layouts/DefaultLayout'
import Jumbotron from '../../components/modules/Landing/Jumbotron'
import SectionEnjoy from '../../components/modules/Landing/SectionContents/SectionEnjoy'
import SectionDownload from '../../components/modules/Landing/SectionContents/SectionDownload'
import SectionWatch from '../../components/modules/Landing/SectionContents/SectionWatch'
import SectionProfile from '../../components/modules/Landing/SectionContents/SectionProfile'
import SectionFAQ from '../../components/modules/Landing/SectionContents/SectionFAQ'
import Footer from '../../components/modules/Landing/Footer'
import Navbar from './Navbar'

const Landing = () => {

    return (
        <>
            <Navbar />
            <Jumbotron />
            <SectionEnjoy />
            <SectionDownload />
            <SectionWatch />
            <SectionProfile />
            <SectionFAQ />
            <Footer />
        </>
    )
}

export default Landing