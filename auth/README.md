# CSGamesAuthService
The official STS of the CS Games

# Run it in local
## Generate certificates

To use the sts, you need to generate the certificates that the sts will use to sign tokens.

```sh
./generate_certificate.sh
```

By default, the locations if your certificates will be at the root of the project, in the keys folder.

Note: Remember the password of your certificates, you will need it in the config file.

## Config file

Create a .env file from the .env-sample

There is some default config:
```
PORT=5556
CERT_PATH=keys/STSCert.pfx
ISSUER_URI=http://localhost:5556
ISSUERS=http://localhost:5556
```

For `DB_CONNECTION_STRING`, the dev database uri is on slack  
For `DB_NAME`, the dev database name is on slack

For `CERT_PATH`, if you changed the default location of your certificates, you need to put the path of the new location here   
For `CERT_PASSWORD`, the value is the password of the generated certificates 

For `AUDIENCE`, the value of this field is also on slack 

For all `*_SECRET`, these values are optionals 
