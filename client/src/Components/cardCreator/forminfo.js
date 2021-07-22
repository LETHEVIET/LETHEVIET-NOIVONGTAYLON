import Field from "../field/field";
import List from "../field/list";
import testPerson from  '../Test/person.json'
import AvatarUpload from "../avatarEdit/avatarUpload";
import { Button } from "@material-ui/core";
const { Component } = require("react");

class FormInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: "",
                mssv: "",
                id: "",
                clan: "",
                description: "",
                image: ""
            },
            formFilled: false,
            formPartiallyFilled: false,
            imgEdit: null,
            infoDisplay: false
        };

        this.handleTestFill = this.handleTestFill.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleFormFilled = this.handleFormFilled.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cropImgHandle = this.cropImgHandle.bind(this);
        this.handleValue = this.handleValue.bind(this);
    }

    scrollToBottom() {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 50)
    }
    
    handleTestFill(e) {
        e.preventDefault();
        console.log("fill test file!!")
        if (!this.state.formPartiallyFilled){
            this.setState(prevState => ({
                ...prevState,
                formFilled: true,
                formPartiallyFilled: true,
                person: testPerson
            }));
        }

        //const htmlString = () => (<Card person={this.state.person} id="cardid" ref={this.componentRef}/>);
           
    }

    handleClearForm(e) {
        e.preventDefault();
        if (this.state.formPartiallyFilled){
            this.setState(prevState => ({
                ...prevState,
                formFilled: false,
                formPartiallyFilled: false,
                infoDisplay: false,
                imgEdit: null,
                person: {
                    name: "",
                    mssv: "",
                    id: "",
                    clan: "",
                    description: "",
                    image: ""
                }
            }));
        }
    }

    handleClear(e) {
        const fieldId = e.target.parentNode.firstChild.id;

        this.setState(
            prevState => ({
                ...prevState,
                infoDisplay: false,
                person: {
                    ...prevState.person,
                    [fieldId]: ""
                }
            }),
            () => {
                this.handleFormFilled();
            }
        );
        e.target.parentNode.firstChild.focus();
    }

    handleFormFilled() {
        this.state.person.name ||
        this.state.person.mssv ||
        this.state.person.id ||
        this.state.person.clan ||
        this.state.person.description ||
        this.state.person.image
            ? this.setState({formPartiallyFilled: true})
            : this.setState({formPartiallyFilled: false});

        this.state.person.name &&
        this.state.person.mssv &&
        this.state.person.id &&
        this.state.person.clan &&
        this.state.person.description &&
        this.state.person.image
            ? this.setState({formFilled: true})
            : this.setState({formFilled: false});
    }

    handleValue(e) {
        const fieldId = e.target.id;
        this.setState(
            prevState => ({
              ...prevState,
              person: {
                ...prevState.person,
                [fieldId]: e.target.value
              }
            }),
            () => {
              this.handleFormFilled();
            }
        );
    }

    timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }


    handleSubmit(e) {
        e.preventDefault();
        const {imgEdit} = this.state;
        if (imgEdit !== null){
            console.log(imgEdit.getImageScaledToCanvas())
            const url = imgEdit.getImageScaledToCanvas().toDataURL();

            //console.log(url);
            this.setState({ person: { ...this.state.person, image : url} }, () =>{
                console.log("Submit!!");
                this.props.handleData(this.state.person);
                this.setState({
                    infoDisplay:true
                });    
            });
        }
         
    }

    cropImgHandle = (editor) => {
        this.setState({imgEdit: editor});
    }   
    
    render () {
        return (
            <div>
                <div className="contact-clean cleanbg" >
                    <form  autoComplete="off">
                        <h2 className="text-center">Tạo Thẻ</h2>
                        <Field
                            id="name"
                            name="name"
                            placeholder="Họ và Tên"
                            type="text"
                            label="Họ và Tên"
                            maxLength="20"
                            value={this.state.person.name}
                            handleClear={this.handleClear}
                            handleValue={this.handleValue}
                            handlePaste={this.handlePaste}
                        />
                        <Field
                            id="id"
                            name="mssv"
                            placeholder="Mã số sinh viên"
                            type="text"
                            label="Mã số sinh viên"
                            maxLength="20"
                            value={this.state.person.id}
                            handleClear={this.handleClear}
                            handleValue={this.handleValue}
                            handlePaste={this.handlePaste}
                        />
                        <List
                            id="clan"
                            name="clan"
                            placeholder="Khoa"
                            type="text"
                            label="Khoa"
                            maxLength="20"
                            value={this.state.person.clan}
                            handleClear={this.handleClear}
                            handleValue={this.handleValue}
                            handlePaste={this.handlePaste}
                        />
                        <Field
                            id="description"
                            name="description"
                            placeholder="Description"
                            type="textarea"
                            label="Description"
                            value={this.state.person.description}
                            handleClear={this.handleClear}
                            handleValue={this.handleValue}
                            handlePaste={this.handlePaste}
                        />
                        <AvatarUpload
                            cropImg={this.cropImgHandle} 
                        />
                        
                        <div className="form-group">
                            <div className="text-center" id="buttonarea">
                                    <Button variant="contained" size="large" color="primary" onClick={this.handleSubmit}>Tạo thẻ</Button>
                                    <Button variant="contained" size="large" color="primary" onClick={this.handleClearForm}>Clear</Button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default FormInfo;
//