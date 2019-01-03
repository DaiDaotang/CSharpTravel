using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StrategeDetailController : ApiController
    {
        static readonly StrategyDetailService service = new StrategyDetailService();
        // GET: api/StrategeDetail
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/StrategeDetail/5
        public List<StrategyDetail> Get(int id)
        {
            List<StrategyDetail> details = service.GetById(id);
            return details;
        }


        // POST: api/StrategeDetail
        public HttpResponseMessage Post([FromBody]StrategyDetail detail)
        {
            var response = Request.CreateResponse<StrategyDetail>(HttpStatusCode.Created, detail);
            try
            {
                service.Add(detail);
            }
            catch (Exception e)
            {
                response = Request.CreateResponse<StrategyDetail>(HttpStatusCode.BadRequest, detail);
                return response;
            }

            string uri = Url.Link("DefaultApi", new { id = detail.StrategyId });
            response.Headers.Location = new Uri(uri);

            return response;
        }

        // PUT: api/StrategeDetail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/StrategeDetail/5
        public void Delete(int id)
        {
        }
    }
}
