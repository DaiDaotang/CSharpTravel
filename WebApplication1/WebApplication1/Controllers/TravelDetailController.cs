using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class TravelDetailController : ApiController
    {
        static readonly TravelDetailService service = new TravelDetailService();
        // GET: api/ShareDetail
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/ShareDetail/5
        public List<TravelDetail> Get(int id)
        {
            List<TravelDetail> details = service.GetById(id);
            return details;
        }

        // POST: api/ShareDetail
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

        // PUT: api/ShareDetail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ShareDetail/5
        public void Delete(int id)
        {
        }
    }
}
