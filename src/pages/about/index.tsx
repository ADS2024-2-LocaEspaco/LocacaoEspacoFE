import Image from "next/image"

import BannerImage from '../../../public/banner-about-page.jpg'
import HouseImage from '../../../public/house-about-page.png'
import WomanIcon from '../../../public/woman-about-page.png'
import TargetIcon from '../../../public/icons/target_icon.svg'
import VisionIcon from '../../../public/icons/vision_icon.svg'
import DiamondIcon from '../../../public/icons/diamond_icon.svg'

export default function About() {
    return (
        <main className="bg-white text-black min-h-screen">
            <div className="relative h-[380px] z-10">
                <Image src={BannerImage} alt="Banner da página sobre" className="h-[380px] w-full object-cover" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-[#3D3D43] bg-opacity-80">
                    <h1 className="font-bold text-5xl text-orange-400">Sobre Nós</h1>

                    <p className="text-white">StayEasy: Conectando viajantes a experiências únicas em lares ao redor do mundo.</p>
                </div>
            </div>

            <div className="relative -mt-[60px] space-y-32 z-20">
                <section className="flex justify-center gap-20">
                    <div className="w-[260px] shadow-md px-4 py-7 space-y-4 rounded-lg text-center bg-white">
                        <Image src={TargetIcon} alt="Ícone de objetivo" className="mx-auto" />

                        <p>Nossa <span className="text-blue-600">missão</span> é proporcionar experiências únicas e acessíveis conectando anfitriões e viajantes de todo o mundo.</p>
                    </div>

                    <div className="w-[260px] shadow-md px-4 py-7 space-y-4 rounded-lg text-center bg-white">
                        <Image src={VisionIcon} alt="Ícone de visão" className="mx-auto" />

                        <p>Temos como <span className="text-blue-600">objetivo</span> nos tornar uma plataforma global para viagens e experiências, ganhando a confiança de nossos usuários.</p>
                    </div>

                    <div className="w-[260px] shadow-md px-4 py-7 space-y-4 rounded-lg text-center bg-white">
                        <Image src={DiamondIcon} alt="Ícone de valores" className="mx-auto" />

                        <p><span className="text-blue-600">Valorizamos</span> e buscamos a autenticidade, acessibilidade, sustentabilidade, inovação e a confiança.</p>
                    </div>
                </section>

                <section className="px-44 flex ">
                    <div className="relative h-[276px] mr-[206px]">
                        <div className="h-[250px] w-[250px] bg-orange-400 rounded-lg -rotate-[8deg]" />

                        <Image src={HouseImage} alt="Imagem de uma casa" className="absolute h-[276px] w-[276px] top-7 left-20" />
                    </div>

                    <div className="space-y-6">
                        <h2 className="font-bold text-5xl text-blue-600">O que nos torna diferentes?</h2>

                        <p>Nossa jornada começou com a crença de que <span className="text-blue-600">todos merecem a chance de explorar o mundo</span> de uma forma acessível e personalizada. <br /><br />Aqui, cada anfitrião é um embaixador de sua cultura, oferecendo mais do que uma hospedagem: uma imersão no estilo de vida local. Cada viajante, por sua vez, tem a chance de descobrir destinos de forma personalizada e autêntica.</p>

                        <p className="px-4 py-2 bg-blue-100 rounded-lg">Não somos apenas uma plataforma de aluguel de espaços; somos uma comunidade de exploradores, anfitriões e contadores de histórias.</p>
                    </div>
                </section>

                <section className="flex gap-32 pt-[70px] pb-[62px] px-[238px] bg-blue-600">
                    <div>
                        <h2 className="font-bold text-4xl text-orange-200">Junte-se a nós</h2>

                        <p className="mt-11 mb-12 text-white">Seja você anfitrião ou viajante, faça parte da nossa comunidade e descubra um mundo cheio de possibilidades. Junte-se a nós e viva experiências que ficarão para sempre na sua memória.</p>

                        <button className="w-32 h-10 font-bold bg-orange-300 text-white rounded-2xl hover:opacity-80">Anunciar</button>
                    </div>

                    <Image src={WomanIcon} alt="Imagem de uma mulher com dedo indicador levantado" />
                </section>
            </div>
        </main>
    )
};
