using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace WebApplication1.Models
{
    public class StrategyService
    {

        public void Add(Strategy strategy)
        {
            using (var db = new StaffContext())
            {
                db.Strategy.Add(strategy);
                db.SaveChanges();
            }
        }
        public List<object> GetAll()
        {
            using (var db = new StaffContext())
            {
                var query = from strategy in db.Strategy
                            join user in db.User on strategy.UserId equals user.Id
                            select new
                            {
                                userName = user.Name,
                                userid = strategy.UserId,
                                title=strategy.Title,
                                tag=strategy.Tag,
                                text=strategy.Text,
                                place=strategy.Place,
                                image0 = strategy.Image0,
                                image1 = strategy.Image1,
                                image2 = strategy.Image2,
                                image3 = strategy.Image3,
                                image4 = strategy.Image4,
                                image5 = strategy.Image5,
                                image6 = strategy.Image6,
                                image7 = strategy.Image7,
                                image8 = strategy.Image8,
                            };
                return query.ToList<object>();
            }
        }
        public List<object> GetByPlace(string place)
        {
            using (var db = new StaffContext())
            {
                var query = from strategy in db.Strategy
                            join user in db.User on strategy.UserId equals user.Id
                            where strategy.Place==place
                            select new
                            {
                                userName = user.Name,
                                userid = strategy.UserId,
                                title = strategy.Title,
                                tag = strategy.Tag,
                                text = strategy.Text,
                                place = strategy.Place,
                                image0 = strategy.Image0,
                                image1 = strategy.Image1,
                                image2 = strategy.Image2,
                                image3 = strategy.Image3,
                                image4 = strategy.Image4,
                                image5 = strategy.Image5,
                                image6 = strategy.Image6,
                                image7 = strategy.Image7,
                                image8 = strategy.Image8,
                            };
                return query.ToList<object>();
            }
        }
        public List<object> GetById(int id)
        {
            using (var db = new StaffContext())
            {
                var query = from strategy in db.Strategy
                            join user in db.User on strategy.UserId equals user.Id
                            where strategy.Id == id
                            select new
                            {
                                userName = user.Name,
                                userid = strategy.UserId,
                                title = strategy.Title,
                                tag = strategy.Tag,
                                text = strategy.Text,
                                place = strategy.Place,
                                image0 = strategy.Image0,
                                image1 = strategy.Image1,
                                image2 = strategy.Image2,
                                image3 = strategy.Image3,
                                image4 = strategy.Image4,
                                image5 = strategy.Image5,
                                image6 = strategy.Image6,
                                image7 = strategy.Image7,
                                image8 = strategy.Image8,
                            };
                return query.ToList<object>();
            }
        }


        //public void Remove(string id)
        //{
        //    using (var db = new StaffContext())
        //    {
        //        var strategy = db.Strategy.Include("strategydetails").SingleOrDefault(o => o.UserId == id);
        //        db.StrategyDetail.RemoveRange(strategy.strategydetails);
        //        db.Strategy.Remove(strategy);
        //        db.SaveChanges();
        //    }
        //}
        //public bool Update(Strategy strategy)
        //{
        //    using (var db = new StaffContext())
        //    {
        //        db.Strategy.Attach(strategy);
        //        db.Entry(strategy).State = EntityState.Modified;
        //        strategy.strategydetails.ForEach(
        //            item => db.Entry(item).State = EntityState.Modified);
        //        db.SaveChanges();
        //    }
        //    return true;
        //}
    }
}