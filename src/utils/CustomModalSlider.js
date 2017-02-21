
import React, { Component } from 'react';
import Modal from 'react-modal';
import Slider from 'react-image-slider';
import ApiSettings from '../config/apiSettings';
 
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default class CustomModalSlider extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            visible : false,
			windowHeight : '100px',
			count: 0
        } 
		this.openModal = this.openModal.bind(this);
    	this.afterOpenModal = this.afterOpenModal.bind(this); 
    	this.closeModal = this.closeModal.bind(this);  
    	this.runFrame = this.runFrame.bind(this); 
		//this.id = setInterval(this.runFrame.bind(this), 3000);
		this.currentCount = 0;
		//this.imageArray = ['0804397c-d62b-249c-943e-2bdfeaec846f.jpg','bd48bc12-1f1b-9294-7517-8dec8f9f7847.jpg'];
		//this.state = {
	//		currentImage : this.imageArray[this.currentCount]
		//} 
		//this.curImage = this.imageArray[this.currentCount];
		
		//this.runFrame();
	//	console.log("imageArray[this.currentCount]:" + this.imageArray[this.currentCount]);
    }
	//runFrame()
	runFrame(tempid)
	{
		
		//this.imageArray = ['0804397c-d62b-249c-943e-2bdfeaec846f.jpg','bd48bc12-1f1b-9294-7517-8dec8f9f7847.jpg'];
		var allImages =  this.props.img;
		this.imageArray = allImages.toString().split(",");
		
		
		if(this.currentCount == null)
			this.currentCount = 0;
		console.log('here1XXXXX:' + this.imageArray[this.currentCount]);
		this.setState({
			currentImage : this.imageArray[this.currentCount]
		}  )
		this.curImage = this.imageArray[this.currentCount];
		this.currentCount++;
		
		if(this.currentCount >= this.imageArray.length)
			this.currentCount = 0;
		//if (/* test for finished */) {
	//		clearInterval(id);
		//} else {
			/* code to change the element style */  
	//	}
	console.log("tempid:" + tempid + ",uuid:" + this.uuid);
		if(tempid == this.uuid)
			setTimeout(this.runFrame.bind(this,tempid),5000);
	}
    componentDidUpdate() { 
		this.state = {
			windowHeight : (window.innerHeight * 0.65) + 'px'
		}  
    }
	
	componentWillUnmount(){
	}
   
    resetUUID()
    {
		this.uuid = guid();
    }
	
	getNewUUID()
	{
		var newUUID = guid();
		this.uuid = newUUID;
		return newUUID;
	}
	
    openModal() {  
		this.setState({
            modalIsOpen : true
        });
		this.isOpen = true;
	//	this.runFrame(this.uuid);
    	this.runFrame(this.getNewUUID());
		console.log("this.props.img:" + this.props.img);
    }

    afterOpenModal() {

	}
    closeModal() { 
		this.setState({
            modalIsOpen : false
        });
		
		this.isOpen = false;
		this.resetUUID();
		//this.uuid = guid();
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
			left: '10%',
			padding: '2rem',
			position: 'fixed',
			right: 'auto',
			top: '10%', // start from center
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
	    return ( 
		
            <section>
    
   			<a href="#" className="btn btn-info	" style={{width:1000,textAlign:"left",padding:0,spacing:0}} onClick={this.openModal}><span className="glyphicon glyphicon-search" style={{borderRightStyle:"solid",borderRightWidth:"1px",height:30,marginTop:-1,paddingLeft:15,paddingTop:7,left:0,width:45}}></span> <div style={{display:"inline",marginLeft:440}}>Preview</div></a>
   		 		<Modal bsSize="large" 
					isOpen={this.isOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={style} 
					>  	 
<img src="../images/erroricon.png" style={{width:25,cursor:'pointer',top:15,position:'absolute'}} onClick={this.closeModal} /> 
						<img ref='content'src={ApiSettings.NODE_SERVER +"/api/retrieveimage/" + this.curImage} style={{height:this.state.windowHeight ,marginLeft:(window.innerWidth * 0.18	),marginTop:0,marginBottom:18}} /> 
					  
					</Modal>
 
            </section>
			
				 	
        );
    }
}
             