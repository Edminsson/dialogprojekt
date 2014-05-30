using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dialog.Controllers
{
    public class DialogController : Controller
    {
        // GET: Dialog
        public ActionResult Index()
        {
            return View();
        }
        //
        public ActionResult DialogPartial() {
            return PartialView();
        }
    }
}