import Image from 'next/image'
import Link from 'next/link'

import Logo from '../../../../public/icons/logo.svg'
import ArrowRight from '../../../../public/icons/arrow_up_right_icon.svg'

export default function Terms() {
    return (
        <main className="min-h-screen px-24 space-y-4">
            <Link href={'/'}><Image src={Logo} alt='Logo' /></Link>

            <Link href={'/legal/privacy'} className='flex items-center gap-1 hover:underline'>Políticas de privacidade<Image src={ArrowRight} alt='Ícone de seta para cima e direita' className='size-4'/></Link>

            <div className="text-black-300 space-y-3">
                <h1 className="font-bold text-xl uppercase">TERMOS E CONDIÇÕES</h1>

                <div className="border-t mx-1 border-gray-200" />
                <div>
                    <h2>1. Termos</h2>
                    <p>Ao acessar ao site Stay Easy, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
                </div>

                <div>
                    <h2>2. Uso de Licença</h2>
                    <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Stay Easy , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode: modificar ou copiar os materiais; usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial); tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Stay Easy; remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou transferir os materiais para outra pessoa ou {'espelhe'} os materiais em qualquer outro servidor.Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Stay Easy a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</p>
                </div>

                <div>
                    <h2>3. Isenção de responsabilidade</h2>
                    <p>Os materiais no site da Stay Easy são fornecidos {'como estão'}. Stay Easy não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.Além disso, o Stay Easy não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</p>
                </div>

                <div>
                    <h2>4. Limitações</h2>
                    <p>Em nenhum caso o Stay Easy ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Stay Easy, mesmo que Stay Easy ou um representante autorizado da Stay Easy tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</p>
                </div>

                <div>
                    <h2>5. Precisão dos materiais</h2>
                    <p>Os materiais exibidos no site da Stay Easy podem incluir erros técnicos, tipográficos ou fotográficos. Stay Easy não garante que qualquer material em seu site seja preciso, completo ou atual. Stay Easy pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Stay Easy não se compromete a atualizar os materiais.6. LinksO Stay Easy não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Stay Easy do site. O uso de qualquer site vinculado é por conta e risco do usuário.ModificaçõesO Stay Easy pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.Lei aplicávelEstes termos e condições são regidos e interpretados de acordo com as leis do Stay Easy e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
                </div>
            </div>
        </main>
    )
};
