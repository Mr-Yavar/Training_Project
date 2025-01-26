using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Actio.Common.Events
{
    public class CreateUserRejected : IRejectedEvent
    {
        public string Email { get; set; }
        public string Reason { get; set; }
        public string Code { get; set; }

        protected CreateUserRejected() { }
        public CreateUserRejected(string email,string reason,string code) { 
            Email = email;
            Reason = reason;
            Code = code;
        

        }

    }
}
