
import AcountDetails from "../components/AcountDetails";
import ContactInfo from "../components/ContactInfo";
import ImageUser from "../components/ImageUser";
import InfoBank from "../components/InfoBank";
import InfoBasicUser from "../components/InfoBasicUser"

export default function profile() {
    return (
        
        <div className="w-screen h-screen bg-white">
            <div className="flex justify-center font-bold p-4">
                <h1 className="text-4xl">PERFIL DO USUÁRIO</h1>
            </div>

            <hr className="bg-black mr-32 ml-32 border-solid border-1 border-black" />
            
            <div className="flex flex-wrap justify-around">

                <InfoBasicUser />

                <ImageUser />

                <AcountDetails />
                
                <ContactInfo />

                <InfoBank />

            </div>
        </div>
    );
}