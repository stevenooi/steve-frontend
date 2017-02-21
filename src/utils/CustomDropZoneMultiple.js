// Author : Steven Ooi
// Licensed at Summit Innovations

import React, { Component } from 'react';  
import Dropzone from 'react-dropzone';
import request from 'superagent';

import ApiSettings from '../config/apiSettings';
import CustomFileAbbreviation from './CustomFileAbbreviation';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4();
}

class CustomDropDownMultiple extends Component { 
  
  constructor() {
    super();   
	this.defaultHeight = 200;
	this.state = { 
      imageFilesMultiple: [],
	  progressPercentage : [],
	  objWidth : 1000,
	  objHeight : this.defaultHeight,
	  test: ""
    } 
    this.onDrop = this.onDrop.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
    this.processUpload = this.processUpload.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this); 
    this.progressId = 0;
	this.deleteTriggered = false;
	this.firstTimeConstructs = true;
  }  

  validateSubmit(file,imageFiles,fileLength)
  {
	var fr = new FileReader;

	let parentThis = this;
	fr.onload = function() { // file is loaded
		var img = new Image;

		img.onload = function() {
			
			var desiredRatio = 4 / 3;
			var currentRatio = img.width / img.height;
			var minAcceptableRatio = desiredRatio * 0.9;
			var maxAcceptableRatio = desiredRatio * 1.1;
			
			
			if( currentRatio >= minAcceptableRatio && currentRatio <= maxAcceptableRatio)
			{
				parentThis.processUpload(imageFiles,fileLength);
			//	parentThis.processUpload(imageFiles);
			}				
			else
			{ 
				alert("Image should be in the ratio of 4:3 ( width: height )");
			} 
		};
		img.src = fr.result; // is the data URL because called with readAsDataURL
	};

	fr.readAsDataURL(file); 
	//return true;
  }
 	
  deleteImage(e){
	var curPosition = e.target.id.substring(11); 
	var tempArray = this.state.imageFilesMultiple.slice();
	tempArray.splice(curPosition, 1);
	this.setState({
		  imageFilesMultiple : tempArray
	}); 
	this.deleteTriggered = true;
	
	//notify parent list
	var tempArray2 = [];
	tempArray.map((file) => 
	{
	   if(file.source != null && file.source != "")
			tempArray2.push(file.source);
		else
			tempArray2.push(file.preview.substring(file.preview.lastIndexOf("/") + 1)   );
	}
	); 
	this.props.onHandleUpload(tempArray2);
		  
 }

    onOpenClick () {
		if(!this.deleteTriggered)
		{
			if(this.state.imageFilesMultiple.length >= 20)
			{
				alert("Maximum 20 pictures are allowed for a template");
			}
			else
			{					
				this.refs.dropzone.open();
				this.firstTimeConstructs = false;
			}
		}
		
		this.deleteTriggered = false;
	
    }
	
  onDrop()
  {
	  console.log("hello");
	  return ;
  }
  
  
processUpload(imageFilesMultiple,i)
{
/*	this.setState({
		  imageFilesMultiple : imageFilesMultiple,
		  progressPercentage : 0
		});
		*/
		var progressPercentageValue = 0;
		var newProgressPercentage = this.state.progressPercentage.slice();
		newProgressPercentage.push(progressPercentageValue);
		var newimageFilesMultiple = this.state.imageFilesMultiple.slice()
		imageFilesMultiple.map((file) => 
		{
		console.log("this file.src:" + file.preview);
		var tempObj = file	;
		for (var property in tempObj) {
		if (tempObj.hasOwnProperty(property)) {
		// do stuff
		console.log(property + ":" + tempObj[property]);
		}
		}
		newimageFilesMultiple.push(file)
		}
		);

		var totalNewLine = (((this.state.imageFilesMultiple.length % 5) + imageFilesMultiple.length ) / 5);
		var floorTotalNewLine = Math.floor(((this.state.imageFilesMultiple.length % 5) + imageFilesMultiple.length ) / 5);

		var addKey = 0;


		if(this.state.imageFilesMultiple.length % 5 == 0 && this.state.imageFilesMultiple.length > 0)
		{
		addKey = 1;

		}
		addKey += Math.floor(((this.state.imageFilesMultiple.length % 5) + imageFilesMultiple.length -1 ) / 5);

		if(addKey > 0)
		{
		this.setState({
		objHeight : this.state.objHeight + this.defaultHeight
		});
		}
		this.setState({
		imageFilesMultiple : newimageFilesMultiple,
		progressPercentage : newProgressPercentage
		});

		
		
		 console.log("processUpload-i:" + i);
		 this.progressId = i;
		let upload = request.post(ApiSettings.NODE_SERVER + "/api/uploadimage")
							.field('upload_preset', guid())
							.field('file', imageFilesMultiple);
		
		upload.on('progress',this.updateProgressBar);
		upload.end((err, response) => {
			  console.log('upload completed - file name :' + response.text);
			  var tempArray = [];
			  this.state.imageFilesMultiple.map((file) => 
			  {
				  //alert("filename found : " + file.preview.substring(file.preview.lastIndexOf("/") + 1));
					if(file.source != null && file.source != "")
						tempArray.push(file.source);
					else
						tempArray.push(file.preview.substring(file.preview.lastIndexOf("/") + 1)   );
			  }
			  );
			  
			 // tempArray.map((file2) => {"file2:" + file2}
		//  imageFilesMultiple[0].preview = response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type); 
			var newimageFilesMultiple = this.state.imageFilesMultiple.slice();
			newimageFilesMultiple[newimageFilesMultiple.length -1].source = response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type);
		    tempArray[tempArray.length -1] = response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type); 
			
			this.setState({
			  imageFilesMultiple : newimageFilesMultiple 
			});

			//this.props.onHandleUpload(response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type));
		  this.props.onHandleUpload(tempArray);
		  if (err) {
			console.error(err);
		  } 
	});
	
}
  onDropAccepted(imageFilesMultiple)
  {  
    let validationResult = true;
//	imageFilesMultiple.map((file) => this.validateSubmit(file,imageFilesMultiple));
	imageFilesMultiple.map((file) => this.validateSubmit(file,imageFilesMultiple,this.state.progressPercentage.length));
  
  	//	console.log("new imagefile length: " + newimageFilesMultiple.length);
	//	console.log("imagefile length: " + this.state.imageFilesMultiple.length);
//	imageFiles.map((file) => this.validateSubmit(file,imageFiles));
	//imageFilesMultiple.map((file) => this.processUpload(imageFilesMultiple,this.state.progressPercentage.length));
  
  
  }
  
  onDropRejected(imageFilesMultiple)
  {
	  console.log('here');
    this.setState({
      files : imageFilesMultiple
    });
	alert('only file type of jpg, png and gif is accepted with the maximum file size of 1MB');
	  console.log("onDropRejected " + imageFilesMultiple.length + "end");
  }
  
  updateProgressBar(obj)
  {
	  console.log("updateProgressBar[" + this.progressId + "]:" + obj.percent);
	var newProgressPercentage = this.state.progressPercentage.slice();
	newProgressPercentage[this.progressId] =  obj.percent;
	  this.setState({ 
		  progressPercentage :  newProgressPercentage
		}); 
		console.log("newProgressPercentage[i]:" + newProgressPercentage[this.progressId ]);
  }
  componentWillMount()
  {
	  this.setState({ 
		  test :  this.props.defaultImg
		});
	  
	  console.log("hello");
  } 

  shouldComponentUpdate(nextProps, nextState){
	
    // return a boolean value
    return true;
}
componentWillReceiveProps(nextProps) {
   
   console.log("this.props.defaultImg:" + this.props.defaultImg);
   console.log("this.props.defaultImg = null:" + (this.props.defaultImg == ""));
   console.log("this.props.defaultImg.length:" + this.props.defaultImg.length);
   console.log("this.firstTimeConstructs:" + this.firstTimeConstructs);
    if(this.firstTimeConstructs)
    {
	let newimageFilesMultiple = [];
	var tempArray = [];

	var progressPercentageValue = 100;
	var newProgressPercentage = this.state.progressPercentage.slice();
	this.props.defaultImg.map((file) => {
	console.log("file.id:" + file.id);
	console.log("file.name:" + file.name);
	var tempFile = {};
	tempFile.preview = ApiSettings.NODE_SERVER + "/api/retrieveimage/" + file.name;
	//tempFile.isPreloaded = true;
	newimageFilesMultiple.push(tempFile); 
	newProgressPercentage.push(progressPercentageValue);
	tempArray.push(file.name);
		

	});

	this.setState({ 
	  slideImg : tempArray,
	  imageFilesMultiple :  newimageFilesMultiple,
	  progressPercentage : newProgressPercentage
	});
	
	//set firsttimeconstruct key = false if the image list is successfully loaded
	if(this.props.defaultImg.length > 0)
		this.firstTimeConstructs = false;
	else if (this.props.newDataToken == true)
		this.firstTimeConstructs = false;	
	
	
    }
	
}
   
  componentDidMount() {   
	 
  }
  
  
  render(){  
  
//console.log("this.props.defaultImg:" + this.props.defaultImg);
	return ( 
	 <div onClick={this.onOpenClick}> 
		<Dropzone
			disableClick={true}
			multiple={true}
			accept="image/jpeg"
			onDropAccepted={this.onDropAccepted}
			onDropRejected={this.onDropRejected}
			onDrop={this.onDrop}
			//onClick={this.deleteImage}
			ref="dropzone" 
			maxSize={1000 * 1024}
			style={{height:this.state.objHeight,width:this.state.objWidth,borderStyle:"dashed",borderWidth:1,borderRadius:5}}
		>
			<div style={{height:this.defaultHeight, marginTop:8,marginBottom:8,textAlign:"center"}} >
 				 
				{this.state.imageFilesMultiple.length <= 0 ? <p style={{ marginTop: 90,width:1000,textAlign:"center",textAlignVertical:"center"}}>  Drop images or click to select files to upload </p> : null}
				{					
				this.state.imageFilesMultiple.length > 0 ? <div> 
				{this.state.imageFilesMultiple.map((file,i) => 
				<div style={{width:180,display:"inline-block",marginRight:10}}> 
					<img id={"uploadImage" + i } src="../images/erroricon.png" style={{height:25,marginTop:5,position:"absolute",cursor: 'pointer'}} onClick={this.deleteImage}/>
					<img src={file.preview} style={{height:135,marginTop:5,marginBottom:18}} /> 
								<div className="progress">
					<div className="progress-bar progress-bar-success progress-bar-striped active" style={{width:this.state.progressPercentage[i] + "%"}}>{this.state.progressPercentage[i]}%</div></div> 
				</div>
				)}</div>
				: null}
			</div> 	
		</Dropzone>
		</div>

    );
  }
}

export default CustomDropDownMultiple;