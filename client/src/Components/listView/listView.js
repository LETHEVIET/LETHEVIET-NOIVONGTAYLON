import React, { Component } from 'react';
import personService from '../../Services/person.service';
import Pagination from '@material-ui/lab/Pagination'
import clan from "../Test/clan.json"
import Gallery from '../gallery/gallery';
import { IconButton } from '@material-ui/core';

class ListView extends Component {

    constructor (props) {
        super(props);

        this.state = {
            maxpage: 0,
            currentpage: 1,
            data: null,
            clan:""
        }

        this.handleFilterChange = this.handleFilterChange.bind(this)
    }



    retrievePersons = (page, clan) => {
        personService.getAll(this.state.currentpage-1, this.props.size, this.state.clan)
            .then(response => {
                this.setState({
                    data: response.data.person,
                    maxpage: response.data.totalPages
                })
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        console.log(this.state.data);
    };

    componentDidMount() {
        this.retrievePersons(1);
        this.setState({lightboxDisplay:false})
    }

    handleChangePage = (e, page) => {
        this.setState({
            currentpage: page
        }, ()=>{
            this.retrievePersons(this.state.currentpage);
        })
        
    }

    handleFilterChange = (e)=>{
        console.log("haha");
        this.setState({currentpage: 1, clan:e.target.value}, ()=>{
            this.retrievePersons(1);
        })
        
    }

    render () {
        
        return (
            <div id="people">
                <section className="photo-gallery">
                    <div className="container">
                        <div className="intro">
                            <h2 className="text-center">Mọi người</h2>
                            <p className="text-center">Nunc luctus in metus eget fringilla. Aliquam sed justo ligula. Vestibulum nibh erat, pellentesque ut laoreet vitae. </p>
                        </div>
                        <div className="d-xl-flex input-group mb-3">
                            <span className="input-group-text">Lọc theo khoa</span>
                            <select className="form-control" value={this.state.clan} onChange={this.handleFilterChange}>
                                <option value ={""}>Tất cả</option>
                                {clan.khoa &&
                                    clan.khoa.map((khoa, index) => (
                                        <option value = {khoa} key={index} >{khoa}</option>
                                ))}
                            </select> 
                        </div>
                        
                        <Gallery images ={this.state.data} />
                        
                        <Pagination count={this.state.maxpage} page={this.state.currentpage} defaultPage={1} onChange={this.handleChangePage.bind(this)}/>
                    </div>
                </section>
            </div>
        );
        
    }
}

export default ListView ;