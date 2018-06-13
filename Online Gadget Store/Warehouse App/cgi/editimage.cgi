#Vini Kalra
#jadrn017
#820873996

#!/usr/bin/perl

use DBI;
use CGI;


my $upload_dir = '/home/jadrn017/public_html/proj1/file_upload/';

opendir my $dh, $upload_dir or die qq{opendir: $upload_dir: $!\n};


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

rewinddir $dh;
