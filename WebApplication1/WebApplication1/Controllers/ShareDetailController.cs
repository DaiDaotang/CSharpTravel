using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ShareDetailController : ApiController
    {
        static readonly ShareDetailService service = new ShareDetailService();
        // GET: api/ShareDetail
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        // GET: api/ShareDetail/5
        public List<ShareDetail> Get(int id)
        {
            List<ShareDetail> details = service.GetById(id);
            return details;
        }

        //GET: api/ShareDetail
        public List<ShareDetail> Get(int id, int text)
        {
            List<ShareDetail> details = service.GetByEnjoyId(id, text);
            return details;
        }

        // POST: api/ShareDetail
        public HttpResponseMessage Post([FromBody]ShareDetail detail)
        {
            var response = Request.CreateResponse<ShareDetail>(HttpStatusCode.Created, detail);
            try
            {
                service.Add(detail);
            }
            catch (Exception e)
            {
                response = Request.CreateResponse<ShareDetail>(HttpStatusCode.BadRequest, detail);
                return response;
            }

            string uri = Url.Link("DefaultApi", new { id = detail.ShareId });
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
