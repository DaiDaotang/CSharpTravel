using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace WebApplication1.Models
{
    public class TravelService
    {
        public void Add(Travel travel)
        {
            using (var db = new StaffContext())
            {
                db.Travel.Add(travel);
                db.SaveChanges();
            }
        }

        public List<object> GetById(int id)
        {
            using (var db = new StaffContext())
            {
                var query = from travel in db.Travel
                            join user in db.User on travel.UserId equals user.Id
                            where travel.Id == id
                            select new
                            {
                                userName = user.Name,
                                userid = travel.UserId,
                                starttime = travel.StartTime,
                                endtime = travel.EndTime,
                                place = travel.Place,

                            };
                return query.ToList<object>();
            }
        }

        public List<object> GetAll()
        {
            using (var db = new StaffContext())
            {
                var query = from travel in db.Travel
                            join user in db.User on travel.UserId equals user.Id
                            select new
                            {
                                id = travel.Id,
                                userName = user.Name,
                                userid = travel.UserId,
                                starttime = travel.StartTime,
                                endtime = travel.EndTime,
                                place = travel.Place,
                                
                            };
                return query.ToList<object>();
            }
        }

        public List<object> FilterByPlace(string place)
        {
            using (var db = new StaffContext())
            {
                var query = from travel in db.Travel
                            join user in db.User on travel.UserId equals user.Id
                            where travel.Place == place
                            select new
                            {
                                id = travel.Id,
                                userName = user.Name,
                                userid = travel.UserId,
                                starttime = travel.StartTime,
                                endtime = travel.EndTime,
                                place = travel.Place,

                            };
                return query.ToList<object>();
            }
        }
        //public IEnumerable<object> GetAll()
        //{
        //    using (var db = new StaffContext())
        //    {
        //        var query = from travel in db.Travel
        //                    join detail in db.TravelDetail on travel.Id equals detail.TravelId
        //                    select new
        //                    {
        //                        userid = travel.UserId,
        //                        starttime = travel.StartTime,
        //                        endtime = travel.EndTime,
        //                        place = travel.Place,
        //                        text = detail.Text,
        //                        travelid = detail.TravelId
        //                    };
        //        return query;
        //    }
        //}
        public Travel Get(int id)
        {
            using (var db = new StaffContext())
            {
                return db.Travel.Include("traveldetails").
                  SingleOrDefault(o => o.UserId == id);
            }
        }


        //public void Remove(int id)
        //{
        //    using (var db = new StaffContext())
        //    {
        //        var travel = db.Travel.Include("traveldetails").SingleOrDefault(o => o.Id == id);
        //        db.TravelDetail.RemoveRange(travel.traveldetails);
        //        db.Travel.Remove(travel);
        //        db.SaveChanges();
        //    }
        //}

        //    public void Update(Travel travel)
        //    {
        //        using (var db = new StaffContext())
        //        {
        //            db.Travel.Attach(travel);
        //            db.Entry(travel).State = EntityState.Modified;
        //            travel.traveldetails.ForEach(
        //                item => db.Entry(item).State = EntityState.Modified);
        //            db.SaveChanges();
        //        }
        //    }
    }
}