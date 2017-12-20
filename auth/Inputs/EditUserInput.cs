using System.Collections.Generic;

namespace STS.Inputs
{
    public class EditUserInput
    {
        public string Id { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string BirthDate { get; set; }

        public bool IsActive { get; set; }

        public bool Validated { get; set; }

        public string[] Scopes { get; set; }

        public string RoleId { get; set; }
    }
}