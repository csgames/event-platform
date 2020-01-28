using System;
using System.Threading;
using System.Threading.Tasks;
using IdentityServer4.Models;
using Microsoft.Extensions.Hosting;
using STS.Interface;

namespace STS.Workers
{
    public class PersistedGrantBackgroundWorker : IHostedService
    {
        private readonly IRepository _repository;

        /**
         * Execution each hour
         */
        private const int TimeoutInSeconds = 60 * 60;

        private Timer _timer;
        
        public PersistedGrantBackgroundWorker(IRepository repository)
        {
            _repository = repository;
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
            Console.WriteLine("Starting to check persisted grants expiration...");
            StopTimer();
            _repository.Delete<PersistedGrant>(i  => i.Expiration <= DateTime.Now);
            StartTimer(false);
        }
    }
}