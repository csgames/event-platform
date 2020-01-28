using System;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using STS.Service;

namespace STS.Workers
{
    public class CertificatesBackgroundWorker : IHostedService
    {
        private readonly CertificatesGenerator _certificatesGenerator;

        /**
         * Execution each hour
         */
        private const int TimeoutInSeconds = 60 * 60;

        private Timer _timer;
        
        public CertificatesBackgroundWorker(CertificatesGenerator certificatesGenerator)
        {
            _certificatesGenerator = certificatesGenerator;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(OnTimerElapsed, null, Timeout.Infinite, 0);
            StartTimer();
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            StopTimer();
            return Task.CompletedTask;
        }

        private void StartTimer(bool startNow = true)
        {
            _timer?.Change(startNow ? TimeSpan.Zero : TimeSpan.FromSeconds(TimeoutInSeconds),
                TimeSpan.FromSeconds(TimeoutInSeconds));
        }

        private void StopTimer()
        {
            _timer?.Change(Timeout.Infinite, 0);
        }

        private void OnTimerElapsed(object sender)
        {
            Console.WriteLine("Starting to check certificates expiration...");
            StopTimer();
            CheckCertificates();
            StartTimer(false);
        }

        private void CheckCertificates()
        {
            var certificates = _certificatesGenerator.LoadCertificate();

            X509Certificate2 certificate = null;
            foreach (var cert in certificates)
            {
                if (certificate == null || certificate.NotAfter <= DateTime.Now.AddDays(2))
                {
                    certificate = cert;
                }
            }

            if (certificate != null && certificate.NotAfter > DateTime.Now.AddDays(2))
            {
                return;
            }

            certificate = _certificatesGenerator.GenerateCertificate();
            _certificatesGenerator.SaveCertificate(certificate);
        }
    }
}