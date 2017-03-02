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
	this.processUploadToggle = false;
	this.slideImg = [];
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
				console.log("parentThis.processUpload");
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
	
	//Update preview list
	var tempArray = this.state.imageFilesMultiple.slice();
	//var tempArray = this.slideImg.slice();
	
	tempArray.splice(curPosition, 1);
	this.setState({
		  imageFilesMultiple : tempArray
	}); 
	this.deleteTriggered = true;
	
	console.log("tempArray:" + JSON.stringify(tempArray));
	
	
	//upload image data list 
	var tempArray3 = this.slideImg.slice();
	tempArray3.splice(curPosition, 1);
	//notify parent list
	var tempArray2 = [];
	console.log("tempArray3:" + JSON.stringify(tempArray3));
	tempArray3.map((file) => 
	{
		tempArray2.push(file);
	  // if(file.source != null && file.source != "")
		//	tempArray2.push(file.source + CustomFileAbbreviation.getExtensionAbbr(file.type));
		//else
			//tempArray2.push(file.preview.substring(file.preview.lastIndexOf("/") + 1)  + CustomFileAbbreviation.getExtensionAbbr(file.type) );
	}
	); 
	this.slideImg = tempArray2;
	
	
	console.log("tempArray2:" + JSON.stringify(tempArray2));
	//this.props.onHandleUpload(tempArray2);
	
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
		//put current list of uploaded images into this.state.imageFilesMultiple
		console.log("this.processUploadToggle:" + this.processUploadToggle);
		if(this.processUploadToggle == true)
		{
			var newimageFilesMultiple = this.state.imageFilesMultiple.slice();
			console.log("newimageFilesMultiple AA-1:" + JSON.stringify(newimageFilesMultiple));
			imageFilesMultiple.map((file) => {newimageFilesMultiple.push(file)});
			console.log("imageFilesMultiple AA-1:" + JSON.stringify(imageFilesMultiple));
			
			this.setState({
				  imageFilesMultiple : newimageFilesMultiple 
				//  imageFilesMultiple : imageFilesMultiple 
			});
			this.processUploadToggle = false;
			console.log("set processUploadToggle = false:" + this.processUploadToggle);
/*	this.setState({
		  imageFilesMultiple : imageFilesMultiple,
		  progressPercentage : 0
		});
		*/
		
			//console.log("imageFilesMultiple here-1:" + JSON.stringify(imageFilesMultiple)); 
		var progressPercentageValue = 0;
		var newProgressPercentage = this.state.progressPercentage.slice();
		newProgressPercentage.push(progressPercentageValue);

		var previousImageCount = (this.state.imageFilesMultiple.length - imageFilesMultiple.length);
		var newImageCount = imageFilesMultiple.length;
		var totalImageCount = this.state.imageFilesMultiple.length;
		console.log("previousImageCount:" + previousImageCount);
		var totalNewLine = (((previousImageCount % 5) + (newImageCount -1) ) / 5);
		
		console.log("totalNewLine:" + totalNewLine);
		//var floorTotalNewLine = Math.floor(((this.state.imageFilesMultiple.length % 5) + imageFilesMultiple.length ) / 5);
		var floorTotalNewLine = Math.floor(totalNewLine);
		
		//if the previous image count is 5, next upload should add a line
		if((previousImageCount % 5) == 0 && previousImageCount != 0)
		{
			floorTotalNewLine += 1;
		}
		console.log("floorTotalNewLine:" + floorTotalNewLine);

		var addKey = 0;

		console.log("this.state.imageFilesMultiple.length:"+ this.state.imageFilesMultiple.length);
/*		if(this.state.imageFilesMultiple.length % 5 == 0 && this.state.imageFilesMultiple.length > 0)
		{
		addKey = 1;

		}
		addKey += Math.floor(((this.state.imageFilesMultiple.length % 5) + imageFilesMultiple.length -1 ) / 5);
*/
		addKey = floorTotalNewLine;
		
		if(addKey > 0)
		{
		this.setState({
		objHeight : (addKey * this.state.objHeight) + this.defaultHeight
		});
		}
		this.setState({ 
		progressPercentage : newProgressPercentage
		});

		
		
		 //console.log("processUpload-i:" + i);
		// this.progressId = i;
		var stateFileCount = (this.state.imageFilesMultiple.length - imageFilesMultiple.length);
		imageFilesMultiple.map((file,i) => {
			let upload = request.post(ApiSettings.NODE_SERVER + "/api/uploadimage")
								.field('upload_preset', guid())
								.field('file', file);
			console.log("AAAAAAimageFilesMultiple(" + i  + "):" + JSON.stringify(file));
			//upload.on('progress',this.updateProgressBar);
			
			let parentThis = this;
			upload.on('progress',function(e) {
				console.log("progress-count:" + (stateFileCount+i));
				parentThis.updateProgressBar(e,(stateFileCount+i))
			}
			);
			//upload.on('progress',(a,b,response) => {console.log("response:" + response} );
			upload.end((err, response) => {
				  var tempArray = [];
				var newimageFilesMultiple = this.state.imageFilesMultiple.slice();
				
				//clone previous image list into array
				this.state.imageFilesMultiple.map((file) => 
				{ 
					if(file.source != null && file.source != "")
					{
						tempArray.push(file.source); 
					}
					else if(file.preview != null && file.preview != "")
					{
						tempArray.push(file.preview.substring(file.preview.lastIndexOf("/") + 1)   );
					}
					//newimageFilesMultiple.push(file)
				}
				
				);
				
				tempArray.push(response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type));
				this.slideImg.push(response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type));
				
			    console.log("this.slideImg:" + JSON.stringify(this.slideImg));
				//replace last file in array with name of uploaded image from response.text
				//var newimageFilesMultiple = this.state.imageFilesMultiple.slice();
				//newimageFilesMultiple[newimageFilesMultiple.length -1].source = response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type);
				//tempArray[tempArray.length -1] = response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type); 
				 
				console.log("this.state.imageFilesMultiple here2:" + JSON.stringify(this.state.imageFilesMultiple));
				
				//this.props.onHandleUpload(response.text + CustomFileAbbreviation.getExtensionAbbr(imageFilesMultiple[0].type));
				this.props.onHandleUpload(this.slideImg);
				if (err) {
				  console.error(err);
				} 
		
	});
	
		});
		
		}
	
}
  onDropAccepted(imageFilesMultiple)
  {  
  console.log("Drop Accepted" + JSON.stringify(imageFilesMultiple));
    
	this.processUploadToggle = true;
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
  
  updateProgressBar(obj, objCount)
  {
	  //  console.log("updateProgressBar[" + this.progressId + "]:" + obj.percent);
	  console.log("updateProgressBar:" + JSON.stringify(obj));
	  var newProgressPercentage = this.state.progressPercentage.slice();
	  newProgressPercentage[objCount] =  obj.percent;
	  this.setState({ 
		  progressPercentage :  newProgressPercentage
		}); 
		//console.log("newProgressPercentage[i]:" + newProgressPercentage[this.progressId ]);
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
   
   //console.log("this.props.defaultImg:" + this.props.defaultImg);
   //console.log("this.props.defaultImg = null:" + (this.props.defaultImg == ""));
   //console.log("this.props.defaultImg.length:" + this.props.defaultImg.length);
   //console.log("this.firstTimeConstructs:" + this.firstTimeConstructs);
    if(this.firstTimeConstructs)
    {
	let newimageFilesMultiple = [];
	var tempArray = [];

	var progressPercentageValue = 100;
	var newProgressPercentage = this.state.progressPercentage.slice();
	this.props.defaultImg.map((file) => {
	//console.log("file.id:" + file.id);
	//console.log("file.name:" + file.name);
	var tempFile = {};
	tempFile.preview = ApiSettings.NODE_SERVER + "/api/retrieveimage/" + file.name;
	//tempFile.isPreloaded = true;
	newimageFilesMultiple.push(tempFile); 
	newProgressPercentage.push(progressPercentageValue);
	tempArray.push(file.name);
		

	});

	this.setState({ 
	  //slideImg : tempArray,
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