using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class AddCustomerController : Controller
    {
        public AddCustomerController()
        {
        }

        public ActionResult Index()
        {
            using (DataClasses1DataContext c = new DataClasses1DataContext())
            {
                var m = new MainIndexModel();
                /*ViewBag.menu =
                    (from tt in c.menu
                     select new SelectListItem()
                     {
                         Value = tt.Id.ToString(),
                         Text = tt.name_pizza
                     }).ToList();*/
                return View(m);
            }
        }

        [HttpPost]
        public ActionResult Index(MainIndexModel model)
        {
            if (Request["Submit"] != null)
            {
                using (DataClasses1DataContext ctx = new DataClasses1DataContext())
                {
                    customer t = new customer()
                    {
                        name = model.Name_Customer,
                        surname = model.Surname_Customer,
                    };

                    ctx.customer.InsertOnSubmit(t);
                    ctx.SubmitChanges();
                }
            }
            return RedirectToAction("Index", "Home");
        }

    }
}