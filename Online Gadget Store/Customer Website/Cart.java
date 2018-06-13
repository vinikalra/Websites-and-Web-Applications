package sdsu;
import java.util.ArrayList;

public class Cart
{
	private String product="";
	private String image="";
	private String quantity="";
	private String cost="";
	private String sku="";
	
	public void setProduct(String product)
	{
	this.product= product;
	}
	public void setImage(String image)
	{
	this.image= image;
	}
	public void setQuantity(String quantity)
	{
	this.quantity= quantity;
	}
	public void setCost(String cost)
	{
	this.cost= cost;
	}
	public void setSku(String sku)
	{
	this.sku= sku;
	}
	
	
	public String getSku()
	{
	return (this.sku);
	}
	
	public String getProduct()
	{
	return (this.product);
	}
	public String getImage()
	{
	return (this.image);
	}
	public String getQuantity()
	{
	return (this.quantity);
	}
	public String getCost()
	{
	return (this.cost);
	}
}