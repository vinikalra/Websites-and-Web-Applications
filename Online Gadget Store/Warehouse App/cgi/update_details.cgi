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



my $query = "update SKU set Category_id = '$category', Vendor = '$vendor', Manuf_id = '$identifier', Description ='$description', Feature='$features', Cost=$cost, Retai_price=$rprice where SKU ='$sku';";

my $sth = $dbh->prepare($query);
$sth->execute();
$response = $query;

$dbh->disconnect();
    
print "Content-type: text/html\n\n";
print $response;               
