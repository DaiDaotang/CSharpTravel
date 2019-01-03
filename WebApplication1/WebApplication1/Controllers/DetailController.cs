using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    

    public class DetailController : ApiController
    {
        static readonly DetailService service = new DetailService();
        // GET: api/Detail
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Detail/5
        public List<TravelDetail> Get(int travelid)
        {
            List<TravelDetail> details = service.FilterByTravel(travelid);
            return details;
        }

        // POST: api/Detail
        public HttpResponseMessage Post([FromBody]TravelDetail detail)
        {
            var response = Request.CreateResponse<TravelDetail>(HttpStatusCode.Created, detail);
            try
            {
                service.Add(detail);
            }
            catch (Exception e)
            {
                response = Request.CreateResponse<TravelDetail>(HttpStatusCode.BadRequest, detail);
                return response;
            }

            string uri = Url.Link("DefaultApi", new { id = detail.TravelId });
            response.Headers.Location = new Uri(uri);

            return response;
        }

        // PUT: api/Detail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Detail/5
        public void Delete(int id)
        {
        }
    }
}
