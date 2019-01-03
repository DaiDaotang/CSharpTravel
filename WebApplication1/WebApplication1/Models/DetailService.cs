using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace WebApplication1.Models
{
    public class DetailService
    {
        public void Add(TravelDetail detail)
        {
            using (var db = new StaffContext())
            {
                db.TravelDetail.Add(detail);
                db.SaveChanges();
            }
        }

        //public List<object> Filter()
        //{
        //    using (var db = new StaffContext())
        //    {
        //        var query = from travel in db.Travel
        //                    join user in db.User on travel.UserId equals user.Id
        //                    select new
        //                    {
        //                        userName = user.Name,
        //                        userid = travel.UserId,
        //                        starttime = travel.StartTime,
        //                        endtime = travel.EndTime,
        //                        place = travel.Place,

        //                    };
        //        return query.ToList<object>();
        //    }
        //}

        public List<TravelDetail> FilterByTravel(int travelid)
        {
            using (var db = new StaffContext())
            {
                var query = from detail in db.TravelDetail
                            where detail.TravelId == travelid
                            select detail;
                return query.ToList<TravelDetail>();
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




        
    }
}