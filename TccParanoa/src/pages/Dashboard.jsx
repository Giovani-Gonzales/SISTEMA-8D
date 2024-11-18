import styled from 'styled-components';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Form8D from './Form8D';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
`;

const DashboardContent = styled.div`
  padding: 2em;
  width: 100%;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Rectangle = styled.div`
  width: 48%;
  height: 11em;
  margin: 1em 0;
  background-color: rgb(75, 75, 75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: white;
  font-size: 1.2em;
  border-radius: 8px;
  border: 1px solid transparent;
  transition: 0.25s;
  padding: 2em;

  &:hover {
    border: 1px solid #fcb923;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const RectangleTitle = styled.h2`
  margin: 0 0 0.5em 0;
  color: #fcb923;
`;

const RectangleInfoItem = styled.p`
  margin: 0.3em 0;
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2em;
  right: 2em;
  background-color: #fcb923;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PageNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2em;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    color: #fcb923;
  }
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${({ active }) => (active ? '#fcb923' : '#555')};
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
`;

// Filtro de estilos
const FilterContainer = styled.div`
  margin-bottom: 2em;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1em;
  justify-content: center;
  align-items: center;
`;

const FilterLabel = styled.label`
  color: white;
  font-size: 1em;
  margin-bottom: 0.5em;
  display: block;
`;

const FilterInput = styled.input`
  padding: 0.5em;
  margin-right: 1em;
  width: 200px;
  border: 1px solid #fcb923;
  border-radius: 4px;
  background-color: rgb(45, 45, 45);
  color: white;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: #fcb923;
  }
`;

const Select = styled.select`
  padding: 0.5em;
  margin-right: 1em;
  border: 1px solid #fcb923;
  border-radius: 4px;
  background-color: rgb(45, 45, 45);
  color: white;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:focus {
    outline: none;
    border-color: #fcb923;
  }
`;

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [data, setData] = useState([]); // Dados obtidos da API lista8d
  const [clientes, setClientes] = useState([]); // Dados obtidos da API clientes
  const [responsaveis, setResponsaveis] = useState([]); // Dados obtidos da API responsavel
  const [filteredData, setFilteredData] = useState([]); // Dados após filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [search, setSearch] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [responsibleFilter, setResponsibleFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('newest');

  // Busca os dados das APIs
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Puxa dados de 8D
        const response8D = await fetch('http://localhost:3000/lista8d');
        const result8D = await response8D.json();
        setData(result8D);
        setFilteredData(result8D); // Inicializa com todos os dados

        // Puxa dados de clientes
        const responseClientes = await fetch('http://localhost:3000/clientes');
        const resultClientes = await responseClientes.json();
        setClientes(resultClientes);

        // Puxa dados de responsáveis
        const responseResponsaveis = await fetch('http://localhost:3000/responsavel');
        const resultResponsaveis = await responseResponsaveis.json();
        setResponsaveis(resultResponsaveis);
      } catch (error) {
        console.error('Erro ao buscar dados das APIs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para aplicar filtros
  const applyFilters = () => {
    let filtered = data;

    // Filtro por nome do 8D
    if (search) {
      filtered = filtered.filter((item) =>
        item.numero8D.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtro por cliente
    if (clientFilter) {
      filtered = filtered.filter(
        (item) => item.cliente.nome === clientFilter
      );
    }

    // Filtro por responsável
    if (responsibleFilter) {
      filtered = filtered.filter(
        (item) => item.responsavel.nome === responsibleFilter
      );
    }

    // Filtro por data (mais novo para mais velho)
    if (dateFilter === 'newest') {
      filtered = filtered.sort((a, b) =>
        new Date(b.dataCriacao) - new Date(a.dataCriacao)
      );
    } else if (dateFilter === 'oldest') {
      filtered = filtered.sort((a, b) =>
        new Date(a.dataCriacao) - new Date(b.dataCriacao)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reseta a página ao aplicar filtro
  };

  // Função de efeito que aplica os filtros sempre que algum dos campos mudar
  useEffect(() => {
    applyFilters();
  }, [search, clientFilter, responsibleFilter, dateFilter]); // Dependências: qualquer filtro que mudar

  // Controle de paginação
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleOpenForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <>
      <Navbar />
      <DashboardContainer>
        <FilterContainer className='container'>
          <div>
            <FilterLabel>Buscar por nome do 8D</FilterLabel>
            <FilterInput
              type="text"
              placeholder="Digite o nome do 8D"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Alterado aqui
            />
          </div>

          <div>
            <FilterLabel>Selecione o Cliente</FilterLabel>
            <Select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)} // Alterado aqui
            >
              <option value="">Selecione o Cliente</option>
              {clientes.map((client) => (
                <option key={client.id} value={client.nome}>
                  {client.nome}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <FilterLabel>Selecione o Responsável</FilterLabel>
            <Select
              value={responsibleFilter}
              onChange={(e) => setResponsibleFilter(e.target.value)} // Alterado aqui
            >
              <option value="">Selecione o Responsável</option>
              {responsaveis.map((responsible) => (
                <option key={responsible.id} value={responsible.nome}>
                  {responsible.nome}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <FilterLabel>Ordenar por Data</FilterLabel>
            <Select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)} // Alterado aqui
            >
              <option value="newest">Mais Novo</option>
              <option value="oldest">Mais Antigo</option>
            </Select>
          </div>
        </FilterContainer>
        
        <DashboardContent>
          <h1>LISTA DE 8D</h1>  
        </DashboardContent>
        <DashboardContent>
          {loading ? (
            <p style={{ height: '70vh', color: 'rgb(253, 185, 19)' }}>
              Carregando dados...
            </p>
          ) : currentData.length === 0 ? (
            <p style={{ height: '70vh', color: 'rgb(253, 185, 19)' }}>
              Não há dados disponíveis.
            </p>
          ) : (
            currentData.map((rectangle) => (
              <Rectangle key={rectangle.id}>
                <RectangleTitle>8D ID: {rectangle.numero8D}</RectangleTitle>
                <RectangleInfoItem>
                  Data de Abertura: {rectangle.dataCriacao}
                </RectangleInfoItem>
                <RectangleInfoItem>
                  Cliente: {rectangle.cliente.nome}
                </RectangleInfoItem>
                <RectangleInfoItem>
                  Responsável: {rectangle.responsavel.nome}
                </RectangleInfoItem>
              </Rectangle>
            ))
          )}
          <FloatingButton onClick={handleOpenForm}>
            <FaPlus />
          </FloatingButton>

          {/* Navegação de páginas */}
          {totalPages > 1 && (
            <PageNavigation>
              <NavButton onClick={handlePrevPage} disabled={currentPage === 1}>
                <FaArrowLeft />
              </NavButton>

              {Array.from({ length: totalPages }, (_, index) => (
                <Dot
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                />
              ))}

              <NavButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <FaArrowRight />
              </NavButton>
            </PageNavigation>
          )}
        </DashboardContent>

        {showForm && <Form8D onClose={handleCloseForm} />}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
