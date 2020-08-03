import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom'
import './styles.css';
import api from '../../services/api';
import logo from '../../assets/logo-nav.png';
import lupa from '../../assets/ic-search-copy.svg';
import x from '../../assets/ic-close.svg';
import Entreprises from '../../utils/enterprise';
import { Spinner } from 'react-bootstrap';
import Enterprise_Types from '../../utils/enterprise-types';
import isEqual from '../../utils/equal';
import dados from '../../dados.json';
import ListItem from '../../components/item-list';

const HomePage = () => {
    
    const history = useHistory();
    const searchInputFocus: React.MutableRefObject<any> = useRef(null);
    const [search, setSearch] = useState<boolean>(false);
    const [results, setResults] = useState<boolean>(false);
    const [formData, setFormData]= useState({pesquisar: ''});
    const [items, setItems] = useState<Entreprises[]>([]);
    const [itemsToNotDisplay, setItemsToNotDisplay] = useState<Entreprises[]>([]);
    const [types, setTypes] = useState<Enterprise_Types[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        if (search) {
            searchInputFocus.current.focus();
        }
    }, [search]);

    useEffect(() => {
        if(selectedItem){
            history.push(`/description/${selectedItem}`); 
        }
    }, [selectedItem]);


    useEffect(() => {
            // const tipos = items.reduce((r, k) => {return r.concat(k, object[k])}, []);
            const tipos = itemsToNotDisplay.map(item => item.enterprise_type);
            let uniqueItens: Enterprise_Types[] = [];
            tipos.forEach(item => {
                if(isEqual(uniqueItens, item) !== true){
                    uniqueItens.push(item);
                }
            });
            setTypes(uniqueItens);            
    }, [itemsToNotDisplay]);
    

    
    useEffect(() => {
            if(types.length === 0){
                setLoading(true);
                const headers = {
                    client: localStorage.getItem('client'),
                    uid: localStorage.getItem('uid'),
                    "access-token": localStorage.getItem('access-token')
                }
        
                // setItems(dados.enterprises);
                api.get('enterprises', {headers: headers}).then(response => {
                    setLoading(false);
                    const data = response.data.enterprises;
                    setItemsToNotDisplay(data);
                }).catch((err) => {
                    setLoading(false);
                    alert('Erro ao conectar com a API');
                    console.log(err);        
                    history.push('/');
                })
            }
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();        
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

    const handleSearchClickOn = (evt: any) => {
        evt.preventDefault();
        setSearch(true);
        searchInputFocus.current.focus();
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) =>  {
        event.persist();
        setSelectedTypes(Number(event.target.value));
        
    }


    const handleSearchClickOff = () => {
        setSearch(false);
        setFormData({... formData, pesquisar: ""});
        if(results){
            setResults(false);
        }
    }

    const handleClickBegin = (evt: any) => {
        evt.preventDefault();
        setSearch(true);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setResults(false);

        const headers = {
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
            "access-token": localStorage.getItem('access-token')
        }

        if(formData.pesquisar.length === 0 && selectedTypes == 0){
            
            await api.get('enterprises', {headers: headers}).then(response => {
                setLoading(false);
                const data = response.data.enterprises;
                if(data.length === 0){
                    setResults(true);
                }else{
                    setItems(data);
                }
            }).catch((err) => {
                setLoading(false);
                alert('Erro ao conectar com a API');
                console.log(err);        
                history.push('/');
            });
        }else{
            if(selectedTypes === 0){ 
                await api.get(`enterprises?name=${formData.pesquisar}`, {headers: headers}).then(response => {
                    setLoading(false);
                    const data = response.data.enterprises;
                    if(data.length === 0){
                        setResults(true);
                    }else{
                        setItems(data);
                    }
                }).catch((err) => {
                    setLoading(false);
                    alert('Erro ao conectar com a API');
                    console.log(err);        
                    history.push('/');
                });
            }else{
                
                await api.get(`enterprises?enterprise_types=${selectedTypes}&name=${formData.pesquisar}`, {headers: headers}).then(response => {
                    setLoading(false);
                    const data = response.data.enterprises;
                    if(data.length === 0){
                        setResults(true);
                    }else{
                        setItems(data);
                    }
                    

                }).catch((err) => {
                    setLoading(false);
                    alert('Erro ao conectar com a API');
                    console.log(err);        
                    history.push('/');
                });
            }


        }
    }
    

    return (
        <div id="home-page" className="container-fluid" style={{minHeight: '100vh', padding: 0}}>
                <nav className={`navbar navbar-dark bg-primary navbar-expand-lg ${loading ? "fade-on" : "fade-off"}`}>
                    <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                        <div className="d-flex justify-content-between w-50">
                            <div>
                                <Link to="/home"> <img className="logo-nav-position" src={logo} width={160} alt="Ioasys"/></Link>
                            </div>
                            <div className="d-flex justify-content-end w-50">
                                <form onSubmit={handleSubmit} className={`form-fill-available ${search ? "": "element-hide"}`}>
                                    <div className="form-group d-flex">
                                        <select className="form-control mr-2 select-width" id="exampleFormControlSelect1" onChange={handleSelectChange}>
                                            <option key={0} value="">Selecione</option>
                                            {
                                                types.map(item => (
                                                    <option key={item.id} value={item.id}>{item.enterprise_type_name}</option>
                                                ))
                                            }
                                        </select>
                                        
                                        <div className="inner-addon left-addon right-addon element-fill-available">
                                            <img className="icon" src={lupa} alt="Ioasys"/>
                                            <img className="icon-close" src={x} alt="Ioasys" onClick={handleSearchClickOff} />
                                            <input type="text" ref={searchInputFocus} className="form-control" placeholder="Pesquisar" value={formData.pesquisar} id="pesquisar" name="pesquisar" onChange={handleInputChange}/>
                                        </div>

                                    </div>
                                </form>
                                <a href="#" onClick={handleSearchClickOn}> <img className={search ? "search-icon-position-hide": "search-icon-position"} src={lupa} width={30} alt="Search"/> </a>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className={`${loading ? "spinner-on" : "spinner-off"}`}>
                    <Spinner animation="border" role="status" variant="primary"/>
                </div>

                <div className={`container ${loading ? "fade-on" : "fade-off"}`}>
                    <div className="row">
                        <div className={`col-xl-12 mt-5 text ${search ? "element-hide": ""}`}>
                           <a href="#" onClick={handleClickBegin}> <span className="text">Clique para começar</span> </a> 
                        </div>

                        <div className={`col-xl-12 mt-5 text ${results ? "": "element-hide" }`}>
                           <span className="text">Nenhuma empresa foi encontrada para a busca realizada.</span>
                        </div>
                        {
                            items.map(({id, ...otherProps}) => (
                                <ListItem key={id} {...otherProps} onPress={() => {setSelectedItem(id)}}/>
                            ))
                        }
                    </div>
                </div>
        </div>
    );
}


export default HomePage;