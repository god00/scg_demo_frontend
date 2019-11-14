import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import styled from 'styled-components';
import api from '../services/api';


const MyButton = styled(Button)`
    font-size: 12px;
    margin-left: 10px;
    background-color: #ee2524;
    border-color: #ee2524;
`
const MyCol = styled(Col)`
    display: flex;
`
const ResultCol = styled(Col)`
    margin-top: 16px;
`
const TextRed = styled.span`
    color: red;
`
const TextGreen = styled.span`
    color: lightgreen;
`
const MyDiv = styled.div`
    margin-left: 24px;
`


const googleMapEndpoint = 'https://maps.google.com/?q=';

class SCG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: { results: [] },
            nearby: { results: [] }
        };
    }

    componentDidMount() {
    }

    getGoogleMapLink(location) {
        return `${googleMapEndpoint}${location.lat},${location.lng}`
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.target.blur()
        }
    }
    searchValue = (e) => {
        api.searchList(this.searchInput.value).then(res => {
            if (Array.isArray(res.results)) {
                this.setState({ search: { results: res.results } });
            }
        })
    }

    findNearby = () => {
        const keyword = this.nearbyInput.value;
        if (keyword != null && keyword !== '') {
            api.findNearByRestaurants(keyword).then(res => {
                if (Array.isArray(res.results)) {
                    this.setState({ nearby: { results: res.results } });
                }
            })
        }
    }

    renderGoogleMap() {
        const { nearby } = this.state;
        const { results: nearbyResults } = nearby;
        if (nearbyResults.length !== 0) {
            return nearbyResults.map((result, i) => (
                <Accordion key={`restaurants-${i}`}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            <a target="_blank" rel="noopener noreferrer" href={this.getGoogleMapLink(result.geometry.location)}>{`${result.name}`}</a>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body><MyDiv>{result['formatted_address']}</MyDiv></Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            )
            )
        }
        return
    }

    renderSearchResults() {
        const { search } = this.state;
        const { results: searchResults } = search;
        return searchResults.map((result, i) => {
            if (result) { return <li key={`search-${i}`}><TextGreen>{`${result}`}</TextGreen></li> }
            return <li key={`search-${i}`}><TextRed>{`${result}`}</TextRed></li>
        })
    }

    render() {

        return (

            <Container>
                <Row>
                    <MyCol>
                        <input type="text" placeholder="Search..." ref={(c) => this.searchInput = c}
                            onKeyDown={this.handleKeyDown}
                            onBlur={this.searchValue}
                        />
                    </MyCol>
                    <MyCol>
                        <input type="text" placeholder="Please fill area..." ref={(c) => this.nearbyInput = c}
                            onKeyDown={this.handleKeyDown}
                            onBlur={this.findNearby}
                        />
                        <MyButton variant="primary" onClick={this.findNearby}>Search</MyButton>
                    </MyCol>
                </Row>
                <Row>
                    <ResultCol>
                        {this.renderSearchResults()}
                    </ResultCol>
                    <ResultCol>
                        {this.renderGoogleMap()}
                    </ResultCol>
                </Row>
            </Container>
        );
    }
}

export default SCG;