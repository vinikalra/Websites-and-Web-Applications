#!/usr/bin/perl

use CGI;

my $q = new CGI;
my $response = $q->param("Model");

print "Content-type: text/html\n\n";
print $response;
