import WelcomeHospital from './body';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

export default function Page (){
    return(
        <main>
            <Navbar/>
            <WelcomeHospital/>
            <Footer/>
        </main>
    );
}