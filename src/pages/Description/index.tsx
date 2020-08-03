import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import './styles.css';
import api from '../../services/api';
import Entreprises from '../../utils/enterprise';
import { Spinner } from 'react-bootstrap';
import { FiArrowLeft } from 'react-icons/fi';
import ItemDescription from '../../components/item-description';

const DescriptionPage = (props: any) => {

    const history = useHistory();
    const [item, setItem] = useState<Entreprises>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      console.log(item);
      
        
    }, [item]);
    
    useEffect(() => {
        setLoading(true);
        console.log(props.match.params.id);

        const headers = {
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
            "access-token": localStorage.getItem('access-token')
        }
        
        api.get(`enterprises/${props.match.params.id}`, {headers: headers}).then(response => {
            setLoading(false);
            const data = response.data.enterprise;
            setItem(data);
            
        }).catch((err) => {
            setLoading(false);
            console.log(err);    
            alert('Erro ao conectar com a API');
            history.push('/');    
        });
        
    }, []);


    return (
        <div id="description-page" className="container-fluid" style={{minHeight: '100vh', padding: 0}}>
                
        <nav className={`navbar navbar-dark bg-primary navbar-expand-lg ${loading ? "fade-on" : "fade-off"}`}>
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                <div className="d-flex w-50">
                    <div className="mr-4">
                        <Link to='/home'> <FiArrowLeft className="arrow-position" /> </Link>
                    </div>
                    <div>
                        <span className="nav-title">{item?.enterprise_name}</span>
                    </div>
                </div>
            </div>
        </nav>

        <div className={`${loading ? "spinner-on" : "spinner-off"}`}>
            <Spinner animation="border" role="status" variant="primary"/>
        </div>

        <ItemDescription {...item} />
        

    </div>
    );
}

export default DescriptionPage;
