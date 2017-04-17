
import React, { Component } from 'react';
import Modal from 'react-modal';
import ApiSettings from '../config/apiSettings';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
			windowHeight : '100px' 
        } 
		this.openModal = this.openModal.bind(this);
    	this.afterOpenModal = this.afterOpenModal.bind(this); 
    	this.closeModal = this.closeModal.bind(this); 
    }
    componentDidUpdate() { 
		
		this.windowHeight = (window.innerHeight * 0.65) + 'px';
		this.state = {
			windowHeight : (window.innerHeight * 0.65) + 'px'
		} 
    }

   
    openModal() {  
		this.setState({
            modalIsOpen : true
        });
		this.isOpen = true;
	  console.log("modalIsOpen1XX:" + this.state.modalIsOpen);
    }

    afterOpenModal() {
    
	}
    closeModal() { 
		this.setState({
            modalIsOpen : false
        });
		this.isOpen = false;
    }

    render() {
		
		const padding = 0; // adjust this to your needs
		let height = ((window.innerHeight * 0.8) + padding);
		//let heightPx = height + 'px';
		let heightPx = (window.innerHeight * 0.8) + 'px';
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
			left: '20%',
			padding: '2rem',
			position: 'fixed',
			right: 'auto',
			top: '10%', // start from center
			//transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
			width: '60%',
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
		if(this.props.img != null && this.props.img != "")
		{
			this.state = {
				img: ApiSettings.NODE_SERVER + "/api/retrieveimage/" + this.props.img 
			}
		}
		else
		{ 
			this.state = {
				img: "../images/noimage.png"
			} 
		}
		let title = this.props.title;
		if(title != "" || title != null)
		{  
			if(title.length < 12)
			{
				var extraChar = 12 - title.length;
				extraChar = extraChar / 2;
				var extraCharWidth = extraChar * 4.5;
				for(var i=0;i< extraChar;i++)
				{
			title = <div style={{paddingLeft:extraCharWidth}}>{title}</div>;
				}
			}
		}
		
        return (
            <section>
	<a href="#" className="btn btn-primary	" style={{width:200,textAlign:"left",padding:0,spacing:0}} onClick={this.openModal}><span className="glyphicon glyphicon-search" style={{borderRightStyle:"solid",borderRightWidth:"1px",height:30,marginTop:-1,paddingLeft:15,paddingTop:7,left:0,width:45}}></span> <div style={{display:"inline",marginLeft:45}}>Preview</div></a>
   
					<Modal bsSize="large" 
					isOpen={this.isOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={style} 
					> 	
						<div className="modal-body" style={{textAlign:"center",top:10}}>
							<img ref='content' src={this.state.img} style={{height:this.windowHeight ,top:0,marginTop:0,marginBottom:0}} /> 
						</div>
						 
						<img src="../images/erroricon.png" style={{width:25,cursor:'pointer',position:'absolute',left:5,top:5}} onClick={this.closeModal} />  
						<ReactCSSTransitionGroup transitionName = 'modal' transitionAppear = {true} transitonEnter = {false} transitionLeave = {false}>
							<div style={{position:'absolute',top:0,left:"calc((100% /2 - 150px) )",fontSize:70}}>{title}</div>
						</ReactCSSTransitionGroup>
					</Modal>
 
            </section>
        );
    }
}
             