import Image from "next/image"

import BannerImage from '../../../public/banner-about-page.jpg'
import HouseImage from '../../../public/house-about-page.png'
import WomanIcon from '../../../public/woman-about-page.png'
import TargetIcon from '../../../public/icons/target_icon.svg'
import VisionIcon from '../../../public/icons/vision_icon.svg'
import DiamondIcon from '../../../public/icons/diamond_icon.svg'

export default function About() {
    return (
        <main className="bg-white text-black dark:bg-black-100 dark:text-white min-h-screen">
            <div className="relative h-[380px] max-md:h-[260px] z-10">
                <Image src={BannerImage} alt="Banner da página sobre" className="h-[380px] max-md:h-[260px] w-full object-cover" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-[#3D3D43] bg-opacity-80 px-16">
                    <h1 className="font-title font-bold text-5xl max-md:4xl text-orange-400">Sobre Nós</h1>

                    <p className="text-white max-md:text-xs">StayEasy: Conectando viajantes a experiências únicas em lares ao redor do mundo.</p>
                </div>
            </div>

            <div className="relative -mt-[60px] space-y-32 max-md:space-y-[68px] z-20">
                <section className="flex flex-wrap justify-center items-center gap-20 max-lg:gap-10 max-md:gap-3 max-md:flex-col">
                    <div className="h-[220px] max-md:h-[160px] w-[260px] shadow-md px-4 max-md:px-3 py-7 max-md:py-2 space-y-4 rounded-lg text-center  bg-white dark:bg-black-100">
                        <Image src={TargetIcon} alt="Ícone de objetivo" className="mx-auto text-white" />

                        <p className="max-md:text-xs">Nossa <span className="text-blue-600 dark:text-blue-200">missão</span> é proporcionar experiências únicas e acessíveis conectando anfitriões e viajantes de todo o mundo.</p>
                    </div>

                    <div className="h-[220px] max-md:h-[160px] w-[260px] shadow-md px-4 py-7 space-y-4 rounded-lg text-center  bg-white dark:bg-black-100">
                        <Image src={VisionIcon} alt="Ícone de visão" className="mx-auto" />

                        <p className="max-md:text-xs">Temos como <span className="text-blue-600 dark:text-blue-200">objetivo</span> nos tornar uma plataforma global para viagens e experiências, ganhando a confiança de nossos usuários.</p>
                    </div>

                    <div className="h-[220px] max-md:h-[160px] w-[260px] shadow-md px-4 py-7 space-y-4 rounded-lg text-center  bg-white dark:bg-black-100">
                        <Image src={DiamondIcon} alt="Ícone de valores" className="mx-auto" />

                        <p className="max-md:text-xs"><span className="text-blue-600 dark:text-blue-200">Valorizamos</span> e buscamos a autenticidade, acessibilidade, sustentabilidade, inovação e a confiança.</p>
                    </div>
                </section>

                <section className="flex items-center gap-32 max-lg:gap-24 max-md:flex-col px-44 max-xl:px-20 max-md:px-6">
                    <div className="relative flex h-[276px]  max-md:hidden">
                        <div className="h-[250px] max-lg:h-[200px] w-[250px] max-lg:w-[200px] bg-orange-400 rounded-lg -rotate-[8deg]" />

                        <Image src={HouseImage} alt="Imagem de uma casa" className="absolute h-[276px] max-lg:h-[216px] w-[276px] max-lg:w-[216px] top-7 max-lg:top-5 left-20 max-lg:left-10" />
                    </div>

                    <div className="space-y-6 max-md:space-y-5">
                        <h2 className="font-title font-bold text-5xl max-md:text-2xl max-md:text-center text-blue-600 dark:text-blue-200">O que nos torna diferentes?</h2>

                        <p className="max-md:text-xs">Nossa jornada começou com a crença de que <span className="text-blue-600 dark:text-blue-200">todos merecem a chance de explorar o mundo</span> de uma forma acessível e personalizada. <br /><br />Aqui, cada anfitrião é um embaixador de sua cultura, oferecendo mais do que uma hospedagem: uma imersão no estilo de vida local. Cada viajante, por sua vez, tem a chance de descobrir destinos de forma personalizada e autêntica.</p>

                        <div className="relative h-[240px] w-[280px] flex mx-auto md:hidden">
                            <div className="h-[200px] w-[200px] bg-orange-400 rounded-lg -rotate-[8deg] mx-auto" />

                            <Image src={HouseImage} alt="Imagem de uma casa" className="absolute h-[216px] w-[216px] top-4 left-16" />
                        </div>
                        <p className="max-md:text-xs px-4 py-2 bg-blue-100 dark:text-black-100 rounded-lg">Não somos apenas uma plataforma de aluguel de espaços; somos uma comunidade de exploradores, anfitriões e contadores de histórias.</p>
                    </div>
                </section>

                <section className="flex gap-32 pt-[70px] pb-[62px] px-[238px] max-lg:px-20 max-md:p-8 max-md:text-center bg-blue-600">
                    <div>
                        <h2 className="font-title font-bold text-4xl text-orange-200">Junte-se a nós</h2>

                        <p className="mt-11 mb-12 text-white max-md:text-xs">Seja você anfitrião ou viajante, faça parte da nossa comunidade e descubra um mundo cheio de possibilidades. Junte-se a nós e viva experiências que ficarão para sempre na sua memória.</p>

                        <button className="w-32 h-10 font-bold bg-orange-300 text-white rounded-2xl hover:opacity-80">Anunciar</button>
                    </div>

                    <Image src={WomanIcon} alt="Imagem de uma mulher com dedo indicador levantado" className="max-md:hidden" />
                </section>
            </div>
        </main>
    )
};
