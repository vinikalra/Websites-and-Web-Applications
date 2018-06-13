#Vini Kalra
#jadrn017
#820873996

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



my $upload_dir = '/home/jadrn017/public_html/proj1/file_upload/';
my $extension1 = ".png";
my $extension2 = ".jpg";
my $extension3 = ".jpeg";
my $sku = $q->param("sku");
my $dir1 = $upload_dir.$sku.$extension1;
my $dir2 = $upload_dir.$sku.$extension2;
my $dir3 = $upload_dir.$sku.$extension3;

unlink $dir1;
unlink $dir2;
unlink $dir3;


    my $query = "delete from SKU where sku='$sku'";
    my $sth = $dbh->prepare($query);
    $sth->execute();
    

$sth->finish();
$dbh->disconnect();


print "Content-type: text/html\n\n";
print $response;
#print $upload_dir/$sku;