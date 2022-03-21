import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, Row } from 'reactstrap';
import { Header } from '../../components/Navbar';
import { config } from '../../utils/constants';


export function EditAccount(props) {
  const [account, setAccount] = useState({
    name: "",
    account_type: null,
    active: false,
    show_on_dashboard: false,
    iban: "",
    import_ibans: "",
    import_names: ""
  });

  const baseURL = config.API_URL;
  const Url = `${baseURL}/api/accounts/` + props.match.params.id;

  useEffect(() => {
    const GetData = async () => {
      const result = await axios(Url);
      setAccount(result.data);
    };

    GetData();
  }, []);

  const updateAccount = (e) => {
    e.preventDefault();
    const data = {
      id: props.match.params.id,
      name: account.name,
      account_type: account.account_type,
      active: account.active,
      show_on_dashboard: account.show_on_dashboard,
      iban: account.iban,
      import_ibans: account.import_ibans,
      import_names: account.import_names
    };
    axios.post(`${baseURL}/api/accounts/`, data)
      .then((result) => {
        props.history.push('/accounts/')
      });
  };

  const onChange = (e) => {
    e.persist();
    setAccount({ ...account, [e.target.name]: e.target.value });
  }

  const goBack = (id) => {
    props.history.push({
      pathname: '/accounts/'
    });
  };

  return (
    <div className="app flex-row align-items-center">
      <Header/>
      <Container>
        <Row className="justify-content-center">
          <Col md="12" lg="10" xl="8">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form onSubmit={updateAccount}>
                  <h1>Edit Account</h1>

                  <InputGroup className="mb-3">
                    <Input type="text" name="Name" id="Name" placeholder="Name" value={account.name} onChange={onChange} />
                  </InputGroup>

                  <InputGroup className="mb-3">
                    <Input type="text" name="Iban" id="Iban" placeholder="Iban" value={account.iban} onChange={onChange} />
                  </InputGroup>
                 

                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button onClick={() => { goBack() }} className="btn btn-info mb-1" block><span>Cancel</span></Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}