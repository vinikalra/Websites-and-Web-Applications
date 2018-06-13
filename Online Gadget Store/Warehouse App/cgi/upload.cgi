#Vini Kalra
#820873996
#jadrn017


use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB

my $safe_filename_chars = "a-zA-Z0-9_.-";
my $q = new CGI;
my $upload_dir = '/home/jadrn017/public_html/proj1/file_upload';
my $file_Sep ='/';
my $time = localtime;
my $filename = $q->param("pic");
my $extension = substr $filename, index($filename, '.');
my $sku = $q->param("sku");
my $dir = $upload_dir.$file_Sep.$sku.$extension;



unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }
    
my $mimetype = $q->uploadInfo($filename)->{'Content-Type'};

# check the mime type and if it is not an image, reject it.
if($mimetype !~ /image/) {
    die "Invalid mime type, $mimetype";
    }    
   
my ($name, $path, $extension) = fileparse($filename, '/..*/');

$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }   


$filename = untaint($filename);
$filename = lc($filename);
my $filehandle = $q->upload("pic"); 
unless($filehandle) { die "Invalid handle"; }

open UPLOADFILE, ">$dir" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    if($_ =~ /\<\?php/) {
        die "Invalid file, php tag found!";
        }
    print UPLOADFILE $_;
    }
close UPLOADFILE;

sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }
