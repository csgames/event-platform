#!/usr/bin/env bash

# Create keys folder 
mkdir -p keys && cd keys

# Remove old keys
rm -rf private.pem
rm -rf public.pem
rm -rf *.pfx

# Generate private key
openssl genrsa 2048 > private.pem

# Generate public key
openssl req -x509 -new -key private.pem -out public.pem

# Generate pfx file
openssl pkcs12 -export -in public.pem -inkey private.pem -out STSCert.pfx
