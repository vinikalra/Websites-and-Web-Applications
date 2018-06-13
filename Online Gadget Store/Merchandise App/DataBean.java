package sdsu;
import java.util.ArrayList;

public class DataBean
{
	private String manufid="";
	private String description="";
	private String image="";
	private String categoryName="";
	private String vendorName="";
	
	public void setCategoryName(String categoryName)
	{
		this.categoryName = categoryName;
	}
	
	public void setVendorName(String vendorName)
	{
		this.vendorName= vendorName;
	}
	public void setManufid(String manufid)
	{
		this.manufid= manufid;
	}
	public void setDescription(String description)
	{
		this.description= description;
	}
	
	public void setImage(String image)
	{
		this.image = image;
	}
	
	
	
	public String getCategoryName()
    { 
        return (this.categoryName);
    }
	public String getVendorName()
    { 
        return (this.vendorName);
    }
	public String getManufid()
    { 
        return (this.manufid);
    }
	public String getDescription()
    { 
        return (this.description);
    }
	public String getImage()
    { 
        return (this.image);
    }
	

}
