using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using STS.Models;

namespace STS.Inputs
{
    public class ChangeUserInput
    {
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string BirthDate { get; set; }

        public Dictionary<string, object> toDictionnary()
        {
            var dic = new Dictionary<string, object>();
            
            if (Username != null)
                dic.Add("Username", Username);
            
            if (OldPassword != null)
                dic.Add("Password", NewPassword);
            
            if (FirstName != null)
                dic.Add("FirstName", FirstName);
            
            if (LastName != null)
                dic.Add("LastName", LastName);
            
            if (BirthDate != null)
                dic.Add("BirthDate", BirthDate);

            return dic;
        }
    }
}