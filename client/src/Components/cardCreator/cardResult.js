import FormInfo from "./forminfo";
import pannel from "./pannel.png"
const { Component } = require("react");

class CardResult extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isFrontSide: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () =>{
        this.setState(() => ({
          isFrontSide: !this.state.isFrontSide
        }));
    }

    render () {
        return (
            <div id="cardResult" className="cardResult">
               <div class="text-center cleanbg" id="cardShower">
                    <div className="back back-showing">

                        <img src={this.props.card} id="card" />

                    </div>
                </div>
            </div>
        );
    }
}

export default CardResult;