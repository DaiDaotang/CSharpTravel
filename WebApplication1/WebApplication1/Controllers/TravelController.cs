using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class TravelController : ApiController
    {
        static readonly TravelService service = new TravelService();
        public Travel CurrentTravel { get; set; }

        //GET:  /api/Travel
        public List<object> GetAllTravels()
        {
            return service.GetAll();
        }

        //GET: /api/Travel/id
        public List<object> GetTravel(string place)
        {
            List<object> items = service.FilterByPlace(place);
            if (items == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return items;
        }

        public List<object> GetTravel(int id)
        {
            List<object> items = service.GetById(id);
            if (items == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return items;
        }

        //POST: /api/Travel
        public HttpResponseMessage PostTravel(Travel travel)
        {
            var response = Request.CreateResponse<Travel>(HttpStatusCode.Created, travel);
            service.Add(travel);
            //try
            //{
            //    service.Add(travel);
            //}
            //catch(Exception e)
            //{
            //    response = Request.CreateResponse<Travel>(HttpStatusCode.BadRequest, travel);
            //    return response;
            //}

            string uri = Url.Link("DefaultApi", new { id = travel.UserId });
            response.Headers.Location = new Uri(uri);

            return response;
        }

        //PUT: /api/Travel/id
        //public void PutTravel(string id, Travel travel)
        //{
        //    travel.UserId = id;
        //    if (!service.Update(travel))
        //    {
        //        throw new HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //}

        //Delete: /api/Travel/id
        //public void DeleteTravel(string id)
        //{
        //    Travel item = service.Get(id);
        //    if (item == null)
        //    {
        //        throw new HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //    service.Remove(id);
        //}

    }
}
