namespace SecureTokenService
{
    public static class Environment
    {
        public static string Get(string name)
        {
            return System.Environment.GetEnvironmentVariable(name);
        }
    }
}