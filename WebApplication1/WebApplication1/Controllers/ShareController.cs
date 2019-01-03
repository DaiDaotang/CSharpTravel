using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ShareController : ApiController
    {
        static readonly ShareService service = new ShareService();
        // GET: api/Share
        public List<object> GetAllShares()
        {
            return service.GetAll();
        }

        // GET: api/Share/5
        public List<object> GetShare(int id)
        {
            List<object> items = service.GetById(id);
            if (items == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return items;
        }

        // POST: api/Share
        public HttpResponseMessage Post([FromBody]Share share)
        {
            var response = Request.CreateResponse<Share>(HttpStatusCode.Created, share);
            try
            {
                service.Add(share);
            }
            catch (Exception e)
            {
                response = Request.CreateResponse<Share>(HttpStatusCode.BadRequest, share);
                return response;
            }

            string uri = Url.Link("DefaultApi", new { id = share.UserId });
            response.Headers.Location = new Uri(uri);

            return response;
        }

        // PUT: api/Share/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Share/5
        public void Delete(int id)
        {
        }
    }
}
