use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);


my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn017SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

my $authenticate = "";

if($cookie_sid eq $sid) {
$authenticate = "Success";
}
else{
$authenticate = "Fail";
}

print "Content-type: text/html\n\n";
print $authenticate;