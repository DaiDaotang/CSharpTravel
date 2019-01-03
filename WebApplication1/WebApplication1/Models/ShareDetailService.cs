using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ShareDetailService
    {
        public void Add(ShareDetail sharedetail)
        {
            using (var db = new StaffContext())
            {
                db.ShareDetail.Add(sharedetail);
                db.SaveChanges();
            }
        }
        public List<ShareDetail> GetById(int id)
        {
            using (var db = new StaffContext())
            {
                var query = from detail in db.ShareDetail
                            where detail.ShareId == id
                            select detail;
                return query.ToList<ShareDetail>();
            }
        }
        public List<ShareDetail> GetByEnjoyId(int id, int test)
        {
            using (var db = new StaffContext())
            {
                var query = from detail in db.ShareDetail
                            where detail.UserId == id
                            select detail;
                return query.ToList<ShareDetail>();
            }
        }
    }
}