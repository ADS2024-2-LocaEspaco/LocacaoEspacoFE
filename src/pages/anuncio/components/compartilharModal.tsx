import React, { useState } from "react";
import { useRouter } from 'next/router';
import { FaCopy, FaEnvelope, FaComments, FaWhatsapp, FaFacebook, FaTwitter, FaCode, FaEllipsisH } from "react-icons/fa";

type CompartilharModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
};

const CompartilharModal: React.FC<CompartilharModalProps> = ({ isOpen, onClose, titulo }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const router = useRouter();
  const currentUrl = `${window.location.origin}${router.asPath}`;
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }).catch(err => {
      console.error("Erro ao copiar: ", err);
    });
  };

  const handleEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(currentUrl)}`;
  };

  const handleMessages = () => {
    if (navigator.share) {
      navigator.share({
        title: titulo,
        text: 'Confira este lugar incrível!',
        url: currentUrl,
      }).catch(err => {
        console.error("Erro ao compartilhar: ", err);
      });
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const handleTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(titulo)}`, '_blank');
  };

  const handleEmbed = () => {
    setEmbedModalOpen(true);
  };
  /* 
    const handleMoreOptions = () => {
      alert('Mais opções de compartilhamento ainda não implementadas.');
    };
   */
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-sm w-full">
          <h2 className="text-lg text-black-100 font-bold mb-4">Compartilhe este lugar</h2>
          <p className="text-sm text-black-100 mb-4">{titulo}</p>

          <div className="grid grid-cols-2 gap-2 mb-4 text-black-100">
            <button className="border p-2 rounded flex items-center justify-center" onClick={handleCopyLink}>
              <FaCopy className="mr-2" />
              Copiar link
            </button>
            <button className="border p-2 rounded flex items-center justify-center" onClick={handleEmail}>
              <FaEnvelope className="mr-2" />
              Email
            </button>
            <button className="border p-2 rounded flex items-center justify-center" onClick={handleMessages}>
              <FaComments className="mr-2" />
              Mensagens
            </button>
            <button className="border p-2 rounded flex items-center justify-center" onClick={handleWhatsApp}>
              <FaWhatsapp className="mr-2" />
              WhatsApp
            </button>
            <button className="border p-2 rounded flex items-center justify-center" onClick={handleFacebook}>
              <FaFacebook className="mr-2" />
              Facebook
            </button>
            <button className="border p-2 rounded flex items-center justify-center" onClick={handleTwitter}>
              <FaTwitter className="mr-2" />
              Twitter
            </button>
            <button className="border p-2 rounded flex items-center justify-center" onClick={handleEmbed}>
              <FaCode className="mr-2" />
              Incorporar
            </button>
            {/*      <button className="border p-2 rounded flex items-center justify-center" onClick={handleMoreOptions}>
              <FaEllipsisH className="mr-2" />
              Mais opções
            </button> */}
          </div>

          {copySuccess && (
            <div className="copy-success-message text-black-100">
              Copiado com sucesso!
            </div>
          )}

          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>

      {embedModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg text-black-100 font-bold mb-4">Incorporar</h2>
            <p className="text-sm text-black-100 mb-4">Copie o código abaixo para incorporar este conteúdo em seu site:</p>
            <textarea
              title="Código de incorporação"
              className="w-full p-2 border rounded text-left text-sm mb-4 text-black-100"
              rows={4}
              readOnly
              value={`<iframe src="${currentUrl}" width="600" height="400" frameborder="0"></iframe>`}
            />
            <button className="border p-2 rounded flex items-center justify-center mb-4 text-black-100" onClick={() => {
              navigator.clipboard.writeText(`<iframe src="${currentUrl}" width="600" height="400" frameborder="0"></iframe>`).then(() => {
                alert('Código de incorporação copiado com sucesso!');
              }).catch(err => {
                console.error("Erro ao copiar: ", err);
              });
            }}>
              <FaCopy className="mr-2 text-black-100" />
              Copiar código
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setEmbedModalOpen(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompartilharModal;