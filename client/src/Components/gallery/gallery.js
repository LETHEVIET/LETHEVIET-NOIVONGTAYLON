import { Component } from "react";
import './gallery.css';
import { IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import { Button } from "@material-ui/core";
class Gallery extends Component {

    constructor (props){
        super(props);
        this.state = {
            imageToShow:null,
            lightboxDisplay: false,
        }
    }

    componentDidMount() {
        this.setState({
            lightboxDisplay: false
        })
    }

    setImageToShow = (image) => {
        this.setState({imageToShow: image})
    }

    setLightBoxDisplay = (flag) => {
        this.setState({lightboxDisplay : flag});
    }
    showImage = (image) => {
        this.setImageToShow(image);
        this.setLightBoxDisplay(true);
    }

    hideLightBox = () => {
        this.setLightBoxDisplay(false);
    }

    showNext = (e) => {
        e.stopPropagation();
        let currentIndex = this.props.images.indexOf(this.state.imageToShow);
        if (currentIndex >= this.props.images.length - 1) {
            this.setLightBoxDisplay(false);
        } else {
            let nextImage = this.props.images[currentIndex + 1];
            this.setImageToShow(nextImage);
        }
    }

  //show previous image in lightbox
    showPrev = (e) => {
        e.stopPropagation();
        let currentIndex = this.props.images.indexOf(this.state.imageToShow);
        if (currentIndex <= 0) {
            this.setLightBoxDisplay(false);
        } else {
            let nextImage = this.props.images[currentIndex - 1];
            this.setImageToShow(nextImage);
        }
    }
  
    render(){
        return (
            <div>
                <div className="row photos" data-bss-baguettebox="">
                    {this.props.images &&
                        this.props.images.map((image, index) => (
                            <>
                            <div className="col-sm-6 col-md-4 item">                    
                                <img 
                                    className="img-fluid img-item" 
                                    src={image.card} 
                                    onClick={() => this.showImage(image)}/>                   
                            </div>
                            </>
                        ))}
                </div>

                {
                    this.state.lightboxDisplay ? 
                    <div id="lightbox" onClick={this.hideLightBox}>
                        <div id="view">
                            <button onClick={this.showPrev}>⭠</button>
                            <img id="lightbox-img" src={this.state.imageToShow.card}></img>
                            <button onClick={this.showNext}>⭢</button>
                        </div>
                        <div id="sharearea" >
                            <ul className="list-inline text-center">
                                <li className="list-inline-item">
                                    <Button variant="contained" >
                                        <FacebookIcon fontSize="small" color="primary" />Chia sẻ
                                    </Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button variant="contained">
                                        <SystemUpdateIcon fontSize="small" color="primary" />Tải về
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    : ""
                }
            </div>
        );
    }
}

export default Gallery;