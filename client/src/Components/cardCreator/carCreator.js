import FormInfo from "./forminfo";
import { createCanvas, loadImage } from 'canvas'
import CardResult from "./cardResult";
import QRCode  from "qrcode";
import pannel from "./pannel.png"
import bla from "./bla.jpg"
import { FacebookShareButton } from "react-share";
import personService from "../../Services/person.service";
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import { Button } from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

//var imgur = require("imgur");

const { Component, createContext } = require("react");

class CardCreator extends Component {
    constructor (props) {
        super(props);

        this.state = {
            person: null,
            card: "",
            submited: false,
            imgName: "",
            cardurl: "",
            open: false
        }

        this.imge = "";

        this.wrapText = this.wrapText.bind(this);
        this.CreatingCard = this.CreatingCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.upLoadImgru = this.upLoadImgru.bind(this);
    } 

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
    }

    componentDidMount() {
        loadImage(pannel).then((imagee) => {
            this.pannelImg = imagee;
        })

        this.setState({
            submited: false
        })
    }

    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        return new Blob([ia], {type:mimeString});
    }

    upLoadImgru = () => {
        var file = this.dataURItoBlob(this.state.card)
        const formData = new FormData();

        formData.append("image", file);
        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: "Client-ID f7415ccfb9f08aa",
                //Accept: "application/json",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                //console.log(response.data.link);
                this.setState({cardurl:response.data.link});
                console.log(this.state.cardurl);
        });
    }

    CreatingCard = async (person) => {
        this.setState({submited: false})
        console.log(person);
        this.setState({imgName: person.id});
        this.setState({person: person});
        //const qrCode = useQrCode(person.id+";"+person.name+";"+person.clan);
        var qrcode = "";
        QRCode.toDataURL(person.id+";"+person.name+";"+person.clan,{errorCorrectionLevel: 'L', width:'90px'} ,function (err, url) {
            qrcode = url;
        })
        const canvas = createCanvas(600, 300);
        const ctx = canvas.getContext('2d');
        
        //loadImage(pannel).then((image) => {
            ctx.drawImage(this.pannelImg, 0,0);
        
            ctx.fillStyle = "white"
            ctx.font ='bold 24px monospace'
            ctx.fillText("ID CARD",243, 45)
            
            ctx.font = '20px monospace'
            ctx.fillText("Họ và Tên: " + person.name, 188,96)
            ctx.fillText("ID: " + person.id, 188,136)
            ctx.fillText("CLAN: " + person.clan, 188,176)

            ctx.font = '15px monospace'
            var text = person.description
            
            this.wrapText(ctx, text, 191, 211, 360, 20);

            /*
            var img = new Image();
            img.src = person.image;
            
            qri.onload = async () => {
                ctx.drawImage(qri, 510,0, 90, 90);
                const img = canvas.toDataURL()
                this.setState({
                    card :  img
                })
            }

            ctx.drawImage(img, 23,62, 150, 200)
        
            var qri = new Image();
            qri.src = qrcode;
            qri.onload = async () => {
                ctx.drawImage(qri, 510,0, 90, 90);
                const img = canvas.toDataURL()
                this.setState({
                    card :  img
                })
            }
            */
            
            loadImage(person.image).then((image2) => {
                ctx.drawImage(image2, 23,62, 150, 200);

                loadImage(qrcode).then((image3) => {
                    ctx.drawImage(image3, 510,0, 90, 90);
                    const img = canvas.toDataURL()
                    this.setState({
                        card :  img
                    })
                })
            })
            
        //})
    }

    saveAs = (blob, fileName) =>{
        var elem = window.document.createElement('a');
        elem.href = blob
        elem.download = fileName;
        elem.style = 'display:none;';
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === 'function') {
            elem.click();
        } else {
            elem.target = '_blank';
            elem.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
            }));
        }
        URL.revokeObjectURL(elem.href);
        elem.remove()
    }

    sharefb = () =>{
        console.log("share");
    }

    download = () =>{
        console.log("download");        
        this.saveAs(this.state.card, this.state.imgName + ".png") 
    }

    handleSubmit = () =>{
        
        var file = this.dataURItoBlob(this.state.card)
        const formData = new FormData();
        var imageLink = "";
        formData.append("image", file);
        fetch("https://api.imgur.com/3/image", {
            method: "POST",
            headers: {
                Authorization: "Client-ID f7415ccfb9f08aa",
                //Accept: "application/json",
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                //console.log(response.data.link);
                imageLink = response.data.link;
                //console.log(imageLink);

                
                var data = {
                    card: response.data.link,
                    name: this.state.person.name,
                    mssv: this.state.person.id,
                    clan: this.state.person.clan,
                    description: this.state.person.description,
                }

                personService.create(data)
                    .then(response => {
                        console.log(response.data);
                        this.setState({submited: true, open: true}, ()=>{

                        })
                    })
                    .catch(e=> {
                        console.log(e);
                    });
        });

        //console.log(imageLink);        
    }

    render () {
        return (
            <div id="cardCreator">
                <FormInfo handleData={this.CreatingCard}></FormInfo>
                {this.state.card !== "" ?
                    <div>
                        <div>
                            <CardResult card={this.state.card}/>
                        </div>

                        {!this.state.submited ?
                            <Button color="primary" variant="contained" onClick={this.handleSubmit}>Đăng ký</Button>
                            :
                            <div id="sharearea" >
                                <ul className="list-inline text-center">
                                    <li className="list-inline-item">
                                        <Button variant="contained"color="primary">
                                            <FacebookIcon fontSize="small" color="#1e6bde" />Chia sẻ
                                        </Button>
                                    </li>
                                    <li className="list-inline-item">
                                        <Button variant="contained" color="primary">
                                            <SystemUpdateIcon fontSize="small" color="#1e6bde" />Tải về
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>  
                    :
                    <div></div>  
                }   
                
                <Snackbar open={this.state.open} autoHideDuration={3000} onClose={()=>{this.setState({open:false})}}>
                    <Alert onClose={()=>{this.setState({open:false})}} severity="success">
                        Bạn đã đăng ký thành công
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default CardCreator;
//<img onClick={this.sharefb} className="shareicon fb" src="assets/img/_Path_.svg"/>