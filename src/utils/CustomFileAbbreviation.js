export default {
 
	getExtensionAbbr: (val) =>
	{
		if(val == "image/jpeg")	
		{
			return ".jpg";
		}
		else if(val == "image/png")	
		{
			return ".png";
		}
	}

}