using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class PizzaController : ApiController
    {
        // GET: api/Pizza
        [HttpGet]
        public List<MainIndexModel> Get()
        {
            using (DataClasses1DataContext c = new DataClasses1DataContext())
            {
                var m = new RootModel();
                var main = (from mm in c.main select mm).ToList();
                
                m.Main = (from t in main
                          select new MainIndexModel()
                          {
                              Surname_Customer = t.customer.surname,
                              Name_Customer = t.customer.name,
                              Id = t.Id,
                              Name_Pizza = t.menu.name_pizza,
                              Date = (DateTime)t.date,
                              Cost = t.menu.cost,
                              Id_customer = t.id_customer,
                              Id_pizza = t.id_pizza

                          })
                     .ToList();
                return m.Main;
                //var settings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
                //return JsonConvert.SerializeObject(m, Formatting.Indented, settings);
            }
            
        }

        // GET: api/Pizza/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Pizza
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Pizza/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Pizza/5
        public void Delete(int id)
        {
        }
    }
}
