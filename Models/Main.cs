using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class MainIndexModel
    {
        public string Name_Customer { get; set; }
        public string Surname_Customer { get; set; }
        public string Name_Pizza { get; set; }
        public double Cost { get; set; }
        public DateTime Date { get; set; }
        public int Id { get; set; }
        public int Id_pizza { get; set; }
        public int Id_customer { get; set; }
    }
    public class RootModel
    {
        public List<MainIndexModel> Main { get; set; }
    }
}