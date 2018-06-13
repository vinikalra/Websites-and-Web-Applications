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


my $query = "select Category_id, Vendor,Manuf_id, Description, Feature, Cost, Retai_price, Image from SKU where sku='$sku';";


my $sth = $dbh->prepare($query);
$sth->execute();

# obtain the results
while(my @row=$sth->fetchrow_array()) {    
    $response .= $row[0]."=".$row[1]."=".$row[2]."=".$row[3]."=".$row[4]."=".$row[5]."=".$row[6]."=".$row[7];
    }

$sth->finish();
$dbh->disconnect();
    
print "Content-type: text/html\n\n";
print $response;               
