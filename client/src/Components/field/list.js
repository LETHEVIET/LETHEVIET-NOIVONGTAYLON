import clan from "../Test/clan.json"

const { Component } = require("react");


class List extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        console.log(clan);
    }
    render () {
        return (
            <div className="form-group">
                <input 
                    className="form-control" 
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    type={this.props.type}
                    minLength="1"
                    required
                    onChange={this.props.handleValue}
                    maxLength={this.props.maxLength}
                    onBlur={this.props.handleInput}
                    value={this.props.value}
                    onPaste={this.props.handlePaste}
                    list="clannn"
                />

                <datalist id="clannn">
                    {clan.khoa &&
                        clan.khoa.map((person, index) => (
                            <option value={person} />
                    ))}
                </datalist>
            </div>
        );
    }
}

export default List;