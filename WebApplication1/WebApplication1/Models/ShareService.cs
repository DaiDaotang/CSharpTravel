using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ShareService
    {
        public void Add(Share share)
        {
            using (var db = new StaffContext())
            {
                db.Share.Add(share);
                db.SaveChanges();
            }
        }
        public List<object> GetAll()
        {
            using (var db = new StaffContext())
            {
                var query = from share in db.Share
                            join user in db.User on share.UserId equals user.Id
                            select new
                            {
                                userName = user.Name,
                                userid = share.UserId,
                                text = share.Text,
                                image0 = share.Image0,
                                image1 = share.Image1,
                                image2 = share.Image2,
                                image3 = share.Image3,
                                image4 = share.Image4,
                                image5 = share.Image5,
                                image6 = share.Image6,
                                image7 = share.Image7,
                                image8 = share.Image8,
                                time = share.Time,
                                id = share.Id
                            };
                return query.ToList<object>();
            }
        }
        public List<object> GetById(int id)
        {
            using (var db = new StaffContext())
            {
                var query = from share in db.Share
                            join user in db.User on share.UserId equals user.Id
                            where share.Id==id
                            select new
                            {
                                userName = user.Name,
                                userid = share.UserId,
                                text = share.Text,
                                image0 = share.Image0,
                                image1 = share.Image1,
                                image2 = share.Image2,
                                image3 = share.Image3,
                                image4 = share.Image4,
                                image5 = share.Image5,
                                image6 = share.Image6,
                                image7 = share.Image7,
                                image8 = share.Image8,
                                time = share.Time

                            };
                return query.ToList<object>();
            }
        }
    }
}