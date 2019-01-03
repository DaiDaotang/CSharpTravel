using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;
using System.Web.Script.Serialization;


namespace WebApplication1.Controllers
{
    public class UserController : ApiController
    {
        static readonly UserService service = new UserService();
        // GET: api/User
        public IEnumerable<string> Get()
        {
            Console.WriteLine("userget");
            return new string[] { "value1", "value2" };
        }

        //GET: api/User
        public User Get(string name)
        {
            //Console.WriteLine("userget id");
            User user = service.GetbyName(name);
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return user;
        }


        // GET: api/User/5
        public User Get(int userid)
        {
            Console.WriteLine("userget id");
            User user = service.GetbyId(userid);
            if(user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return user;
        }

        // POST: api/User
        public HttpResponseMessage Post(User user)
        {
            //Console.WriteLine(user.ToString());
            //JavaScriptSerializer json = new JavaScriptSerializer();
            //User user = json.Deserialize<User>(userstr);
            //Console.WriteLine("userpost");
            var response = Request.CreateResponse<User>(HttpStatusCode.Created, user);
            service.Add(user);
            //try
            //{
            //    service.Add(user);
            //}
            //catch (Exception e)
            //{
            //    response = Request.CreateResponse<User>(HttpStatusCode.BadRequest, user);
            //    return response;
            //}

            string uri = Url.Link("DefaultApi", new { id = user.Id });
            response.Headers.Location = new Uri(uri);

            return response;
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}
