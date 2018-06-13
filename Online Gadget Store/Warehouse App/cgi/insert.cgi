#Vini Kalra
#820873996
#jadrn017

#!/usr/bin/perl

use DBI;
use CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn017";
my $username = "jadrn017";
my $password = "leaf";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

my $q = new CGI;
my $sku = $q->param("sku");
my $category = $q->param("category");
my $vendor = $q->param("vendor");
my $identifier = $q->param("identifier");
my $description = $q->param("description");
my $features = $q->param("features");
my $cost = $q->param("cost");
my $rprice = $q->param("rprice");
my $filename = $q->param("pic");

my $upload_dir = '/home/jadrn017/public_html/proj1/file_upload';
my $file_Sep ='/';
my $extension = substr $filename, index($filename, '.');
my $dir = $upload_dir.$file_Sep.$sku.$extension;


my $query = "insert into SKU (SKU, Category_id, Vendor, Manuf_id, Description, Feature, Cost, Retai_price, Image) values('$sku', '$category', '$vendor', '$identifier', '$description', '$features', $cost, $rprice,'$dir' );";

my $sth = $dbh->prepare($query);
$sth->execute();
if($sth)
{
$response ="Insert successful";
}
else
{
$response ="Error in inserting Data";
}

$dbh->disconnect();
    
print "Content-type: text/html\n\n";
print $response;               
