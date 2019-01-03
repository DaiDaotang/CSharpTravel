using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class StrategyDetailService
    {
        public void Add(StrategyDetail strategydetail)
        {
            using (var db = new StaffContext())
            {
                db.StrategyDetail.Add(strategydetail);
                db.SaveChanges();
            }
        }
        public List<StrategyDetail> GetById(int id)
        {
            using (var db = new StaffContext())
            {
                var query = from detail in db.StrategyDetail
                            where detail.StrategyId == id
                            select detail;
                return query.ToList<StrategyDetail>();
            }
        }
    }
}