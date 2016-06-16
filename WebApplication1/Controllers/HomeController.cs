using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
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
                return View(m);
            }
        }

        public ActionResult AddOrder()
        {
            using (DataClasses1DataContext c = new DataClasses1DataContext())
            {
                var m = new MainIndexModel();
                ViewBag.customer =
                    (from ttt in c.customer
                    select new SelectListItem()
                    {
                        Value = ttt.Id.ToString(),
                        Text = ttt.name + " " + ttt.surname
                    }).ToList();
                ViewBag.menu =
                    (from tt in c.menu
                     select new SelectListItem()
                     {
                         Value = tt.Id.ToString(),
                         Text = tt.name_pizza
                     }).ToList();
                return View("AddOrder", m);
            }
        }

        [HttpPost]
        public ActionResult AddOrder(MainIndexModel model)
        {
            if (Request["Submit"] != null)
            {
                using (DataClasses1DataContext ctx = new DataClasses1DataContext())
                {
                    main t = new main()
                    {
                        id_pizza = model.Id_pizza,
                        id_customer = model.Id_customer,
                        date = DateTime.Now
                    };

                    ctx.main.InsertOnSubmit(t);
                    ctx.SubmitChanges();
                }
            }
            return RedirectToAction("Index", "Home");
        }

        public ActionResult Delete(int id)
        {
            using (var ctx = new DataClasses1DataContext())
            {
                var t = (from tt in ctx.main
                         where tt.Id == id
                         select tt).First();
                ctx.main.DeleteOnSubmit(t);
                ctx.SubmitChanges();
            }
            return RedirectToAction("Index", "Home");
        }

        public ActionResult AddCustomer()
        {
            /*using (DataClasses1DataContext c = new DataClasses1DataContext())
            {
                var m = new MainIndexModel();
                ViewBag.customer =
                    (from ttt in c.customer
                     select new SelectListItem()
                     {
                         Value = ttt.Id.ToString(),
                         Text = ttt.name + " " + ttt.surname
                     }).ToList();
                ViewBag.menu =
                    (from tt in c.menu
                     select new SelectListItem()
                     {
                         Value = tt.Id.ToString(),
                         Text = tt.name_pizza
                     }).ToList();*/
                return View("AddCustomer");
            
        }

        [HttpPost]
        public ActionResult AddCustomer(MainIndexModel model)
        {
            if (Request["Submit"] != null)
            {
                using (DataClasses1DataContext ctx = new DataClasses1DataContext())
                {
                    customer t = new customer()
                    {
                        name = model.Name_Customer,
                        surname = model.Surname_Customer,
                        login = model.Name_Customer,
                        password = model.Name_Customer,
                    };

                    ctx.customer.InsertOnSubmit(t);
                    ctx.SubmitChanges();
                }
            }
            return RedirectToAction("Index", "Home");
        }

        public ActionResult Edit(int id)
        {
            using (DataClasses1DataContext c = new DataClasses1DataContext())
            {

                ViewBag.customer =
                    (from ttt in c.main
                     where ttt.Id == id

                     select new SelectListItem()
                     
                     {
                         Value = ttt.Id.ToString(),
                         Text = ttt.customer.name + " " + ttt.customer.surname
                     }).ToList();

                ViewBag.menu =
                    (from tt in c.menu
                     select new SelectListItem()
                     {
                         Value = tt.Id.ToString(),
                         Text = tt.name_pizza
                     }).ToList();
                return View("Edit");

            }
        }

        [HttpPost]
        public ActionResult Edit(int id, MainIndexModel model)
        {
            if (Request["Submit"] != null)
            {
                using (DataClasses1DataContext ctx = new DataClasses1DataContext())
                {
                    main t = (from tt in ctx.main
                               where tt.Id == id
                               select tt).First();

                    t.id_pizza = model.Id_pizza;

                    ctx.SubmitChanges();
                }
            }
            return RedirectToAction("Index", "Home");
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        


    }
}