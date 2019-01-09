using System;
using System.Collections.Generic;
using System.Linq;

namespace STS.Utils
{
    public class CredentialGenerator
    {
        private static string _lowerCase = "abcdefghijklmnopqrstuvwxyz";
        private static string _upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        private static string _number = "0123456789";

        public static string GenerateClientSecret(int length)
        {
            var pool = _lowerCase + _upperCase + _number;
            var rng = new Random();
            var result = "";
            for (var i = 0; i < length; ++i)
                result += pool[(int) Math.Floor(rng.NextDouble() * pool.Length)];
            return result;
        }

        public static string GeneratePassword(int length)
        {
            var rand = new Random();
            var lowerCase = _lowerCase.ToCharArray().OrderBy(x => rand.Next()).ToArray();
            var upperCase = _upperCase.ToCharArray().OrderBy(x => rand.Next()).ToArray();
            var number = _number.ToCharArray().OrderBy(x => rand.Next()).ToArray();

            var result = "";
            result += lowerCase.Take(1).First();
            result += upperCase.Take(1).First();
            result += number.Take(1).First();

            var pool = new List<char>();
            pool.AddRange(lowerCase);
            pool.AddRange(upperCase);
            pool.AddRange(number);

            for (var i = 0; i < length - 3; i++)
            {
                result += pool[(int) Math.Floor(rand.NextDouble() * pool.Count)];
            }
            
            return result;
        }
    }
}