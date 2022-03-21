import React from 'react'
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Header } from '../../components/Navbar';
import { config } from '../../utils/constants';

export function OutflowList(props) {
    const [data, setData] = useState([]);

    const baseURL = config.API_URL;
    useEffect(() => {
        const GetData = async () => {
            const result = await axios(`${baseURL}/api/transactions/`);
            const transactions = result.data;
            
            setData(prevdata => transactions.filter(
                (item) => item.transaction_type === 2
            ))

            // setData(result.data);
        };

        GetData();
    }, []);
   
   

    return (
        <div className="animated fadeIn">
          <Header/>
            <Row>
                <Col>
                    <Card>
                        <CardHeader>
                            Outflows History
                        </CardHeader>
                        <CardBody>
                            <Table hover bordered striped responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Notes</th>
                                        <th>Transaction Type</th>
                                        <th>Amount</th>
                                        <th>Sender</th>
                                        <th>Receiver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, idx) => {
                                            return <tr>
                                                <td>{item.title}</td>
                                                <td>{item.date}</td>
                                                <td>{item.notes}</td>
                                                <td>{item.transaction_type}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.src} </td> 
                                                <td>{item.dst} </td>                                                
                                            </tr>
                                        })}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}