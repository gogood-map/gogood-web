import React, { useEffect, useRef, useState } from 'react';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { useAuth } from '../../../../hooks/AuthProvider/AuthProvider';
import { getUserImage, updateUserImage, deleteUserImage } from '../../../../utils/requests/user';
import { LoaderIcon } from '../../../../components/LoaderIcon/LoaderIcon';

export function ImageProfile() {
  const [image, setImage] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false); // Indica o carregamento
  const { user } = useAuth();
  const tooltipRef = useRef<HTMLDivElement | null>(null); // Referência ao tooltip

  const createAvatarImage = () => {
    if (user) {
      const svg = createAvatar(initials, {
        seed: user.name,
        scale: 75,
      });
      setImage(svg.toDataUri());
    }
  };

  const getUserImageProfile = () => {
    if (user) {
      getUserImage(user.id)
        .then((response) => {
          if (response.data.size === 0) {
            createAvatarImage();
            return;
          } else {
            setImage(URL.createObjectURL(response.data));
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar imagem do usuário', error);
          createAvatarImage();
        });
    }
  };

  const updateImageProfile = (file: Blob) => {
    if (file && user) {
      setUpdateStatus(true);
      updateUserImage(user.id, file)
        .then(() => {
          setUpdateStatus(false);
        })
        .catch((error) => {
          console.error('Erro ao atualizar imagem do usuário', error);
          setUpdateStatus(false);
        });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Atualiza visualmente a imagem
      updateImageProfile(file); // Envia a imagem para o backend
    }
  };

  const handleDeleteImage = () => {
    if (user) {
      deleteUserImage(user.id)
        .then(() => {
          createAvatarImage();
        })
        .catch((error) => {
          console.error('Erro ao deletar imagem do usuário', error);
        });
    }
  }

  const handleToggleTooltip = () => setTooltipVisible((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setTooltipVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // Adiciona o listener global
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Remove o listener no cleanup
    };
  }, []);

  useEffect(() => {
    getUserImageProfile();
  }, [user]);

  return (
    <section>
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {/* Imagem do perfil */}
        <img
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            cursor: 'pointer', // Corrigido o cursor
          }}
          src={image || ''}
          onClick={handleToggleTooltip}
          alt="Imagem do Perfil"
        />

        {/* Tooltip */}
        {tooltipVisible && (
          <div
            ref={tooltipRef} // Referência ao tooltip para capturar cliques fora
            style={{
              position: 'absolute',
              top: '110%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              zIndex: 10,
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                transition: 'background 0.2s',
                background: '#f3f3f3',
              }}
            >
              📷 Carregar foto
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </label>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              onClick={(event) => {
                event.preventDefault(); // Previne o recarregamento
                handleDeleteImage();
              }}
            >
              🗑️ Apagar foto
            </button>
          </div>
        )}

        {updateStatus && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
            }}
          >
            <LoaderIcon />
          </div>
        )}
      </span>
    </section>
  );
}
