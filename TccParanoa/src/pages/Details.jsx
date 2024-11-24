import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
  padding: 2em;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #fcb923;
  text-align: center;
  margin-bottom: 2em;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5em;
  color: #fcb923;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1em;
  justify-content: flex-end;
  margin-top: 2em;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 2em;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const ImageUploadContainer = styled(FlexRow)`
  justify-content: space-between;
`;

const ImageArea = styled.div`
  flex: 1;
  max-width: 48%;
  background-color: ${(props) => (props.red ? '#f44336' : '#4caf50')};
  padding: 1em;
  border-radius: 4px;
  text-align: center;
  color: white;
  border: 1px solid #fcb923;
  position: relative;

  aspect-ratio: 1; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    transform: scale(1.01);
  }

  img {
    max-width: 90%; 
    max-height: 90%; 
    border-radius: 4px;
    object-fit: contain; 
    margin-top: 1em;
  }

  input {
    display: none;
  }

  label {
    display: inline-block;
    margin-top: 1em;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.7em 1.5em;
    border-radius: 4px;
    font-size: 1em;
    color: white;
    transition: 0.3s;
  }

  label:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const FieldContainer = styled.div`
  margin-bottom: 1.5em;

  textarea,
  select {
    width: 100%;
    padding: 0.8em;
    margin-top: 0.5em;
    border: 1px solid #fcb923;
    border-radius: 4px;
    background-color: rgb(45, 45, 45);
    color: white;
  }

  textarea:focus,
  select:focus {
    outline: none;
    border-color: #fcb923;
  }
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  margin-top: 2em;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 8px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  color: white;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: #fcb923;
  }
`;

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [responsaveis, setResponsaveis] = useState([]);
  const [imageBefore, setImageBefore] = useState(null);
  const [imageAfter, setImageAfter] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/lista8d/${id}`);
        const result = await response.json();
        setData(result);
        setEditedData(result);
        setImageBefore(result.imagemAntes);
        setImageAfter(result.imagemDepois);

        const responseResponsaveis = await fetch('http://localhost:3000/responsavel');
        const resultResponsaveis = await responseResponsaveis.json();
        setResponsaveis(resultResponsaveis);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(data);
  };

  const handleSave = async () => {
    try {
      const updatedData = { ...editedData, imagemAntes: imageBefore, imagemDepois: imageAfter };

      const response = await fetch(`http://localhost:3000/lista8d/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedDataResult = await response.json();
        setData(updatedDataResult);
        setIsEditing(false);
      } else {
        console.error('Erro ao atualizar dados');
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  const handleChange = (field, value) => {
    setEditedData({ ...editedData, [field]: value });
  };

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage('');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container>
          <p>Carregando...</p>
        </Container>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <Container>
          <p>Item não encontrado.</p>
          <button onClick={() => navigate('/dashboard')}>Voltar</button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <Title>Detalhes do 8D - {data.numero8D}</Title>
        {isEditing ? (
          <>
            <ResponsiveGrid>
              <FieldContainer>
                <Label>Data de Abertura:</Label>
                <p>{data.dataCriacao}</p>
              </FieldContainer>
              <FieldContainer>
                <Label>Cliente:</Label>
                <p>{data.cliente.nome}</p>
              </FieldContainer>
            </ResponsiveGrid>
            <FieldContainer>
              <Label>Responsável:</Label>
              <select
                value={editedData.responsavel.id}
                onChange={(e) =>
                  handleChange('responsavel', {
                    ...editedData.responsavel,
                    id: e.target.value,
                    nome: responsaveis.find((resp) => resp.id === parseInt(e.target.value))?.nome,
                  })
                }
              >
                {responsaveis.map((responsavel) => (
                  <option key={responsavel.id} value={responsavel.id}>
                    {responsavel.nome}
                  </option>
                ))}
              </select>
            </FieldContainer>

            <FieldContainer>
              <Label>Descrição:</Label>
              {isEditing ? (
                <textarea
                  rows="5"
                  value={editedData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                />
              ) : (
                <p style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{data.descricao}</p>
              )}
            </FieldContainer>

            <ImageUploadContainer>
              <ImageArea red>
                <label>
                  Selecione a imagem "Antes"
                  <input type="file" onChange={(e) => handleImageUpload(e, setImageBefore)} />
                </label>
                {imageBefore && <img src={imageBefore} alt="Imagem Antes" />}
              </ImageArea>
              <ImageArea>
                <label>
                  Selecione a imagem "Depois"
                  <input type="file" onChange={(e) => handleImageUpload(e, setImageAfter)} />
                </label>
                {imageAfter && <img src={imageAfter} alt="Imagem Depois" />}
              </ImageArea>
            </ImageUploadContainer>

            <ButtonGroup>
              <button onClick={handleSave}>Salvar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <ResponsiveGrid>
              <FieldContainer>
                <Label>Data de Abertura:</Label>
                <p>{data.dataCriacao}</p>
              </FieldContainer>
              <FieldContainer>
                <Label>Cliente:</Label>
                <p>{data.cliente.nome}</p>
              </FieldContainer>
            </ResponsiveGrid>
            <FieldContainer>
              <Label>Responsável:</Label>
              <p>{data.responsavel.nome}</p>
            </FieldContainer>
            <FieldContainer>
              <Label>Descrição:</Label>
              <p>{data.descricao}</p>
            </FieldContainer>

            <ImageUploadContainer>
              <ImageArea red onClick={() => handleImageClick(data.imagemAntes)}>
                <img src={imageBefore || data.imagemAntes} alt="Imagem Antes" />
              </ImageArea>
              <ImageArea onClick={() => handleImageClick(data.imagemDepois)}>
                <img src={imageAfter || data.imagemDepois} alt="Imagem Depois" />
              </ImageArea>
            </ImageUploadContainer>

            <ButtonGroup>
              <button onClick={handleEdit}>Editar</button>
            </ButtonGroup>
          </>
        )}

        {modalOpen && (
          <Modal>
            <img src={modalImage} alt="Imagem Expandida" />
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </Modal>
        )}

        <ButtonGroup>
          <button onClick={() => navigate('/dashboard')}>Voltar</button>
        </ButtonGroup>
      </Container>
    </>
  );
};

export default Details;
