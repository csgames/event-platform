using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Microsoft.Extensions.Configuration;

using Org.BouncyCastle.X509;
using Org.BouncyCastle.Utilities;
using Org.BouncyCastle.Math;
using Org.BouncyCastle.Security;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Crypto.Generators;
using Org.BouncyCastle.Crypto.Operators;
using Org.BouncyCastle.Pkcs;
using STS.Configuration;

namespace STS.Service
{
    public class CertificatesGenerator
    {
        private readonly IConfiguration _config;

        public CertificatesGenerator(IConfiguration config)
        {
            _config = config;
        }

        public X509Certificate2 GenerateCertificate()
        {
            var random = new SecureRandom();
            var certificateGenerator = new X509V3CertificateGenerator();

            var serialNumber = BigIntegers.CreateRandomInRange(BigInteger.One, BigInteger.ValueOf(Int64.MaxValue), random);
            certificateGenerator.SetSerialNumber(serialNumber);

            var name = $"C={_config["Certificates:Country"]}," +
                       $"ST={_config["Certificates:State"]}," +
                       $"L={_config["Certificates:Locality"]}," +
                       $"O={_config["Certificates:Organization"]}";
            certificateGenerator.SetIssuerDN(new X509Name(name));
            certificateGenerator.SetSubjectDN(new X509Name(name));
            certificateGenerator.SetNotBefore(DateTime.UtcNow.Date);
            certificateGenerator.SetNotAfter(DateTime.UtcNow.Date.AddMonths(1));

            const int strength = 2048;
            var keyGenerationParameters = new KeyGenerationParameters(random, strength);
            var keyPairGenerator = new RsaKeyPairGenerator();
            keyPairGenerator.Init(keyGenerationParameters);

            var subjectKeyPair = keyPairGenerator.GenerateKeyPair();
            certificateGenerator.SetPublicKey(subjectKeyPair.Public);

            var issuerKeyPair = subjectKeyPair;
            const string signatureAlgorithm = "SHA256WithRSA";
            var signatureFactory = new Asn1SignatureFactory(signatureAlgorithm,issuerKeyPair.Private);
            var bouncyCert = certificateGenerator.Generate(signatureFactory);

            // Lets convert it to X509Certificate2
            X509Certificate2 certificate;

            var store = new Pkcs12StoreBuilder().Build();
            store.SetKeyEntry($"signing_key", new AsymmetricKeyEntry(subjectKeyPair.Private), new [] {new X509CertificateEntry(bouncyCert)});

            using(var ms = new System.IO.MemoryStream()){
                store.Save(ms, ConfigManager.Certificates.Password.ToCharArray(), random);
                certificate = new X509Certificate2(ms.ToArray(), ConfigManager.Certificates.Password, X509KeyStorageFlags.Exportable);
            }

            return certificate;
        }

        public IEnumerable<X509Certificate2> LoadCertificate()
        {
            var path = ConfigManager.Certificates.Path;
            var dirInfo = new DirectoryInfo(path);
            var files = dirInfo.GetFiles("*.pfx");

            var certificates = new List<X509Certificate2>();
            if (files.Length == 0)
            {
                return certificates;
            }

            certificates.AddRange(files.Select(file => new X509Certificate2(file.FullName, ConfigManager.Certificates.Password)));
            return certificates;
        }

        public void SaveCertificate(X509Certificate2 certificate)
        {
            var bytes = certificate.Export(X509ContentType.Pfx, ConfigManager.Certificates.Password);
            var fileName = $"{ConfigManager.Certificates.Path}/{DateTime.Now.ToFileTimeUtc()}.pfx";
            using var fs = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            fs.Write(bytes, 0, bytes.Length);
        }
    }
}