import React,{Component} from 'react'; 
import CustomRedirect from '../CustomRedirect';
import ApiSettings from '../../config/apiSettings';
import CustomModalPreviewAll from '../../utils/CustomModalPreviewAll';
 

function getImageSource(srcPath)
{
	var returnStr = "";
	if(srcPath != null && srcPath != "")
	{
		returnStr = ApiSettings.NODE_SERVER + "/api/retrieveimage/" + srcPath;
	}
	else
	{ 
		returnStr = "../../images/noimage.png"; 
	}
	return returnStr;
}
class GridRowComponent extends Component {
	
  constructor() {
    super(); 
    this.editClick = this.editClick.bind(this);
  }
  
  editClick()
  { 
  
	  CustomRedirect.redirectWithParam("templateform", "id=" + this.props.data.id); 
  }
   
  render(){
    return (<div className="templatelist-contentBox1" >
	
	<table style={{textAlign:'center', marginLeft:10,marginTop:5,marginBottom:10}}>
	<tbody>
	<tr>
		<td style={{width:122,height:90,paddingBottom:0}}><img src={getImageSource(this.props.data.default1)} style={{width:100}} /></td>
		<td style={{width:122}}>
			<table >
			<tbody>
			<tr><td rowSpan="3" width="80px">&nbsp;</td><td ><img style={{width:30,borderBottomWidth:1,borderBottomStyle:'solid',borderBottomColor:'white'}} src={getImageSource(this.props.data.logo)} /></td></tr>
			<tr><td ><img style={{width:30,borderBottomWidth:1,borderBottomStyle:'solid',borderBottomColor:'white'}} src={getImageSource(this.props.data.welcome)} /></td></tr>
			<tr><td ><img style={{width:30}} src={getImageSource(this.props.data.thankyou)} /></td></tr>
			</tbody>
			</table>
		</td>
	</tr>
	<tr>
		<td style={{width:122,height:85}}>
			<img src={getImageSource(this.props.data.welcome)} style={{width:100}} /></td>
		<td>
			<img src={getImageSource(this.props.data.thankyou)} style={{width:100}} /></td>
	</tr>
	<tr><td colSpan="2" ><hr /></td></tr>
	<tr><td colSpan="2" style={{fontWeight:'bold',fontFamily:'Arial',paddingLeft:10}}>{this.props.data.name}</td></tr>
	<tr><td colSpan="2" style={{fontFamily:'Arial',paddingLeft:10}}>{this.props.data.description}</td></tr>
	<tr><td colSpan="2"><hr /></td></tr>
	<tr>
	<td ><button type="button" className ="btn btn-danger"  style={{width:110}}  onClick={this.editClick} >Edit Template</button></td>
	<td >
	
		<CustomModalPreviewAll data={this.props.data} img={this.props.data.welcome} title="Logo" />
				
</td>
	</tr>
	
	
	</tbody>
	</table>
	 
    </div>);
  }
}
export default GridRowComponent;