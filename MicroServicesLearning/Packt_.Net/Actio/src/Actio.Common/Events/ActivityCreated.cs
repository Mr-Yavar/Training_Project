using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Actio.Common.Events
{
    public class ActivityCreated : IAuthenticateEvent
    {
        public Guid Id { get; set; }
      
        public Guid UserId { get; set; }
        public string Category { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
   
        protected ActivityCreated() { }

        public ActivityCreated(Guid id,Guid UserId,string category)
        {

            Id = id;
            this.UserId = UserId;

        }
    
    
    }
}
