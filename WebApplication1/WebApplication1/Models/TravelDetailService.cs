using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class TravelDetailService
    {
        public void Add(TravelDetail traveldetail)
        {
            using (var db = new StaffContext())
            {
                db.TravelDetail.Add(traveldetail);
                db.SaveChanges();
            }
        }
        public List<TravelDetail> GetById(int id)
        {
            using (var db = new StaffContext())
            {
                var query = from detail in db.TravelDetail
                            where detail.TravelId == id
                            select detail;
                return query.ToList<TravelDetail>();
            }
        }
    }
}