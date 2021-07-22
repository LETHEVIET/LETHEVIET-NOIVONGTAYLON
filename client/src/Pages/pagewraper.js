const { Component } = require("react");

class PageWraper extends Component {
    render () {
        return (
            <div>
                <nav className="navbar navbar-light navbar-expand-md">
                    <div className="container-fluid"><a className="navbar-brand" href="#">NỐI VÒNG TAY LỚN 2021: THE TRIAL</a><button className="navbar-toggler" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse float-right"
                            id="navcol-1">
                            <ul className="nav navbar-nav ml-auto">
                                <li className="nav-item" role="presentation"><a className="nav-link active" href="#about">Thông tin</a></li>
                                <li className="nav-item" role="presentation"><a className="nav-link" href="#cardCreator">Tạo thẻ</a></li>
                                <li className="nav-item" role="presentation"><a className="nav-link" href="#people">Mọi người</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div id="banner"><img style={{width: "100%"}} src="assets/img/H_HA9270.jpg" /> </div>

                {this.props.children}

                <footer id="footerpad">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-8 mx-auto">
                                <ul className="list-inline text-center">
                                    <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"></i><i className="fa fa-facebook fa-stack-1x fa-inverse"></i></span></a></li>
                                    <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"></i><i className="fa fa-twitter fa-stack-1x fa-inverse"></i></span></a></li>
                                    <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"></i><i className="fa fa-instagram fa-stack-1x fa-inverse"></i></span></a></li>
                                    <li className="list-inline-item"><a href="#"><span className="fa-stack fa-lg"><i className="fa fa-circle fa-stack-2x"></i><i className="fa fa-pinterest fa-stack-1x fa-inverse"></i></span></a></li>
                                </ul><p className="copyright text-muted text-center">Copyright &copy; Your Company 2018 | Web Design by Designer</p></div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default PageWraper;