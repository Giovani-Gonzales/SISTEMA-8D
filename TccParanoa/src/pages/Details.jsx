import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';

const Container = styled.div`
  padding: 2em;
  color: white;
`;

const Title = styled.h1`
  color: #fcb923;
`;

const BackButton = styled.button`
  margin-top: 1em;
  padding: 0.5em 1em;
  background-color: #fcb923;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #d89c1b;
  }
`;

const EditButton = styled(BackButton)`
  margin-left: 1em;
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }
`;

const SaveButton = styled(BackButton)`
  background-color: #007bff;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(BackButton)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
  border: 1px solid #fcb923;
  border-radius: 4px;
  background-color: rgb(45, 45, 45);
  color: white;
  font-size: 1em;

  &:focus {
    outline: none;
    border-color: #fcb923;
  }

  ::placeholder {
    color: #ccc;
  }
`;

const Select = styled.select`
  padding: 0.5em;
  margin-bottom: 1em;
  width: 100%;
  border: 1px solid #fcb923;
  border-radius: 4px;
  background-color: rgb(45, 45, 45);
  color: white;

  &:focus {
    outline: none;
    border-color: #fcb923;
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-bottom: 2em;
`;

const ImageArea = styled.div`
  width: 48%;
  padding: 1em;
  border-radius: 4px;
  text-align: center;
  background-color: ${(props) => (props.red ? 'red' : 'green')};
  color: white;
  border: 1px solid #fcb923;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1em;
    border-radius: 4px;
    font-size: 1.2em;
    color: white;
    margin-top: 1em;
    transition: 0.3s;
  }

  label:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-top: 1em;
  }
`;

const ImageViewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  margin-bottom: 2em;
`;

const ImageViewArea = styled.div`
  width: 48%;
  padding: 1em;
  border-radius: 4px;
  text-align: center;
  background-color: ${(props) => (props.red ? 'red' : 'green')};
  color: white;
  border: 1px solid #fcb923;

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-top: 1em;
  }
`;

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [responsaveis, setResponsaveis] = useState([]); // Lista de responsáveis
  const [imageBefore, setImageBefore] = useState(null);
  const [imageAfter, setImageAfter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Carregar dados do 8D
        const response = await fetch(`http://localhost:3000/lista8d/${id}`);
        const result = await response.json();
        setData(result);
        setEditedData(result);
        setImageBefore(result.imagemAntes); // Preenche com a imagem existente, se houver
        setImageAfter(result.imagemDepois); // Preenche com a imagem existente, se houver

        // Carregar lista de responsáveis
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
    setEditedData(data); // Restaura os dados originais
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
        setImage(reader.result); // Converte a imagem para base64
      };
      reader.readAsDataURL(file);
    }
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
          <BackButton onClick={() => navigate('/dashboard')}>Voltar</BackButton>
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
            <p>
              <strong>Data de Abertura:</strong> {data.dataCriacao}
            </p>
            <p>
              <strong>Cliente:</strong> {data.cliente.nome}
            </p>

            <label>Responsável</label>
            <Select
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
            </Select>

            <label>Descrição</label>
            <TextArea
              value={editedData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
            />

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

            <SaveButton onClick={handleSave}>Salvar</SaveButton>
            <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
          </>
        ) : (
          <>
            <p>
              <strong>Data de Abertura:</strong> {data.dataCriacao}
            </p>
            <p>
              <strong>Cliente:</strong> {data.cliente.nome}
            </p>
            <p>
              <strong>Responsável:</strong> {data.responsavel.nome}
            </p>
            <p>
              <strong>Descrição:</strong> {data.descricao}
            </p>

            <ImageViewContainer>
              <ImageViewArea red>
                <img src={imageBefore || data.imagemAntes} alt="Imagem Antes" />
              </ImageViewArea>
              <ImageViewArea>
                <img src={imageAfter || data.imagemDepois} alt="Imagem Depois" />
              </ImageViewArea>
            </ImageViewContainer>

            <EditButton onClick={handleEdit}>Editar</EditButton>
          </>
        )}

        <BackButton onClick={() => navigate('/dashboard')}>Voltar</BackButton>
      </Container>
    </>
  );
};

export default Details;
