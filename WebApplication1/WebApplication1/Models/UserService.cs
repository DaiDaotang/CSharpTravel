using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class UserService
    {
        public void Add(User user)
        {
            using (var db = new StaffContext())
            {
                db.User.Add(user);
                db.SaveChanges();
            }
        }
        public User GetbyId(int id)
        {
            using (var db = new StaffContext())
            {
                return db.User.SingleOrDefault<User>(user => user.Id == id);
            }
        }
        public User GetbyName(string name)
        {
            using (var db = new StaffContext())
            {
                return db.User.SingleOrDefault<User>(user => user.Name == name);

            }
        }

        public List<Travel> FilterTravel(int userid)
        {
            using (var db = new StaffContext())
            {
                return db.Travel.Where<Travel>(travel => travel.UserId == userid).ToList<Travel>();
            }
        }

    }
}