import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import {  Container, Card,  Col, Row, Table } from 'react-bootstrap';
import axios from 'axios';

// import { AccountContext, removeAccount, getAccountList } from '../../context/AccountState';
import { Header } from '../../components/Navbar';
import { MonoLoginButton } from '../../components/MonoButtons';
import { config } from '../../utils/constants';


export function AccountList(props) {
  const [accounts, setAccountList] = useState([]);
  // const { accounts } = useContext(AccountContext);
 
  const baseURL = config.API_URL;
  useEffect(() => {
    const GetData = async () => {
      const result = await axios(`${baseURL}/api/accounts/`);
      setAccountList(result.data);
      //getAccountList();      
      }; 

    GetData();
  }, []);

  const deleteAccount = (id) => {
    // debugger;
    axios.delete(`${baseURL}/api/accounts/${id}/`)
      .then((result) => {

        setAccountList(prevdata => accounts.filter(
          (account) => account.id !== id
        ))

      });
  };

  const editAccount = (id) => {
    props.history.push({
      pathname: '/account/edit/' + id
    });
  };

  return (
    <>     
    <Header/>
    
      <div className="animated fadeIn ">
        <Row>
        <Col xl={12}>
            <Card className="p-5">
              <h2> Account List</h2>

              <div>
                <span className=" btn btn-success mb-2 text-white"><Link to={`/account/add/`}>Add New</Link>                                  </span>
                {accounts.length > 0 ? (
                  <Table hover bordered striped responsive size="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Active</th>
                        <th>Show</th>
                        <th>Iban</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        accounts.map((item, idx) => {
                          return <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.account_type}</td>
                            <td>{item.active == 1 ? 'Yes' : 'No'}</td>
                            <td>{item.show_on_dashboard == 1 ? 'Yes' : 'No'}</td>
                            <td>{item.iban}  </td>
                            <td>
                              <div class="btn-group">
                                <button className="btn btn-warning" onClick={() => { editAccount(item.id) }}>Edit</button>
                                <button className="btn btn-secondary" onClick={() => { deleteAccount(item.id) }}>Delete</button>
                                <MonoLoginButton/>
                              </div>
                            </td>
                          </tr>
                        })}
                    </tbody>
                  </Table>
                ) : (
                  <h3 className="text-center bg-gray-100 text-gray-500 py-5">No Record Found.</h3>
                )}
              </div>

            </Card>
          </Col>
        </Row>
      </div>

    </>
  )
}


