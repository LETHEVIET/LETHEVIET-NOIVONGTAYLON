const { Component } = require("react");

class Field extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="form-group">
            {(this.props.type === "text") ?
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
                /> :
                <textarea 
                    className="form-control" 
                    rows="14" 
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    minLength="1"
                    required
                    onChange={this.props.handleValue}
                    maxLength={this.props.maxLength}
                    onBlur={this.props.handleInput}
                    value={this.props.value}
                    onPaste={this.props.handlePaste}                    
                />
            }
            </div>
        );
    }
}

export default Field;