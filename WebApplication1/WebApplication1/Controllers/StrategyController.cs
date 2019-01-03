using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StrategyController : ApiController
    {
        static readonly StrategyService service = new StrategyService();

        //GET:  /api/Strategy
        public List<object> GetAllStrategy()
        {
            return service.GetAll();
        }

        //GET: /api/Strategy/id
        public List<object> GetStrategy(int id)
        {
            List<object> items = service.GetById(id);
            if (items == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return items;
        }

        //GET: /api/Strategy/place
        public List<object> GetStrategy(string place)
        {
            List<object> items = service.GetByPlace(place);
            if (items == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return items;
        }


        //POST: /api/Strategy
        public HttpResponseMessage PostTravel(Strategy strategy)
        {
            var response = Request.CreateResponse<Strategy>(HttpStatusCode.Created, strategy);
            service.Add(strategy);
            string uri = Url.Link("DefaultApi", new { id = strategy.UserId });
            response.Headers.Location = new Uri(uri);

            return response;
        }

        //PUT: /api/Strategy/id
        //public void PutTravel(string id, Strategy strategy)
        //{
        //    strategy.UserId = id;
        //    if (!service.Update(strategy))
        //    {
        //        throw new HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //}

        ////Delete: /api/Strategy/id
        //public void DeleteTravel(string id)
        //{
        //    Strategy item = service.Get(id);
        //    if (item == null)
        //    {
        //        throw new HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //    service.Remove(id);
        //}
    }
}
