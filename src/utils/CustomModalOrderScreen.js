
import React, { Component } from 'react';
import Modal from 'react-modal';
import ApiSettings from '../config/apiSettings';

export default class CustomModalOrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
			windowHeight : '100px' 
        } 
		this.openModal = this.openModal.bind(this);
    	this.afterOpenModal = this.afterOpenModal.bind(this); 
    	this.closeModal = this.closeModal.bind(this); 
		
		this.imgLogo = "../images/noimage2.png";
		this.imgWelcome = "../images/noimage2.png";
		this.imgThankYou = "../images/noimage2.png"; 
    }
    componentDidUpdate() { 
		this.state = {
			windowHeight : (window.innerHeight * 0.65) + 'px'
		} 
    }
	componentWillMount() { 
		console.log("component will mount:" + this.props.imgWelcome);
	}

	componentWillReceiveProps(nextProps){
		console.log("component received props:" + nextProps);
	}

    openModal() {  
		this.setState({
            modalIsOpen : true
        });
	  console.log("modalIsOpen1XX:" + this.state.modalIsOpen);
    }

    afterOpenModal() {
    
	}
    closeModal() { 
		this.setState({
            modalIsOpen : false
        });
    }

    render() {
		
		const padding = 0; // adjust this to your needs
		let height = ((window.innerHeight * 0.9) + padding);
		//let heightPx = height + 'px';
		let heightPx = (window.innerHeight * 0.9) + 'px';
		let heightOffset = height / 2;
		let offsetPx = heightOffset + 'px';
		console.log("heightPx:" + heightPx);
		const style = {
		  overlay : {
			position          : 'fixed',
			top               : 0,
			left              : 0,
			right             : 0,
			bottom            : 0,
			backgroundColor:'rgba(52,52,52,0.8)'
			//background: '#000',
			//opacity: 0.5
  		  },
		  content: {
			border: '0',
			borderRadius: '5px',
			bottom: 'auto',
			height: heightPx,  // set height
			left: '10%',
			padding: '2rem',
			position: 'fixed',
			right: 'auto',
			top: '5%', // start from center
			//transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
			width: '80%',
			opacity: 1
			//maxWidth: '40rem'
		  } ,
		  headerText: {  
			float: 'left',
			opacity: 1,
			fontFamily:"Arial",
			fontSize: 15 
			//maxWidth: '40rem'
		  } 
		};
 
		//set default image if no image is found
		if( this.props.imgLogo != null)
			this.imgLogo = ApiSettings.NODE_SERVER + "/api/retrieveimage/" + this.props.imgLogo;
		
		if( this.props.imgWelcome != null)
			this.imgWelcome = ApiSettings.NODE_SERVER + "/api/retrieveimage/" + this.props.imgWelcome;
		
		if( this.props.imgThankYou != null)
			this.imgThankYou = ApiSettings.NODE_SERVER +"/api/retrieveimage/" + this.props.imgThankYou;
		
        return (
            <section>
				<table height="200" width="200" style={{border:'solid',borderWidth:'1px'}}>
				<tr><td></td><td width="63" height="66" style={{borderWidth:'1px',borderBottomStyle:"solid",borderBottomColor:"white",borderRightStyle:"solid",borderRightColor:"black"}}> <img src={this.imgLogo} style={{width:63}}  /> </td></tr>
				<tr><td></td><td width="63" height="66" style={{borderWidth:'1px',borderBottomStyle:"solid",borderBottomColor:"white",borderRightStyle:"solid",borderRightColor:"black"}}> <img src={this.imgWelcome} style={{width:63}}  /> </td></tr>
				<tr><td></td><td width="63" height="66"> <img src={this.imgThankYou} style={{width:63}}  /> </td></tr>
				</table>
				
   			<a href="#" className="btn btn-info	" style={{width:200,textAlign:"left",padding:0,spacing:0}}onClick={this.openModal}><span className="glyphicon glyphicon-search" style={{borderRightStyle:"solid",borderRightWidth:"1px",height:30,marginTop:-1,paddingLeft:15,paddingTop:7,left:0,width:45}}></span> <div style={{display:"inline",marginLeft:45}}>Preview</div></a>
   
					<Modal bsSize="large" 
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={style} 
					> 	
<img src="../images/erroricon.png" style={{width:25,cursor:'pointer'}} onClick={this.closeModal} /> 
											  
						   <div className="modal-body" style={{textAlign:"center"}}>
						   <table>
						   <tr><td width="712"></td><td>
								<table>
								<tr><td width="312"><img ref='content' src={this.imgLogo} style={{width:312 ,marginTop:0,marginBottom:18}} /> </td></tr>
								<tr><td><img ref='content' src={this.imgWelcome} style={{width:312,marginTop:0,marginBottom:18}} /> </td></tr>
								<tr><td><img ref='content' src={this.imgThankYou} style={{width:312 ,marginTop:0,marginBottom:18}} /> </td></tr>
								</table>
						   </td></tr>
						   </table>
						
						</div>
					 
					</Modal>
 
            </section>
        );
    }
}
             