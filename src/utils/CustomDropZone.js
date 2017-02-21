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
function checkResolution(file)
{
	var fr = new FileReader;

	fr.onload = function() { // file is loaded
		var img = new Image;

		img.onload = function() {
			console.log("image width:" + img.width);
			console.log("image height:" + img.height); 
			if( (img.width * 0.6) > img.height)
			{
				alert("Image height should not be less than 80% of image width");
				return false;
			}				
			else
			{
				return true;
			}
		};
		img.src = fr.result; // is the data URL because called with readAsDataURL
	};

	fr.readAsDataURL(file); 
	//return true;
}

class CustomDropDown extends Component { 
  
  constructor() {
    super();   
	
	this.state = { 
      imageFiles: [],
	  progressPercentage : 0
    } 
    this.onDrop = this.onDrop.bind(this);
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
    this.processUpload = this.processUpload.bind(this);
	
  }  
  
  onDrop()
  {
	  console.log("hello");
	  return ;
  }
  
  
validateSubmit(file,imageFiles)
{
	console.log("in file validation:" + this);
	let parentThis = this;
	let fr = new FileReader;
	
	fr.onload = function() { // file is loaded
		let img = new Image;
		 
		img.onload = function() { 
			console.log("image width:" + img.width);
			console.log("image height:" + img.height); 
			
			var desiredRatio = 4 / 3;
			var currentRatio = img.width / img.height;
			var minAcceptableRatio = desiredRatio * 0.9;
			var maxAcceptableRatio = desiredRatio * 1.1;
			
			if( currentRatio >= minAcceptableRatio && currentRatio <= maxAcceptableRatio)
			{
				parentThis.processUpload(imageFiles);
			}				
			else
			{ 
				alert("Image should be in the ratio of 4:3 ( width: height )");
			}
		}
		img.src = fr.result;
	}
	fr.readAsDataURL(file);

	console.log("in file validatoin 2"); 	
}

processUpload(imageFiles)
{
	this.setState({
		  imageFiles : imageFiles,
		  progressPercentage : 0
		});
		 
		let upload = request.post(ApiSettings.NODE_SERVER + "/api/uploadimage")
							.field('upload_preset', guid())
							.field('file', imageFiles);
		
		upload.on('progress',this.updateProgressBar);
		upload.end((err, response) => {
		  console.log('upload completed - file name :' + response.text);
		  
		  this.props.onHandleUpload(this.props.picId + "#" + response.text + CustomFileAbbreviation.getExtensionAbbr(imageFiles[0].type));
		  if (err) {
			console.error(err);
		  } 
	});
}
  onDropAccepted(imageFiles)
  {  
    let validationResult = true;
	imageFiles.map((file) => this.validateSubmit(file,imageFiles));
//	imageFiles.map((file) => this.processUpload(imageFiles));
  
  
  }
  
  onDropRejected(imageFiles)
  {
	  console.log('here');
    this.setState({
      files : imageFiles
    });
	alert('only file type of jpg, png and gif is accepted with the maximum file size of 1MB');
	  console.log("onDropRejected " + imageFiles.length + "end");
  }
  
  updateProgressBar(obj)
  {
	  this.setState({ 
		  progressPercentage :  obj.percent
		}); 
  }
 
 componentWillReceiveProps(nextProps) {
     
  }

  
  render(){ 
	return ( 
	 
		<Dropzone
			multiple={false}
			accept="image/jpeg"
			onDropAccepted={this.onDropAccepted}
			onDropRejected={this.onDropRejected}
			onDrop={this.onDrop}
			maxSize={1000 * 1024}
		>
			<div style={{height:175, marginTop:8,marginBottom:8,textAlign:"center"}}>
				{this.props.defaultImg != null && this.props.defaultImg != "" && this.state.imageFiles.length <= 0?
				<img src={ApiSettings.NODE_SERVER + "/api/retrieveimage/" + this.props.defaultImg} style={{height:135,marginTop:18,marginBottom:18}} /> : null }
				
				{(this.props.defaultImg == null || this.props.defaultImg == "") && this.state.imageFiles.length <= 0 ? <p style={{ marginTop: 80,width:195,textAlign:"center",textAlignVertical:"center"}}>  Drop an image or click to select a file to upload </p> : null}
					{					
					this.state.imageFiles.length > 0 ? <div> 
				<div>{this.state.imageFiles.map((file) => <img src={file.preview} style={{height:135,marginTop:18,marginBottom:18}} /> )}</div>
				<div className="progress">
				<div className="progress-bar progress-bar-success progress-bar-striped active" style={{width:this.state.progressPercentage + "%"}}>{this.state.progressPercentage}%</div></div> 
				</div> : null}
			</div> 	
		</Dropzone>

    );
  }
}

export default CustomDropDown;