import { Component } from "react";

class Item extends Component {
    render () {
        return (
            
                <div className="col-sm-6 col-md-4 item">
                    
                    <img className="img-fluid img-item" src={this.props.link.card} onClick={this.props.oncclick}/>
                   
                </div>
            
        );
    }
}

export default Item;