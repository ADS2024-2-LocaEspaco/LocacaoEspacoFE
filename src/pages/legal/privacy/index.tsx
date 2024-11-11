import Image from "next/image";
import Link from "next/link";

import Logo from '../../../../public/icons/logo.svg'
import ArrowRight from '../../../../public/icons/arrow_up_right_icon.svg'

export default function Privacy() {
    return (
        <main className="min-h-screen px-24 space-y-4">
            <Link href={'/'}><Image src={Logo} alt='Logo' /></Link>

            <Link href={'/legal/terms'} className='flex items-center gap-1 hover:underline'>Termos de uso<Image src={ArrowRight} alt='Ícone de seta para cima e direita' className='size-4' /></Link>

            <div className="text-black-300 space-y-3">
                <div className="flex justify-between">
                    <h1 className="font-bold text-xl uppercase">Políticas de Privacidade</h1>

                    <span>Efetiva a partir de 01 de Outubro 2024 00:37</span>
                </div>

                <div className="border-t mx-1 border-gray-200" />
                <div>
                    {/* <h2>1. Termos</h2> */}
                    <p>A sua privacidade é importante para nós. É política do Stay Easy respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Stay Easy, e outros sites que possuímos e operamos.
                        <br /> Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
                        <br /> Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
                        <br /> Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
                        <br /> O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
                        <br /> Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.
                    </p>
                </div>

                <div>
                    <p>
                        O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.
                        <br />*O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.
                        <br />*Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
                        <br />*Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
                        <br />*Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.</p>                </div>

                <div>
                    <h2 className="font-bold">Compromisso do Usuário</h2>
                    <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Stay Easy oferece no site e com caráter enunciativo, mas não limitativo:
                        <br /><br /> A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
                        <br /> B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, pixbet ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
                        <br /> C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Stay Easy, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
                    </p>
                </div>

                <div>
                    <h2 className="font-bold">Mais informações</h2>
                    <p>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</p>
                </div>
            </div>
        </main>
    )
};
